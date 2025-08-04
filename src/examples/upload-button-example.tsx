import React from 'react';
import { ImageUploader } from '../components/ImageUploader';

export const UploadButtonExample: React.FC = () => {
  const handleUploadComplete = (response: any) => {
    console.log('Upload completed:', response);
    alert('Upload successful!');
  };

  const handleError = (error: string) => {
    console.error('Upload error:', error);
    alert(`Error: ${error}`);
  };

  const handleUploadProgress = (progress: number) => {
    console.log(`Upload progress: ${progress}%`);
  };

  const handleFilesChange = (files: File[]) => {
    console.log('Files changed:', files);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Button Example</h2>
      <p className="mb-6 text-gray-600">
        This example shows how to use the ImageUploader with cropping enabled.
        Select a file, crop it, and then click the upload button to send it to the server.
      </p>
      
      <div className="space-y-6">
        {/* Example 1: Default upload button */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Default Upload Button</h3>
          <ImageUploader
            uploadUrl="/api/images/upload"
            uploadFieldName="image"
            maxFileSize={5}
            enableCrop={true}
            onFilesChange={handleFilesChange}
            onUploadComplete={handleUploadComplete}
            onError={handleError}
            onUploadProgress={handleUploadProgress}
          />
        </div>

        {/* Example 2: Custom upload button text */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Custom Upload Button Text</h3>
          <ImageUploader
            uploadUrl="/api/images/upload"
            uploadFieldName="image"
            maxFileSize={5}
            enableCrop={true}
            uploadButtonText="Send to Server"
            onFilesChange={handleFilesChange}
            onUploadComplete={handleUploadComplete}
            onError={handleError}
            onUploadProgress={handleUploadProgress}
          />
        </div>

        {/* Example 3: Custom upload button styling */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Custom Upload Button Styling</h3>
          <ImageUploader
            uploadUrl="/api/images/upload"
            uploadFieldName="image"
            maxFileSize={5}
            enableCrop={true}
            uploadButtonText="🚀 Upload Image"
            uploadButtonClassName="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
            onFilesChange={handleFilesChange}
            onUploadComplete={handleUploadComplete}
            onError={handleError}
            onUploadProgress={handleUploadProgress}
          />
        </div>

        {/* Example 4: Multiple files with upload button */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Multiple Files Upload</h3>
          <ImageUploader
            uploadUrl="/api/images/upload-multiple"
            uploadFieldName="images"
            maxFiles={3}
            maxFileSize={5}
            multipleFileStrategy="single-request"
            uploadButtonText="Upload All"
            onFilesChange={handleFilesChange}
            onUploadComplete={handleUploadComplete}
            onError={handleError}
            onUploadProgress={handleUploadProgress}
          />
        </div>

        {/* Example 5: Hidden upload button */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Without Upload Button</h3>
          <p className="text-sm text-gray-500 mb-2">
            Use showUploadButton=false to handle upload manually
          </p>
          <ImageUploader
            uploadUrl="/api/images/upload"
            uploadFieldName="image"
            maxFileSize={5}
            enableCrop={true}
            showUploadButton={false}
            onFilesChange={handleFilesChange}
            onUploadComplete={handleUploadComplete}
            onError={handleError}
            onUploadProgress={handleUploadProgress}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadButtonExample;
