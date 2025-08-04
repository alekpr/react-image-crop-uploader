import React from 'react';
import { ImagePreview } from './ImagePreview';
import { ImageFile } from '../../types';

interface ImageGalleryProps {
  files: ImageFile[];
  onRemove: (index: number) => void;
  onEdit: (file: ImageFile, index: number) => void;
  showEditButton?: boolean;
  editButtonText?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  files,
  onRemove,
  onEdit,
  showEditButton = true,
  editButtonText = 'Edit',
}) => {
  if (files.length === 0) return null;

  return (
    <div className="image-gallery">
      {files.map((file, index) => (
        <ImagePreview
          key={file.id}
          file={file}
          onRemove={() => onRemove(index)}
          onEdit={() => onEdit(file, index)}
          showEditButton={showEditButton}
          editButtonText={editButtonText}
        />
      ))}
    </div>
  );
};