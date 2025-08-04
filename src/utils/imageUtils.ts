/**
 * Compress an image file to reduce its size
 * @param file The image file to compress
 * @param quality The quality of the compressed image (0-1)
 * @returns A promise that resolves to the compressed image file
 */
export const compressImage = async (file: File, quality: number = 0.8): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }
    
    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    img.onload = () => {
      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw image on canvas
      ctx.drawImage(img, 0, 0);
      
      // Convert to blob with compression
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error('Could not compress image'));
          }
        },
        'image/jpeg',
        quality
      );
    };
    
    img.onerror = () => {
      reject(new Error('Could not load image'));
    };
  });
};

/**
 * Get image dimensions from a file
 * @param file The image file
 * @returns A promise that resolves to the image dimensions
 */
export const getImageDimensions = async (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    
    img.onerror = () => {
      reject(new Error('Could not load image'));
    };
  });
};

/**
 * Convert a canvas to a file
 * @param canvas The canvas element
 * @param filename The name of the file
 * @param type The MIME type of the file
 * @param quality The quality of the image (0-1)
 * @returns A promise that resolves to the file
 */
export const canvasToFile = async (
  canvas: HTMLCanvasElement,
  filename: string,
  type: string = 'image/jpeg',
  quality: number = 0.8
): Promise<File> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], filename, {
            type,
            lastModified: Date.now(),
          });
          resolve(file);
        } else {
          reject(new Error('Could not convert canvas to file'));
        }
      },
      type,
      quality
    );
  });
};