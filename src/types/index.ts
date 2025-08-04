export interface ImageUploadProps {
  // Upload Configuration
  uploadUrl?: string;
  maxFileSize?: number; // in MB
  maxFiles?: number;
  acceptedTypes?: string[];
  
  // Crop Configuration
  cropAspectRatio?: number | 'free';
  cropSize?: { width: number; height: number };
  enableCrop?: boolean;
  cropModalTitle?: string;
  
  // Initial State
  initialImages?: string[] | File[];
  editMode?: boolean;
  
  // Callbacks
  onUploadComplete?: (response: any) => void;
  onFilesChange?: (files: File[]) => void;
  onError?: (error: string) => void;
  onCropComplete?: (croppedFile: File, originalFile: File, index?: number) => void;
  onCropModalOpen?: (file: File, index?: number) => void;
  onCropModalClose?: () => void;
  
  // UI Configuration
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showEditButton?: boolean;
  editButtonText?: string;
  
  // Modal Configuration
  cropModalProps?: {
    title?: string;
    saveButtonText?: string;
    cancelButtonText?: string;
    resetButtonText?: string;
  };
}

export interface ImageFile {
  id: string;
  file: File;
  previewUrl: string;
  isCropped: boolean;
  isUploaded?: boolean;
  uploadError?: string;
}

export interface CropSettings {
  aspectRatio: number | 'free';
  width?: number;
  height?: number;
  circularCrop?: boolean;
}