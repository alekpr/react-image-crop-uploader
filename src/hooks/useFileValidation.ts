import { useCallback } from 'react';
import { ImageFile } from '../types';

interface UseFileValidationReturn {
  validateFile: (file: File, maxFileSize: number, acceptedTypes: string[]) => string | null;
  validateFiles: (files: FileList | File[], currentFiles: ImageFile[], maxFiles: number, maxFileSize: number, acceptedTypes: string[]) => string[];
}

export const useFileValidation = (): UseFileValidationReturn => {
  const validateFile = useCallback((file: File, maxFileSize: number, acceptedTypes: string[]): string | null => {
    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxFileSize) {
      return `File size exceeds ${maxFileSize}MB limit`;
    }

    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      return `File type not supported. Accepted types: ${acceptedTypes.join(', ')}`;
    }

    return null;
  }, []);

  const validateFiles = useCallback((files: FileList | File[], currentFiles: ImageFile[], maxFiles: number, maxFileSize: number, acceptedTypes: string[]): string[] => {
    const errors: string[] = [];
    const fileArray = Array.from(files);
    
    // Check total file count
    if (currentFiles.length + fileArray.length > maxFiles) {
      errors.push(`Maximum ${maxFiles} files allowed`);
      return errors;
    }

    // Validate each file
    fileArray.forEach(file => {
      const fileError = validateFile(file, maxFileSize, acceptedTypes);
      if (fileError) {
        errors.push(fileError);
      }
    });

    return errors;
  }, [validateFile]);

  return {
    validateFile,
    validateFiles,
  };
};