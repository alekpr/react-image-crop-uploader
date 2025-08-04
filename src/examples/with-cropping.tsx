import React from 'react';
import { ImageUploader } from '../index';
import '../index.css';

export const WithCroppingExample: React.FC = () => {
  const handleFilesChange = (files: File[]) => {
    console.log('Selected files:', files);
  };

  const handleCropComplete = (croppedFile: File, originalFile: File) => {
    console.log('Cropped file:', croppedFile);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>With Cropping Example</h1>
      <ImageUploader
        maxFileSize={10}
        maxFiles={5}
        enableCrop={true}
        cropAspectRatio={16/9}
        onFilesChange={handleFilesChange}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
};