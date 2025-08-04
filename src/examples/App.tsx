import React from 'react';
import { ImageUploader } from '../index';

const App: React.FC = () => {
  const handleFilesChange = (files: File[]) => {
    console.log('Files changed:', files);
  };

  const handleUploadComplete = (response: any) => {
    console.log('Upload complete:', response);
  };

  const handleError = (error: string) => {
    console.error('Error:', error);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">React Image Crop Uploader Demo</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Basic Image Uploader</h2>
        <ImageUploader
          maxFileSize={5}
          maxFiles={3}
          onFilesChange={handleFilesChange}
          onError={handleError}
        />
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Image Uploader with Cropping</h2>
        <ImageUploader
          maxFileSize={10}
          enableCrop={true}
          cropAspectRatio={16/9}
          onFilesChange={handleFilesChange}
          onError={handleError}
        />
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Direct Upload Mode</h2>
        <ImageUploader
          uploadUrl="/api/upload"
          maxFileSize={5}
          enableCrop={true}
          onUploadComplete={handleUploadComplete}
          onError={handleError}
        />
      </div>
    </div>
  );
};

export default App;