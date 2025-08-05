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
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [currentFileIndex, setCurrentFileIndex] = useState<number | null>(null);
  const dropZoneRef = useRef<DropZoneRef>(null);
  const blobUrlsRef = useRef<Set<string>>(new Set());

  const { validateFile, validateFiles } = useFileValidation();
  const { uploadFiles } = useImageUpload();

  // Initialize with initial images if provided
  useEffect(() => {
    if (initialImages.length > 0) {
      const initialFiles: ImageFile[] = initialImages.map((image, index) => {
        if (typeof image === 'string') {
          // For URL strings, we create a placeholder file
          return {
            id: `initial-${index}`,
            file: new File([], `initial-${index}.jpg`, { type: 'image/jpeg' }),
            previewUrl: image,
            isCropped: false,
            isUploaded: true, // Mark initial images as uploaded
          };
        } else {
          // For File objects, use blob URL like new files
          const blobUrl = URL.createObjectURL(image);
          blobUrlsRef.current.add(blobUrl);
          return {
            id: `initial-${index}`,
            file: image,
            previewUrl: blobUrl,
            isCropped: false,
            isUploaded: false,
          };
        }
      });
      setFiles(initialFiles);
    }
  }, [initialImages]);

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
      setCurrentImageUrl(null);
      setCurrentFileIndex(null);
      setIsCropModalOpen(true);
      onCropModalOpen?.(firstFile);
    } else {
      // Process files without cropping
      const newFiles: ImageFile[] = fileArray.map((file, index) => {
        const blobUrl = URL.createObjectURL(file);
        blobUrlsRef.current.add(blobUrl);
        return {
          id: `${Date.now()}-${index}`,
          file,
          previewUrl: blobUrl,
          isCropped: false,
          isUploaded: false,
        };
      });

      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles.map(f => f.file));
    }
  }, [disabled, files, maxFileSize, maxFiles, acceptedTypes, enableCrop, validateFile, validateFiles, onError, onFilesChange, onCropModalOpen]);

  const handleCropSave = useCallback((croppedFile: File) => {
    if (!currentFileToCrop && !currentImageUrl) return;

    const blobUrl = URL.createObjectURL(croppedFile);
    blobUrlsRef.current.add(blobUrl);
    
    const newFile: ImageFile = {
      id: `${Date.now()}`,
      file: croppedFile,
      previewUrl: blobUrl,
      isCropped: true,
      isUploaded: false,
    };

    if (currentFileIndex !== null) {
      // Replacing an existing file
      const updatedFiles = [...files];
      const oldFile = updatedFiles[currentFileIndex];
      
      updatedFiles[currentFileIndex] = newFile;
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles.map(f => f.file));
      onCropComplete?.(croppedFile, currentFileToCrop || new File([], 'original.jpg', { type: 'image/jpeg' }), currentFileIndex);
      
      // Clean up old blob URL after state update, but only if it's different from the new one
      if (oldFile && oldFile.previewUrl.startsWith('blob:') && oldFile.previewUrl !== newFile.previewUrl) {
        setTimeout(() => {
          blobUrlsRef.current.delete(oldFile.previewUrl);
          URL.revokeObjectURL(oldFile.previewUrl);
        }, 100);
      }
    } else {
      // Adding a new file
      const updatedFiles = [...files, newFile];
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles.map(f => f.file));
      onCropComplete?.(croppedFile, currentFileToCrop || new File([], 'original.jpg', { type: 'image/jpeg' }));
    }

    setIsCropModalOpen(false);
    setCurrentFileToCrop(null);
    setCurrentImageUrl(null);
    setCurrentFileIndex(null);
    onCropModalClose?.();
  }, [currentFileToCrop, currentImageUrl, currentFileIndex, files, onFilesChange, onCropComplete, onCropModalClose]);

  const handleCropCancel = useCallback(() => {
    setIsCropModalOpen(false);
    setCurrentFileToCrop(null);
    setCurrentImageUrl(null);
    setCurrentFileIndex(null);
    onCropModalClose?.();
  }, [onCropModalClose]);

  const handleRemoveFile = useCallback((index: number) => {
    const fileToRemove = files[index];
    const updatedFiles = files.filter((_, i) => i !== index);
    
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles.map(f => f.file));
    
    // Clean up blob URL after state update with delay, only if it's a blob URL
    if (fileToRemove && fileToRemove.previewUrl && fileToRemove.previewUrl.startsWith('blob:')) {
      setTimeout(() => {
        blobUrlsRef.current.delete(fileToRemove.previewUrl);
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }, 100);
    }
  }, [files, onFilesChange]);

  const handleEditFile = useCallback((file: ImageFile, index: number) => {
    if (!enableCrop) return;
    
    // Check if this is an initial image with URL string
    const isInitialImage = file.isUploaded && !file.previewUrl.startsWith('blob:');
    
    if (isInitialImage) {
      // This is an initial image with URL, pass the URL to CropModal
      setCurrentFileToCrop(null);
      setCurrentImageUrl(file.previewUrl);
    } else {
      // This is a regular file with blob URL or File object
      setCurrentFileToCrop(file.file);
      setCurrentImageUrl(null);
    }
    
    setCurrentFileIndex(index);
    setIsCropModalOpen(true);
    onCropModalOpen?.(file.file, index);
  }, [enableCrop, onCropModalOpen]);

  const handleUpload = useCallback(async () => {
    if (!uploadUrl || files.length === 0) return;
    
    // Filter only files that are not uploaded yet (exclude initial images)
    const filesToUpload = files.filter(file => !file.isUploaded);
    
    if (filesToUpload.length === 0) {
      // No new files to upload, just return the existing files
      const unuploadedFiles = files.filter(file => !file.isUploaded);
      onUploadComplete?.({
        unuploadedFiles: unuploadedFiles.map(f => f.file),
        uploadResponse: null
      });
      return;
    }
    
    try {
      const response = await uploadFiles(
        filesToUpload.map(f => f.file),
        uploadUrl,
        {
          fieldName: uploadFieldName,
          multipleFileStrategy,
          onProgress: onUploadProgress,
        }
      );
      
      // Mark only the uploaded files as uploaded
      const updatedFiles = files.map(file => {
        const wasUploaded = filesToUpload.some(uploadedFile => uploadedFile.id === file.id);
        return wasUploaded ? { ...file, isUploaded: true } : file;
      });
      setFiles(updatedFiles);
      
      // Get remaining unuploaded files for the callback
      const unuploadedFiles = updatedFiles.filter(file => !file.isUploaded);
      
      onUploadComplete?.({
        unuploadedFiles: unuploadedFiles.map(f => f.file),
        uploadResponse: response
      });
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Upload failed');
    }
  }, [uploadUrl, files, uploadFiles, uploadFieldName, multipleFileStrategy, onUploadProgress, onUploadComplete, onError]);

  // Clean up object URLs only on unmount
  useEffect(() => {
    return () => {
      // Clean up all tracked blob URLs on unmount
      blobUrlsRef.current.forEach(url => {
        URL.revokeObjectURL(url);
      });
      blobUrlsRef.current.clear();
    };
  }, []); // Only run cleanup on unmount, not when files change

  return (
    <div className={`image-uploader ${className}`}>
      {(!editMode || files.length < maxFiles) && (
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
        <div className="upload-button-container">
          <button
            onClick={handleUpload}
            disabled={files.length === 0}
            className={uploadButtonClassName || "upload-button"}
          >
            <span className="upload-button-text">{uploadButtonText}</span>
            {files.length > 1 && (
              <span className="upload-file-count">({files.length} files)</span>
            )}
          </button>
        </div>
      )}
      
      {isCropModalOpen && (currentFileToCrop || currentImageUrl) && (
        <CropModal
          file={currentFileToCrop || undefined}
          imageUrl={currentImageUrl || undefined}
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