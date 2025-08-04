import React from 'react';
import { ImageUploader } from '../index';
import '../index.css';

export const EditModeExample: React.FC = () => {
  const initialImages = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
  ];

  const handleFilesChange = (files: File[]) => {
    console.log('Updated files:', files);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Edit Mode Example</h1>
      <ImageUploader
        editMode={true}
        initialImages={initialImages}
        enableCrop={true}
        showEditButton={true}
        onFilesChange={handleFilesChange}
      />
    </div>
  );
};