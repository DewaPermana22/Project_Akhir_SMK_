import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ClockArrowDown, ClockArrowUp, FileDown } from 'lucide-react'
import ButtonAbsensi from '@/components/atoms/button/ButtonAbsen'
import PopUpKamera from '@/components/moleculs/modal&alert/PopUpKamera'
import { closePopUpKamera } from '@/features/modals/PopUpKameraSlice'
import useStartAbsen from '@/hooks/useStartAbsen'

const AbsensiSiswa = () => {
  const dispatch = useDispatch()
  
  // Get state from Redux - pastikan nama state sesuai dengan slice
  const { isPopUpOpen, absenType } = useSelector((state) => state.popupKamera)
  
  // Get function from custom hook
  const { handleStartAbsen } = useStartAbsen()

  // Handle close modal
  const closePopUpAbsen = useCallback(() => {
    dispatch(closePopUpKamera())
  }, [dispatch])

  // Handle photo capture
  const handleCapturePhoto = useCallback((imageData, absenType) => {
    console.log('Foto absensi berhasil diambil:', { imageData, absenType })
    
    // Process the image data
    // - Upload to server
    // - Save to state management
    // - Show success notification
    // - Update UI
    
    alert(`Absensi ${absenType} berhasil!`)
  }, [])

  // Handle button clicks - PENTING: gunakan arrow function atau useCallback
  const handleAbsenMasuk = useCallback(() => {
    handleStartAbsen("masuk")
  }, [handleStartAbsen])

  const handleAbsenPulang = useCallback(() => {
    handleStartAbsen("pulang")
  }, [handleStartAbsen])

  return (
    <main className='p-10 w-full'>
      <div className='flex justify-center items-center gap-5'>
        {/* SALAH: onAbsen={handleStartAbsen("masuk")} - ini langsung dipanggil */}
        {/* BENAR: onAbsen={handleAbsenMasuk} - ini sebagai callback */}
        <ButtonAbsensi 
          onAbsen={handleAbsenMasuk} 
          icon={<ClockArrowUp size={30}/>} 
          text={"Absen Masuk"}
        />
        
        <ButtonAbsensi 
          onAbsen={handleAbsenPulang}
          icon={<ClockArrowDown size={30}/>} 
          text={"Absen Pulang"}
        />
        
        <ButtonAbsensi 
          isDisabled={true} 
          icon={<FileDown size={30}/>} 
          text={"Rekap Absensi"}
        />
      </div>
      
      <p className='text-center text-gray-400 mt-5'>
        Belum saatnya melakukan absen, Silahkan tunggu jam pulang
      </p>
      
      <PopUpKamera 
        onCapture={handleCapturePhoto} 
        absenType={absenType} 
        onClose={closePopUpAbsen} 
        isOpen={isPopUpOpen} 
      />
    </main>
  )
}

export default AbsensiSiswa