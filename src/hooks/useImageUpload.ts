import { useCallback } from 'react';

interface UseImageUploadReturn {
  uploadFiles: (files: File[], uploadUrl: string) => Promise<any>;
}

export const useImageUpload = (): UseImageUploadReturn => {
  const uploadFiles = useCallback(async (files: File[], uploadUrl: string): Promise<any> => {
    const formData = new FormData();
    
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status ${response.status}`);
    }

    return response.json();
  }, []);

  return {
    uploadFiles,
  };
};