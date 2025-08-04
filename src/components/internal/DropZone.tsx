import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';

interface DropZoneProps {
  onFilesSelected: (files: FileList) => void;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
}

export interface DropZoneRef {
  openFileSelector: () => void;
}

export const DropZone = forwardRef<DropZoneRef, DropZoneProps>(({
  onFilesSelected,
  placeholder = 'Drag & drop images here or click to select',
  disabled = false,
  multiple = false,
  accept = 'image/*',
}, ref) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    openFileSelector: () => {
      fileInputRef.current?.click();
    }
  }));

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled || !e.dataTransfer.files.length) return;
    
    onFilesSelected(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || !e.target.files) return;
    
    onFilesSelected(e.target.files);
    // Reset input to allow selecting the same file again
    e.target.value = '';
  };

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`drop-zone ${isDragOver ? 'drag-over' : ''} ${disabled ? 'disabled' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <div className="drop-zone-content">
        <p className="drop-zone-placeholder">{placeholder}</p>
        <p className="drop-zone-info">
          {multiple ? 'Select multiple images' : 'Select an image'}
        </p>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        disabled={disabled}
        data-testid="file-input"
      />
    </div>
  );
});