import { renderHook, act } from '@testing-library/react';
import { useImageUpload } from './useImageUpload';

// Mock fetch
global.fetch = jest.fn();

describe('useImageUpload', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  test('should upload files successfully', async () => {
    const mockResponse = { success: true, id: '123' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const { result } = renderHook(() => useImageUpload());
    
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const uploadUrl = '/api/upload';
    
    let uploadResult;
    await act(async () => {
      uploadResult = await result.current.uploadFiles([file], uploadUrl);
    });
    
    expect(uploadResult).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(uploadUrl, {
      method: 'POST',
      body: expect.any(FormData),
    });
  });

  test('should throw error when upload fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    const { result } = renderHook(() => useImageUpload());
    
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const uploadUrl = '/api/upload';
    
    await expect(result.current.uploadFiles([file], uploadUrl)).rejects.toThrow('Upload failed with status 400');
  });

  test('should append multiple files to FormData', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ success: true }),
    });

    const { result } = renderHook(() => useImageUpload());
    
    const file1 = new File(['test1'], 'test1.jpg', { type: 'image/jpeg' });
    const file2 = new File(['test2'], 'test2.png', { type: 'image/png' });
    const uploadUrl = '/api/upload';
    
    await act(async () => {
      await result.current.uploadFiles([file1, file2], uploadUrl);
    });
    
    const formData = (global.fetch as jest.Mock).mock.calls[0][1].body;
    expect(formData).toBeInstanceOf(FormData);
  });

  test('should use custom field name for upload', async () => {
    const mockResponse = { success: true, id: '123' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const { result } = renderHook(() => useImageUpload());
    
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const uploadUrl = '/api/upload';
    
    await act(async () => {
      await result.current.uploadFiles([file], uploadUrl, {
        fieldName: 'customFile'
      });
    });
    
    expect(global.fetch).toHaveBeenCalledWith(uploadUrl, {
      method: 'POST',
      body: expect.any(FormData),
    });
  });

  test('should handle multiple-requests strategy', async () => {
    const mockResponse1 = { success: true, id: '123' };
    const mockResponse2 = { success: true, id: '456' };
    
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse1),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse2),
      });

    const { result } = renderHook(() => useImageUpload());
    
    const file1 = new File(['test1'], 'test1.jpg', { type: 'image/jpeg' });
    const file2 = new File(['test2'], 'test2.jpg', { type: 'image/jpeg' });
    const uploadUrl = '/api/upload';
    
    let uploadResult;
    await act(async () => {
      uploadResult = await result.current.uploadFiles([file1, file2], uploadUrl, {
        multipleFileStrategy: 'multiple-requests'
      });
    });
    
    expect(uploadResult).toEqual([mockResponse1, mockResponse2]);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  test('should call progress callback', async () => {
    const mockResponse = { success: true, id: '123' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const { result } = renderHook(() => useImageUpload());
    
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const uploadUrl = '/api/upload';
    const onProgress = jest.fn();
    
    await act(async () => {
      await result.current.uploadFiles([file], uploadUrl, {
        onProgress
      });
    });
    
    expect(onProgress).toHaveBeenCalledWith(100);
  });
});