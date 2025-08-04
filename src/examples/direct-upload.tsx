import React from 'react';
import { ImageUploader } from '../index';
import '../index.css';

export const DirectUploadExample: React.FC = () => {
  const handleUploadComplete = (response: any) => {
    console.log('Upload response:', response);
  };

  const handleError = (error: string) => {
    console.error('Upload error:', error);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Direct Upload Example</h1>
      <ImageUploader
        uploadUrl="/api/upload"
        maxFileSize={10}
        enableCrop={true}
        onUploadComplete={handleUploadComplete}
        onError={handleError}
      />
    </div>
  );
};