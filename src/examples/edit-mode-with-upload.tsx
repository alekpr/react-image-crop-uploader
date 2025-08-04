import React, { useState } from 'react';
import { ImageUploader } from '../components/ImageUploader';

export const EditModeWithUploadExample: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadComplete = (response: any) => {
    console.log('Upload completed:', response);
    
    // Simulate adding uploaded image URLs to the list
    // In real app, you would get these URLs from the response
    const newImageUrls = Array.isArray(response) 
      ? response.map((_, index) => `https://example.com/uploaded-image-${Date.now()}-${index}.jpg`)
      : [`https://example.com/uploaded-image-${Date.now()}.jpg`];
    
    setUploadedImages(prev => [...prev, ...newImageUrls]);
    setIsUploading(false);
    
    // The component will automatically clear its state when initialImages updates
  };

  const handleUploadStart = () => {
    setIsUploading(true);
  };

  const handleError = (error: string) => {
    console.error('Upload error:', error);
    setIsUploading(false);
    alert(`Error: ${error}`);
  };

  const handleRemoveUploadedImage = (indexToRemove: number) => {
    setUploadedImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Enhanced Edit Mode with Upload</h2>
      <p className="mb-6 text-gray-600">
        This example shows the enhanced edit mode where you can:
        <br />• Add new images even in edit mode
        <br />• Upload images and see them in the gallery
        <br />• Edit/crop existing images
        <br />• Remove images from the collection
      </p>

      {/* Show uploaded images for reference */}
      {uploadedImages.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Uploaded Images:</h3>
          <div className="flex flex-wrap gap-2">
            {uploadedImages.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Uploaded ${index + 1}`}
                  className="w-20 h-20 object-cover rounded border"
                />
                <button
                  onClick={() => handleRemoveUploadedImage(index)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Example 1: Edit mode with upload capability */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Edit Mode with Upload</h3>
          <ImageUploader
            editMode={true}
            initialImages={uploadedImages} // This will clear the component state when updated
            uploadUrl="/api/images/upload"
            uploadFieldName="image"
            maxFiles={5}
            maxFileSize={5}
            enableCrop={true}
            uploadButtonText={isUploading ? "Uploading..." : "Upload Images"}
            onUploadComplete={handleUploadComplete}
            onFilesChange={(files) => {
              console.log('Files changed:', files);
              if (files.length > 0 && !isUploading) {
                // Auto-trigger upload when files are selected/cropped
                // handleUploadStart();
              }
            }}
            onError={handleError}
            disabled={isUploading}
          />
        </div>

        {/* Example 2: Manual upload control in edit mode */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Manual Upload Control</h3>
          <ImageUploader
            editMode={true}
            initialImages={[]}
            uploadUrl="/api/images/upload"
            uploadFieldName="image"
            maxFiles={3}
            maxFileSize={5}
            enableCrop={true}
            showUploadButton={true}
            uploadButtonText="Save Changes"
            uploadButtonClassName="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onUploadComplete={(response) => {
              console.log('Manual upload completed:', response);
              alert('Images saved successfully!');
            }}
            onError={handleError}
          />
        </div>

        {/* Example 3: Edit mode with existing images and add new ones */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Mix of Existing & New Images</h3>
          <ImageUploader
            editMode={true}
            initialImages={[
              'https://picsum.photos/200/200?random=1',
              'https://picsum.photos/200/200?random=2'
            ]}
            uploadUrl="/api/images/upload"
            uploadFieldName="images"
            maxFiles={5}
            maxFileSize={5}
            enableCrop={true}
            multipleFileStrategy="single-request"
            uploadButtonText="Update Gallery"
            onUploadComplete={(response) => {
              console.log('Gallery updated:', response);
              alert('Gallery updated successfully!');
            }}
            onError={handleError}
          />
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Key Features:</h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>✅ Edit mode now allows adding new images</li>
          <li>✅ Upload state automatically clears when initialImages updates</li>
          <li>✅ Can mix existing images with newly uploaded ones</li>
          <li>✅ Full editing capabilities (crop, remove, add) in edit mode</li>
          <li>✅ Upload progress and error handling</li>
        </ul>
      </div>
    </div>
  );
};

export default EditModeWithUploadExample;
