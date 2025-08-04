import React from 'react';
import { ImageUploader } from '../index';
import '../index.css';

export const BasicExample: React.FC = () => {
  const handleFilesChange = (files: File[]) => {
    console.log('Selected files:', files);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Basic Example</h1>
      <ImageUploader
        maxFileSize={5}
        maxFiles={3}
        onFilesChange={handleFilesChange}
      />
    </div>
  );
};