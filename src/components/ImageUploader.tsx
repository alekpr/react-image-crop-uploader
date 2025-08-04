import React, { useState, useCallback, useEffect, useRef } from 'react';
import { DropZone, DropZoneRef } from './internal/DropZone';
import { ImageGallery } from './internal/ImageGallery';
import { CropModal } from './internal/CropModal';
import { useImageUpload } from '../hooks/useImageUpload';
import { useFileValidation } from '../hooks/useFileValidation';
import { ImageFile, ImageUploadProps } from '../types';

export const ImageUploader: React.FC<ImageUploadProps> = ({
  uploadUrl,
  maxFileSize = 5,
  maxFiles = 1,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  uploadFieldName = 'image',
  multipleFileStrategy = 'single-request',
  cropAspectRatio = 'free',
  cropSize,
  enableCrop = false,
  cropModalTitle = 'Crop Image',
  initialImages = [],
  editMode = false,
  onUploadComplete,
  onFilesChange,
  onError,
  onCropComplete,
  onCropModalOpen,
  onCropModalClose,
  onUploadProgress,
  placeholder = 'Drag & drop images here or click to select',
  disabled = false,
  className = '',
  showEditButton = true,
  editButtonText = 'Edit',
  showUploadButton = true,
  uploadButtonText = 'Upload',
  uploadButtonClassName = '',
  cropModalProps = {
    title: 'Crop Image',
    saveButtonText: 'Save',
    cancelButtonText: 'Cancel',
    resetButtonText: 'Reset',
  },
}) => {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [currentFileToCrop, setCurrentFileToCrop] = useState<File | null>(null);
  const [currentFileIndex, setCurrentFileIndex] = useState<number | null>(null);
  const dropZoneRef = useRef<DropZoneRef>(null);

  const { validateFile, validateFiles } = useFileValidation();
  const { uploadFiles } = useImageUpload();

  // Initialize with initial images if provided
  useEffect(() => {
    if (initialImages.length > 0 && files.length === 0) {
      const initialFiles: ImageFile[] = initialImages.map((image, index) => {
        if (typeof image === 'string') {
          // For URL strings, we create a placeholder file
          return {
            id: `initial-${index}`,
            file: new File([], `initial-${index}.jpg`, { type: 'image/jpeg' }),
            previewUrl: image,
            isCropped: false,
            isUploaded: false,
          };
        } else {
          // For File objects
          return {
            id: `initial-${index}`,
            file: image,
            previewUrl: URL.createObjectURL(image),
            isCropped: false,
            isUploaded: false,
          };
        }
      });
      setFiles(initialFiles);
    }
  }, [initialImages, files.length]);

  const handleFilesSelected = useCallback((selectedFiles: FileList) => {
    if (disabled) return;

    // Validate files
    const validationErrors = validateFiles(selectedFiles, files, maxFiles, maxFileSize, acceptedTypes);
    if (validationErrors.length > 0) {
      onError?.(validationErrors[0]);
      return;
    }

    const fileArray = Array.from(selectedFiles);
    
    // Validate each file
    for (const file of fileArray) {
      const validationError = validateFile(file, maxFileSize, acceptedTypes);
      if (validationError) {
        onError?.(validationError);
        return;
      }
    }

    // If cropping is enabled, open crop modal for the first file
    if (enableCrop && fileArray.length > 0) {
      const firstFile = fileArray[0];
      setCurrentFileToCrop(firstFile);
      setCurrentFileIndex(null);
      setIsCropModalOpen(true);
      onCropModalOpen?.(firstFile);
    } else {
      // Process files without cropping
      const newFiles: ImageFile[] = fileArray.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        file,
        previewUrl: URL.createObjectURL(file),
        isCropped: false,
        isUploaded: false,
      }));

      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles.map(f => f.file));
    }
  }, [disabled, files, maxFileSize, maxFiles, acceptedTypes, enableCrop, validateFile, validateFiles, onError, onFilesChange, onCropModalOpen]);

  const handleCropSave = useCallback((croppedFile: File) => {
    if (!currentFileToCrop) return;

    const newFile: ImageFile = {
      id: `${Date.now()}`,
      file: croppedFile,
      previewUrl: URL.createObjectURL(croppedFile),
      isCropped: true,
      isUploaded: false,
    };

    if (currentFileIndex !== null) {
      // Replacing an existing file
      const updatedFiles = [...files];
      updatedFiles[currentFileIndex] = newFile;
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles.map(f => f.file));
      onCropComplete?.(croppedFile, currentFileToCrop, currentFileIndex);
    } else {
      // Adding a new file
      const updatedFiles = [...files, newFile];
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles.map(f => f.file));
      onCropComplete?.(croppedFile, currentFileToCrop);
    }

    setIsCropModalOpen(false);
    setCurrentFileToCrop(null);
    setCurrentFileIndex(null);
    onCropModalClose?.();
  }, [currentFileToCrop, currentFileIndex, files, onFilesChange, onCropComplete, onCropModalClose]);

  const handleCropCancel = useCallback(() => {
    setIsCropModalOpen(false);
    setCurrentFileToCrop(null);
    setCurrentFileIndex(null);
    onCropModalClose?.();
  }, [onCropModalClose]);

  const handleRemoveFile = useCallback((index: number) => {
    const fileToRemove = files[index];
    URL.revokeObjectURL(fileToRemove.previewUrl);
    
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles.map(f => f.file));
  }, [files, onFilesChange]);

  const handleEditFile = useCallback((file: ImageFile, index: number) => {
    if (!enableCrop) return;
    
    setCurrentFileToCrop(file.file);
    setCurrentFileIndex(index);
    setIsCropModalOpen(true);
    onCropModalOpen?.(file.file, index);
  }, [enableCrop, onCropModalOpen]);

  const handleUpload = useCallback(async () => {
    if (!uploadUrl || files.length === 0) return;
    
    try {
      const response = await uploadFiles(
        files.map(f => f.file),
        uploadUrl,
        {
          fieldName: uploadFieldName,
          multipleFileStrategy,
          onProgress: onUploadProgress,
        }
      );
      onUploadComplete?.(response);
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Upload failed');
    }
  }, [uploadUrl, files, uploadFiles, uploadFieldName, multipleFileStrategy, onUploadProgress, onUploadComplete, onError]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach(file => {
        URL.revokeObjectURL(file.previewUrl);
      });
    };
  }, [files]);

  return (
    <div className={`image-uploader ${className}`}>
      {!editMode && (
        <DropZone
          ref={dropZoneRef}
          onFilesSelected={handleFilesSelected}
          placeholder={placeholder}
          disabled={disabled || files.length >= maxFiles}
          multiple={maxFiles > 1}
          accept={acceptedTypes.join(',')}
        />
      )}
      
      {files.length > 0 && (
        <ImageGallery
          files={files}
          onRemove={handleRemoveFile}
          onEdit={handleEditFile}
          showEditButton={showEditButton && enableCrop}
          editButtonText={editButtonText}
        />
      )}
      
      {files.length > 0 && uploadUrl && showUploadButton && (
        <div className="mt-4">
          <button
            onClick={handleUpload}
            disabled={files.length === 0}
            className={uploadButtonClassName || "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"}
          >
            {uploadButtonText} {files.length > 1 ? `(${files.length} files)` : ''}
          </button>
        </div>
      )}
      
      {isCropModalOpen && currentFileToCrop && (
        <CropModal
          file={currentFileToCrop}
          onSave={handleCropSave}
          onCancel={handleCropCancel}
          aspectRatio={cropAspectRatio}
          cropSize={cropSize}
          title={cropModalProps.title}
          saveButtonText={cropModalProps.saveButtonText}
          cancelButtonText={cropModalProps.cancelButtonText}
          resetButtonText={cropModalProps.resetButtonText}
        />
      )}
    </div>
  );
};

export default ImageUploader;