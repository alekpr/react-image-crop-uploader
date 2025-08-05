import React, { useState } from 'react';
import { ImageUploader } from '../index';
import '../index.css';

export const InitialImagesCropTest: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  // Example initial images (URLs)
  const initialImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  ];

  const handleFilesChange = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    console.log('Selected files:', selectedFiles);
  };

  const handleCropComplete = (croppedFile: File, originalFile: File, index?: number) => {
    console.log('Cropped file:', croppedFile);
    console.log('Original file:', originalFile);
    console.log('Index:', index);
  };

  const handleUploadComplete = ({ unuploadedFiles, uploadResponse }: any) => {
    console.log('Upload complete!');
    console.log('Unuploaded files:', unuploadedFiles);
    console.log('Upload response:', uploadResponse);
  };

  const handleError = (error: string) => {
    console.error('Error:', error);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Initial Images Crop Test</h1>
      <p>Test cropping functionality with initial images from URLs.</p>
      
      <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h3>Test Instructions:</h3>
        <ol>
          <li>Initial images are loaded from URLs (marked as uploaded)</li>
          <li>Click "Edit" button on any initial image to test cropping</li>
          <li>Add new images using drag & drop or click</li>
          <li>Upload button will only upload new files, not initial images</li>
        </ol>
      </div>
      
      <ImageUploader
        initialImages={initialImages}
        maxFileSize={10}
        maxFiles={5}
        enableCrop={true}
        cropAspectRatio={1} // Square crop for testing
        uploadUrl="/api/upload" // Mock URL for testing
        editMode={true}
        showEditButton={true}
        onFilesChange={handleFilesChange}
        onCropComplete={handleCropComplete}
        onUploadComplete={handleUploadComplete}
        onError={handleError}
        placeholder="Add more images here (drag & drop or click)"
        uploadButtonText="Upload New Images Only"
      />
      
      {files.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Current Files in Component</h2>
          <p>Total files: {files.length}</p>
          {files.map((file, index) => (
            <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
              <p><strong>File {index + 1}:</strong> {file.name}</p>
              <p>Size: {file.size > 0 ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Placeholder (initial image)'}</p>
              <p>Type: {file.type}</p>
            </div>
          ))}
        </div>
      )}
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#e8f4fd', borderRadius: '8px' }}>
        <h3>Expected Behavior:</h3>
        <ul>
          <li>✅ Initial images should display correctly</li>
          <li>✅ Edit button should work for initial images (URL-based crop)</li>
          <li>✅ New images can be added and cropped normally</li>
          <li>✅ Upload button only uploads new files, skips initial images</li>
          <li>✅ Crop modal should work for both URL images and File objects</li>
        </ul>
      </div>
    </div>
  );
};

export default InitialImagesCropTest;
