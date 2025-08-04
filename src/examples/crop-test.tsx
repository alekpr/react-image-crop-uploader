import React, { useState } from 'react';
import { ImageUploader } from '../index';
import '../index.css';

export const CropTest: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesChange = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    console.log('Selected files:', selectedFiles);
  };

  const handleCropComplete = (croppedFile: File, originalFile: File) => {
    console.log('Cropped file:', croppedFile);
    console.log('Original file:', originalFile);
  };

  const handleError = (error: string) => {
    console.error('Error:', error);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Crop Test</h1>
      <p>Select an image to test the cropping functionality.</p>
      
      <ImageUploader
        maxFileSize={10}
        maxFiles={1}
        enableCrop={true}
        cropAspectRatio={16/9}
        onFilesChange={handleFilesChange}
        onCropComplete={handleCropComplete}
        onError={handleError}
        placeholder="Drag & drop an image here or click to select (will open crop modal)"
      />
      
      {files.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Selected Files</h2>
          {files.map((file, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <p><strong>File {index + 1}:</strong> {file.name}</p>
              <p>Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
              <p>Type: {file.type}</p>
              <img 
                src={URL.createObjectURL(file)} 
                alt={`Preview ${index + 1}`} 
                style={{ maxWidth: '200px', maxHeight: '200px', border: '1px solid #ccc' }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};