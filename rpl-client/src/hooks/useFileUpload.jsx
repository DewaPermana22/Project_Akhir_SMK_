import { useState } from 'react';

export const useFileUpload = (initialPreview = null) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialPreview);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFileUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      //  file (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Ukuran file terlalu besar. Maksimal 5MB");
      }
      
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      return file;
    }
    return null;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    return handleFileUpload(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      return handleFileUpload(files[0]);
    }
    return null;
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  const resetFile = () => {
    setSelectedFile(null);
    setImagePreview(initialPreview);
  };

  return {
    selectedFile,
    imagePreview,
    isDragActive,
    handleFileUpload,
    handleFileChange,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    removeImage,
    resetFile,
    setImagePreview
  };
};