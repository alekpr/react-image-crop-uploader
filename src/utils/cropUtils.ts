/**
 * Calculate the crop area based on aspect ratio
 * @param imageWidth The width of the image
 * @param imageHeight The height of the image
 * @param aspectRatio The desired aspect ratio (width/height)
 * @returns The calculated crop area dimensions
 */
export const calculateCropArea = (
  imageWidth: number,
  imageHeight: number,
  aspectRatio: number | 'free'
): { width: number; height: number; x: number; y: number } => {
  if (aspectRatio === 'free') {
    return {
      width: imageWidth,
      height: imageHeight,
      x: 0,
      y: 0,
    };
  }

  const imageAspectRatio = imageWidth / imageHeight;
  
  if (imageAspectRatio > aspectRatio) {
    // Image is wider than the desired aspect ratio
    const cropHeight = imageHeight;
    const cropWidth = cropHeight * aspectRatio;
    const x = (imageWidth - cropWidth) / 2;
    const y = 0;
    
    return {
      width: cropWidth,
      height: cropHeight,
      x,
      y,
    };
  } else {
    // Image is taller than the desired aspect ratio
    const cropWidth = imageWidth;
    const cropHeight = cropWidth / aspectRatio;
    const x = 0;
    const y = (imageHeight - cropHeight) / 2;
    
    return {
      width: cropWidth,
      height: cropHeight,
      x,
      y,
    };
  }
};

/**
 * Apply crop to an image using canvas
 * @param image The image element
 * @param cropArea The crop area coordinates
 * @param outputWidth The desired output width
 * @param outputHeight The desired output height
 * @returns A promise that resolves to the cropped canvas
 */
export const applyCrop = async (
  image: HTMLImageElement,
  cropArea: { x: number; y: number; width: number; height: number },
  outputWidth?: number,
  outputHeight?: number
): Promise<HTMLCanvasElement> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }
    
    // Set canvas dimensions
    if (outputWidth && outputHeight) {
      canvas.width = outputWidth;
      canvas.height = outputHeight;
    } else {
      canvas.width = cropArea.width;
      canvas.height = cropArea.height;
    }
    
    // Draw cropped image on canvas
    ctx.drawImage(
      image,
      cropArea.x,
      cropArea.y,
      cropArea.width,
      cropArea.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
    
    resolve(canvas);
  });
};

/**
 * Create a circular crop mask
 * @param canvas The canvas to apply the mask to
 */
export const applyCircularMask = (canvas: HTMLCanvasElement): void => {
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  
  // Create circular clipping path
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(
    canvas.width / 2,
    canvas.height / 2,
    Math.min(canvas.width, canvas.height) / 2,
    0,
    2 * Math.PI
  );
  ctx.closePath();
  ctx.fill();
};