import { useCallback } from 'react';

interface UseImageUploadReturn {
  uploadFiles: (files: File[], uploadUrl: string, options?: UploadOptions) => Promise<any>;
}

interface UploadOptions {
  fieldName?: string;
  multipleFileStrategy?: 'single-request' | 'multiple-requests';
  onProgress?: (progress: number) => void;
}

export const useImageUpload = (): UseImageUploadReturn => {
  const uploadFiles = useCallback(async (
    files: File[], 
    uploadUrl: string, 
    options: UploadOptions = {}
  ): Promise<any> => {
    const { 
      fieldName = 'image', 
      multipleFileStrategy = 'single-request',
      onProgress 
    } = options;

    try {
      if (multipleFileStrategy === 'multiple-requests' && files.length > 1) {
        // Send each file in separate requests
        const results = [];
        for (let i = 0; i < files.length; i++) {
          const formData = new FormData();
          formData.append(fieldName, files[i]);

          if (onProgress) {
            onProgress((i / files.length) * 100);
          }

          const response = await fetch(uploadUrl, {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Upload failed for file ${i + 1} with status ${response.status}`);
          }

          const result = await response.json();
          results.push(result);
        }

        if (onProgress) {
          onProgress(100);
        }

        return results;
      } else {
        // Send all files in a single request
        const formData = new FormData();
        
        if (files.length === 1) {
          // Single file upload - use the specified field name
          formData.append(fieldName, files[0]);
        } else {
          // Multiple files in single request - append each with same field name
          // This allows backend to receive files as an array
          files.forEach((file) => {
            formData.append(fieldName, file);
          });
        }

        const response = await fetch(uploadUrl, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Upload failed with status ${response.status}`);
        }

        if (onProgress) {
          onProgress(100);
        }

        return response.json();
      }
    } catch (error) {
      if (onProgress) {
        onProgress(0);
      }
      throw error;
    }
  }, []);

  return {
    uploadFiles,
  };
};