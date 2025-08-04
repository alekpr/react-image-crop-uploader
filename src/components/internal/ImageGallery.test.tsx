import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImageGallery } from './ImageGallery';

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

describe('ImageGallery', () => {
  const mockFile1 = new File(['test1'], 'test1.jpg', { type: 'image/jpeg' });
  const mockFile2 = new File(['test2'], 'test2.jpg', { type: 'image/jpeg' });
  
  const mockImageFiles = [
    {
      id: '1',
      file: mockFile1,
      previewUrl: 'mock-url-1',
      isCropped: false,
      isUploaded: false,
    },
    {
      id: '2',
      file: mockFile2,
      previewUrl: 'mock-url-2',
      isCropped: true,
      isUploaded: false,
    }
  ];

  const mockOnRemove = jest.fn();
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    mockOnRemove.mockClear();
    mockOnEdit.mockClear();
  });

  test('renders null when no files provided', () => {
    const { container } = render(
      <ImageGallery
        files={[]}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
      />
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('renders image previews for each file', () => {
    render(
      <ImageGallery
        files={mockImageFiles}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
      />
    );
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    
    expect(images[0]).toHaveAttribute('src', 'mock-url-1');
    expect(images[1]).toHaveAttribute('src', 'mock-url-2');
  });

  test('shows crop indicators for cropped images', () => {
    render(
      <ImageGallery
        files={mockImageFiles}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
      />
    );
    
    // Only the second image should have a crop indicator
    const cropIndicators = screen.getAllByText('Cropped');
    expect(cropIndicators).toHaveLength(1);
  });

  test('shows edit buttons when showEditButton is true', () => {
    render(
      <ImageGallery
        files={mockImageFiles}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
        showEditButton={true}
      />
    );
    
    const editButtons = screen.getAllByText('Edit');
    expect(editButtons).toHaveLength(2);
  });

  test('hides edit buttons when showEditButton is false', () => {
    render(
      <ImageGallery
        files={mockImageFiles}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
        showEditButton={false}
      />
    );
    
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  test('uses custom edit button text', () => {
    render(
      <ImageGallery
        files={mockImageFiles}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
        showEditButton={true}
        editButtonText="Custom Edit"
      />
    );
    
    const editButtons = screen.getAllByText('Custom Edit');
    expect(editButtons).toHaveLength(2);
  });

  test('calls onRemove with correct index when remove button is clicked', () => {
    render(
      <ImageGallery
        files={mockImageFiles}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
      />
    );
    
    const removeButtons = screen.getAllByText('×');
    fireEvent.click(removeButtons[0]);
    
    expect(mockOnRemove).toHaveBeenCalledWith(0);
  });

  test('calls onEdit with correct file and index when edit button is clicked', () => {
    render(
      <ImageGallery
        files={mockImageFiles}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
        showEditButton={true}
      />
    );
    
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[1]);
    
    expect(mockOnEdit).toHaveBeenCalledWith(mockImageFiles[1], 1);
  });
});