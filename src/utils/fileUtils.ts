/**
 * Format file size in bytes to a human-readable string
 * @param bytes The size in bytes
 * @returns A formatted string with the size and appropriate unit
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Validate if a file type is supported
 * @param file The file to validate
 * @param acceptedTypes Array of accepted MIME types
 * @returns True if the file type is supported, false otherwise
 */
export const isFileTypeSupported = (file: File, acceptedTypes: string[]): boolean => {
  return acceptedTypes.includes(file.type);
};

/**
 * Validate if a file size is within the limit
 * @param file The file to validate
 * @param maxSizeInMB The maximum size in megabytes
 * @returns True if the file size is within the limit, false otherwise
 */
export const isFileSizeValid = (file: File, maxSizeInMB: number): boolean => {
  const fileSizeInMB = file.size / (1024 * 1024);
  return fileSizeInMB <= maxSizeInMB;
};

/**
 * Convert a data URL to a File object
 * @param dataUrl The data URL
 * @param filename The name of the file
 * @returns A File object
 */
export const dataUrlToFile = (dataUrl: string, filename: string): File => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || '';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, { type: mime });
};

/**
 * Convert a File object to a data URL
 * @param file The file to convert
 * @returns A promise that resolves to the data URL
 */
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};