import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Camera,
  X,
  RotateCcw,
  Check,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const PopUpKamera = ({ isOpen, onClose, onCapture, absenType = "masuk" }) => {
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const timeoutRef = useRef(null);

  const checkCameraSupport = () => {
    if (!navigator.mediaDevices) {
      throw new Error("navigator.mediaDevices not supported");
    }
    if (!navigator.mediaDevices.getUserMedia) {
      throw new Error("getUserMedia not supported");
    }
    return true;
  };

  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsStreamActive(false);
  }, []);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);

      checkCameraSupport();
      cleanup();

      const constraints = {
        video: {
          width: { min: 320, ideal: 640, max: 1280 },
          height: { min: 240, ideal: 480, max: 720 },
          facingMode: "user",
          frameRate: { ideal: 30, max: 30 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (!videoRef.current || !isOpen) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      streamRef.current = stream;
      videoRef.current.srcObject = stream;

      const video = videoRef.current;
      const onLoadedMetadata = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            setError(`Gagal memutar video: ${err.message}`);
            setIsLoading(false);
          });
        }
      };

      const onPlaying = () => {
        setIsStreamActive(true);
        setIsLoading(false);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };

      const onError = (e) => {
        const errorMsg = `Video error: ${
          e.target.error?.message || "Unknown error"
        }`;
        setError(errorMsg);
        setIsLoading(false);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };

      video.addEventListener("loadedmetadata", onLoadedMetadata);
      video.addEventListener("playing", onPlaying);
      video.addEventListener("error", onError);

      timeoutRef.current = setTimeout(() => {
        if (isLoading) {
          setError("Timeout: Kamera terlalu lama untuk memuat");
          setIsLoading(false);

          video.removeEventListener("loadedmetadata", onLoadedMetadata);
          video.removeEventListener("playing", onPlaying);
          video.removeEventListener("error", onError);
        }
      }, 10000);
    } catch (err) {
      let errorMessage = "Gagal mengakses kamera. ";

      if (err.name === "NotAllowedError") {
        errorMessage +=
          "Permission ditolak. Silakan izinkan akses kamera di browser.";
      } else if (err.name === "NotFoundError") {
        errorMessage += "Kamera tidak ditemukan pada perangkat ini.";
      } else if (err.name === "NotReadableError") {
        errorMessage += "Kamera sedang digunakan aplikasi lain.";
      } else if (err.name === "OverconstrainedError") {
        errorMessage += "Pengaturan kamera tidak didukung.";
      } else if (err.name === "SecurityError") {
        errorMessage += "Akses kamera diblokir karena masalah keamanan.";
      } else {
        errorMessage += err.message || "Terjadi kesalahan tidak diketahui.";
      }

      setError(errorMessage);
      setIsLoading(false);
    }
  }, [isOpen, cleanup]);

  const stopCamera = useCallback(() => {
    cleanup();
    setCapturedImage(null);
  }, [cleanup]);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current && isStreamActive) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.translate(canvas.width, 0);
      context.scale(-1, 1);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataUrl = canvas.toDataURL("image/jpeg", 0.8);
      setCapturedImage(imageDataUrl);
      setIsStreamActive(false);
    }
  }, [isStreamActive]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    setError(null);
    startCamera();
  }, [startCamera]);

  const confirmPhoto = useCallback(() => {
    if (capturedImage && onCapture) {
      onCapture(capturedImage, absenType);
      handleClose();
    }
  }, [capturedImage, onCapture, absenType]);

  const handleClose = useCallback(() => {
    cleanup();
    setCapturedImage(null);
    setError(null);
    setIsLoading(false);
    onClose();
  }, [cleanup, onClose]);

  useEffect(() => {
    if (isOpen && !capturedImage) {
      const timer = setTimeout(startCamera, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, capturedImage]);

  useEffect(() => {
    if (!isOpen) {
      cleanup();
    }

    return () => {
      cleanup();
    };
  }, [isOpen, cleanup]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex text-gray-600 items-center gap-2">
            <Camera className="h-5 w-5" />
            Foto Absensi {absenType === "masuk" ? "Masuk" : "Pulang"}
          </DialogTitle>
          <DialogDescription className="text-indigo-700">
            Ambil foto untuk melakukan absensi{" "}
            {absenType === "masuk" ? "masuk" : "pulang"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 bg-gray-100 z-10">
                <Camera className="h-12 w-12 mb-2 animate-pulse" />
                <p className="text-sm">Memuat kamera...</p>
                <div className="mt-2 text-xs text-gray-400 max-w-xs text-center">
                  {isLoading && (
                    <div className="animate-spin inline-block w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full mr-2"></div>
                  )}
                  Sedang mengakses kamera...
                </div>
              </div>
            )}

            {!isStreamActive && !capturedImage && !isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                <Camera className="h-12 w-12 mb-2" />
                <p className="text-sm">Kamera belum aktif</p>
              </div>
            )}

            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${
                isStreamActive && !capturedImage ? "block" : "hidden"
              }`}
              style={{ transform: "scaleX(-1)" }}
            />

            {capturedImage && (
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-center gap-2">
            {isLoading && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsLoading(false);
                    setError(null);
                    cleanup();
                  }}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Batal
                </Button>
                <Button disabled className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Memuat Kamera...
                </Button>
              </>
            )}

            {!isStreamActive && !capturedImage && !isLoading && (
              <Button onClick={startCamera} className="flex  cursor-pointer bg-[var(--blue)] hover:bg-indigo-700 items-center gap-2">
                <Camera className="h-4 w-4" />
                Mulai Kamera
              </Button>
            )}

            {isStreamActive && !capturedImage && (
              <>
                <Button
                  variant="outline"
                  onClick={stopCamera}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Batal
                </Button>
                <Button
                  onClick={capturePhoto}
                  className="flex bg-[var(--blue)] hover:bg-indigo-700 cursor-pointer items-center gap-2"
                >
                  <Camera className="h-4 w-4" />
                  Ambil Foto
                </Button>
              </>
            )}

            {capturedImage && (
              <>
                <Button
                  variant="outline"
                  onClick={retakePhoto}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Foto Ulang
                </Button>
                <Button
                  onClick={confirmPhoto}
                  className="flex items-center gap-2"
                >
                  <Check className="h-4 w-4" />
                  Konfirmasi
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopUpKamera;