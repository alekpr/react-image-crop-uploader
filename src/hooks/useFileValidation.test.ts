import { renderHook } from '@testing-library/react';
import { useFileValidation } from './useFileValidation';

describe('useFileValidation', () => {
  const mockImageFile = {
    id: '1',
    file: new File(['test'], 'test.jpg', { type: 'image/jpeg' }),
    previewUrl: 'mock-url',
    isCropped: false,
    isUploaded: false,
  };

  test('should validate file size correctly', () => {
    const { result } = renderHook(() => useFileValidation());
    
    const largeFile = new File([new ArrayBuffer(10 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' }); // 10MB file
    const error = result.current.validateFile(largeFile, 5, ['image/jpeg']);
    
    expect(error).toBe('File size exceeds 5MB limit');
  });

  test('should validate file type correctly', () => {
    const { result } = renderHook(() => useFileValidation());
    
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const error = result.current.validateFile(file, 5, ['image/jpeg', 'image/png']);
    
    expect(error).toBe('File type not supported. Accepted types: image/jpeg, image/png');
  });

  test('should return null for valid file', () => {
    const { result } = renderHook(() => useFileValidation());
    
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const error = result.current.validateFile(file, 5, ['image/jpeg']);
    
    expect(error).toBeNull();
  });

  test('should validate file count correctly', () => {
    const { result } = renderHook(() => useFileValidation());
    
    const files = [
      new File(['test1'], 'test1.jpg', { type: 'image/jpeg' }),
      new File(['test2'], 'test2.jpg', { type: 'image/jpeg' }),
      new File(['test3'], 'test3.jpg', { type: 'image/jpeg' }),
    ];
    
    const errors = result.current.validateFiles(files, [mockImageFile, mockImageFile], 3, 5, ['image/jpeg']);
    
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBe('Maximum 3 files allowed');
  });

  test('should validate individual files in validateFiles', () => {
    const { result } = renderHook(() => useFileValidation());
    
    const validFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const invalidFile = new File([new ArrayBuffer(10 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' }); // 10MB file
    
    const files = [validFile, invalidFile];
    const errors = result.current.validateFiles(files, [], 5, 5, ['image/jpeg']);
    
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBe('File size exceeds 5MB limit');
  });

  test('should return no errors for valid files', () => {
    const { result } = renderHook(() => useFileValidation());
    
    const files = [
      new File(['test1'], 'test1.jpg', { type: 'image/jpeg' }),
      new File(['test2'], 'test2.png', { type: 'image/png' }),
    ];
    
    const errors = result.current.validateFiles(files, [], 5, 5, ['image/jpeg', 'image/png']);
    
    expect(errors).toHaveLength(0);
  });
});