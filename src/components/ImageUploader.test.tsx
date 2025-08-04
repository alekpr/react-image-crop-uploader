import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImageUploader } from './ImageUploader';

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

describe('ImageUploader', () => {
  test('renders upload area with default props', () => {
    render(<ImageUploader />);
    expect(screen.getByText('Drag & drop images here or click to select')).toBeInTheDocument();
  });

  test('renders with custom placeholder text', () => {
    render(<ImageUploader placeholder="Custom placeholder" />);
    expect(screen.getByText('Custom placeholder')).toBeInTheDocument();
  });

  test('applies custom className correctly', () => {
    const { container } = render(<ImageUploader className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('disables component when disabled prop is true', () => {
    render(<ImageUploader disabled={true} />);
    const dropZone = screen.getByText('Drag & drop images here or click to select').closest('.drop-zone');
    expect(dropZone).toHaveClass('disabled');
  });

  test('renders initial images in edit mode', () => {
    const initialImages = ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'];
    render(<ImageUploader initialImages={initialImages} editMode={true} />);
    
    // Check that the images are rendered
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
  });

  test('shows edit button when enableCrop is true', () => {
    const initialImages = ['https://example.com/image1.jpg'];
    render(<ImageUploader initialImages={initialImages} editMode={true} enableCrop={true} />);
    
    // Check that the edit button is rendered
    const editButtons = screen.getAllByText('Edit');
    expect(editButtons).toHaveLength(1);
  });

  test('handles file selection and cropping', () => {
    const mockOnCropModalOpen = jest.fn();
    render(<ImageUploader enableCrop={true} onCropModalOpen={mockOnCropModalOpen} />);
    
    // Simulate file selection
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByTestId('file-input');
    
    if (input) {
      Object.defineProperty(input, 'files', {
        value: [file],
      });
      
      fireEvent.change(input);
      
      // Check that the crop modal would open
      expect(mockOnCropModalOpen).toHaveBeenCalledWith(file);
    }
  });

  test('shows upload button when uploadUrl is provided and files are present', () => {
    const initialImages = ['https://example.com/image1.jpg'];
    render(<ImageUploader uploadUrl="/api/upload" initialImages={initialImages} />);
    
    // Check that the upload button is rendered
    expect(screen.getByText('Upload')).toBeInTheDocument();
  });

  test('hides upload button when showUploadButton is false', () => {
    const initialImages = ['https://example.com/image1.jpg'];
    render(<ImageUploader uploadUrl="/api/upload" initialImages={initialImages} showUploadButton={false} />);
    
    // Check that the upload button is not rendered
    expect(screen.queryByText('Upload')).not.toBeInTheDocument();
  });

  test('shows custom upload button text', () => {
    const initialImages = ['https://example.com/image1.jpg'];
    render(<ImageUploader uploadUrl="/api/upload" initialImages={initialImages} uploadButtonText="Send Files" />);
    
    // Check that the custom text is rendered
    expect(screen.getByText('Send Files')).toBeInTheDocument();
  });

  test('shows file count in upload button for multiple files', () => {
    const initialImages = ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'];
    render(<ImageUploader uploadUrl="/api/upload" initialImages={initialImages} maxFiles={5} />);
    
    // Check that the file count is shown
    expect(screen.getByText(/Upload.*\(2 files\)/)).toBeInTheDocument();
  });

  test('does not show upload button without uploadUrl', () => {
    const initialImages = ['https://example.com/image1.jpg'];
    render(<ImageUploader initialImages={initialImages} />);
    
    // Check that the upload button is not rendered
    expect(screen.queryByText('Upload')).not.toBeInTheDocument();
  });
});