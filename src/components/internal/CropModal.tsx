import React, { useState, useRef, useEffect } from 'react';
import Cropper from 'react-easy-crop';

interface CropModalProps {
  file?: File;
  imageUrl?: string;
  onSave: (croppedFile: File) => void;
  onCancel: () => void;
  aspectRatio: number | 'free';
  cropSize?: { width: number; height: number };
  title?: string;
  saveButtonText?: string;
  cancelButtonText?: string;
  resetButtonText?: string;
}

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

const getCroppedImg = async (imageSrc: string, pixelCrop: Area): Promise<Blob> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // Set canvas size to match the cropped area
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the cropped image
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Convert to blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Could not create blob'));
      }
    }, 'image/jpeg');
  });
};

export const CropModal: React.FC<CropModalProps> = ({
  file,
  imageUrl,
  onSave,
  onCancel,
  aspectRatio,
  cropSize,
  title = 'Crop Image',
  saveButtonText = 'Save',
  cancelButtonText = 'Cancel',
  resetButtonText = 'Reset',
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    if (file) {
      // Use File object
      const objectUrl = URL.createObjectURL(file);
      setImageSrc(objectUrl);
      
      // Clean up object URL
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else if (imageUrl) {
      // Use image URL directly
      setImageSrc(imageUrl);
    }
  }, [file, imageUrl]);

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      
      // Determine filename and type
      let fileName = 'cropped-image.jpg';
      let fileType = 'image/jpeg';
      
      if (file) {
        fileName = file.name;
        fileType = file.type;
      } else if (imageUrl) {
        // Extract filename from URL or use default
        const urlParts = imageUrl.split('/');
        const lastPart = urlParts[urlParts.length - 1];
        if (lastPart && lastPart.includes('.')) {
          fileName = lastPart.split('?')[0]; // Remove query params
        }
        // Determine type from URL extension or use default
        if (fileName.toLowerCase().includes('.png')) {
          fileType = 'image/png';
        } else if (fileName.toLowerCase().includes('.webp')) {
          fileType = 'image/webp';
        }
      }
      
      const croppedFile = new File([croppedBlob], fileName, {
        type: fileType,
        lastModified: Date.now(),
      });
      onSave(croppedFile);
    } catch (error) {
      console.error('Error cropping image:', error);
      onCancel();
    }
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  // Handle keyboard events for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  const numericAspectRatio = aspectRatio === 'free' ? undefined : aspectRatio;

  return (
    <div 
      className="crop-modal-overlay"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="crop-modal">
        <div className="crop-modal-header">
          <h2>{title}</h2>
          <button 
            className="close-button" 
            onClick={onCancel}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        
        <div className="crop-modal-content">
          <div className="crop-container">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={numericAspectRatio}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              classes={{
                containerClassName: 'crop-easy-container',
                mediaClassName: 'crop-easy-media',
              }}
            />
          </div>
        </div>
        
        <div className="crop-controls">
          <label htmlFor="zoom-slider">Zoom:</label>
          <input
            id="zoom-slider"
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="zoom-slider"
          />
          <span className="zoom-value">{Math.round(zoom * 100)}%</span>
        </div>
        
        <div className="crop-modal-actions">
          <button className="reset-button" onClick={handleReset}>
            {resetButtonText}
          </button>
          <div className="action-buttons">
            <button className="cancel-button" onClick={onCancel}>
              {cancelButtonText}
            </button>
            <button className="save-button" onClick={handleSave}>
              {saveButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};