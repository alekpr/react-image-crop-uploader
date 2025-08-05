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
    <div 
      className="image-preview"
      style={{
        display: 'inline-block',
        position: 'relative',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        margin: '0.5rem',
      }}
    >
      <img 
        key={`${file.id}-${file.previewUrl}`}
        src={file.previewUrl} 
        alt={`Preview of ${file.file.name}`}
        style={{
          width: '150px',
          height: '150px',
          objectFit: 'cover',
          display: 'block',
          backgroundColor: '#f3f4f6',
        }}
      />
      
      <div 
        className="image-preview-actions"
        style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          display: 'flex',
          gap: '0.25rem',
        }}
      >
        {showEditButton && (
          <button 
            onClick={onEdit} 
            type="button"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #d1d5db',
              borderRadius: '0.25rem',
              padding: '0.25rem 0.5rem',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: '500',
            }}
          >
            {editButtonText}
          </button>
        )}
        <button 
          onClick={onRemove} 
          type="button"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #d1d5db',
            borderRadius: '0.25rem',
            padding: '0.25rem 0.5rem',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: '500',
          }}
        >
          ×
        </button>
      </div>
      
      {file.isCropped && (
        <div 
          className="crop-indicator"
          style={{
            position: 'absolute',
            bottom: '0.5rem',
            left: '0.5rem',
            backgroundColor: 'rgba(59, 130, 246, 0.9)',
            color: 'white',
            fontSize: '0.625rem',
            padding: '0.125rem 0.25rem',
            borderRadius: '0.125rem',
            fontWeight: '600',
          }}
        >
          Cropped
        </div>
      )}
    </div>
  );
};