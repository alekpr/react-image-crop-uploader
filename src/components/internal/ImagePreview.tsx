import React from 'react';
import { ImageFile } from '../../types';

interface ImagePreviewProps {
  file: ImageFile;
  onRemove: () => void;
  onEdit: () => void;
  showEditButton?: boolean;
  editButtonText?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  file,
  onRemove,
  onEdit,
  showEditButton = true,
  editButtonText = 'Edit',
}) => {
  return (
    <div className="image-preview">
      {file.previewUrl.startsWith('http') ? (
        // For initial images that are URLs
        <img src={file.previewUrl} alt="Preview" />
      ) : (
        // For files with object URLs
        <img src={file.previewUrl} alt="Preview" />
      )}
      
      <div className="image-preview-actions">
        {showEditButton && (
          <button onClick={onEdit} type="button">
            {editButtonText}
          </button>
        )}
        <button onClick={onRemove} type="button">
          ×
        </button>
      </div>
      
      {file.isCropped && (
        <div className="crop-indicator">Cropped</div>
      )}
    </div>
  );
};