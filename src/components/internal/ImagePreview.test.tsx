import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImagePreview } from './ImagePreview';

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

describe('ImagePreview', () => {
  const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
  
  const mockImageFile = {
    id: '1',
    file: mockFile,
    previewUrl: 'mock-url',
    isCropped: false,
    isUploaded: false,
  };

  const mockOnRemove = jest.fn();
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    mockOnRemove.mockClear();
    mockOnEdit.mockClear();
  });

  test('renders image preview with file URL', () => {
    render(
      <ImagePreview
        file={mockImageFile}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
      />
    );
    
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'mock-url');
  });

  test('renders image preview with HTTP URL', () => {
    const httpImageFile = {
      ...mockImageFile,
      previewUrl: 'https://example.com/image.jpg',
    };
    
    render(
      <ImagePreview
        file={httpImageFile}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
      />
    );
    
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  test('shows crop indicator when image is cropped', () => {
    const croppedImageFile = {
      ...mockImageFile,
      isCropped: true,
    };
    
    render(
      <ImagePreview
        file={croppedImageFile}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
      />
    );
    
    expect(screen.getByText('Cropped')).toBeInTheDocument();
  });

  test('hides crop indicator when image is not cropped', () => {
    render(
      <ImagePreview
        file={mockImageFile}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
      />
    );
    
    expect(screen.queryByText('Cropped')).not.toBeInTheDocument();
  });

  test('shows edit button when showEditButton is true', () => {
    render(
      <ImagePreview
        file={mockImageFile}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
        showEditButton={true}
      />
    );
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  test('hides edit button when showEditButton is false', () => {
    render(
      <ImagePreview
        file={mockImageFile}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
        showEditButton={false}
      />
    );
    
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  test('uses custom edit button text', () => {
    render(
      <ImagePreview
        file={mockImageFile}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
        showEditButton={true}
        editButtonText="Custom Edit"
      />
    );
    
    expect(screen.getByText('Custom Edit')).toBeInTheDocument();
  });

  test('calls onRemove when remove button is clicked', () => {
    render(
      <ImagePreview
        file={mockImageFile}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
      />
    );
    
    const removeButton = screen.getByText('×');
    fireEvent.click(removeButton);
    
    expect(mockOnRemove).toHaveBeenCalled();
  });

  test('calls onEdit when edit button is clicked', () => {
    render(
      <ImagePreview
        file={mockImageFile}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
        showEditButton={true}
      />
    );
    
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    
    expect(mockOnEdit).toHaveBeenCalled();
  });

  test('does not show edit button when showEditButton is false', () => {
    render(
      <ImagePreview
        file={mockImageFile}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
        showEditButton={false}
      />
    );
    
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });
});