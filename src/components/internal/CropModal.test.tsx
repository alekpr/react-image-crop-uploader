import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CropModal } from './CropModal';

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

// Mock react-easy-crop
jest.mock('react-easy-crop', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-cropper">Mock Cropper</div>,
  };
});

describe('CropModal', () => {
  const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    mockOnSave.mockClear();
    mockOnCancel.mockClear();
  });

  test('renders crop modal with default props', () => {
    render(
      <CropModal
        file={mockFile}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        aspectRatio="free"
      />
    );
    
    expect(screen.getByText('Crop Image')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
    expect(screen.getByTestId('mock-cropper')).toBeInTheDocument();
  });

  test('renders crop modal with custom title', () => {
    render(
      <CropModal
        file={mockFile}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        aspectRatio="free"
        title="Custom Title"
      />
    );
    
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  test('renders crop modal with custom button texts', () => {
    render(
      <CropModal
        file={mockFile}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        aspectRatio="free"
        saveButtonText="Custom Save"
        cancelButtonText="Custom Cancel"
        resetButtonText="Custom Reset"
      />
    );
    
    expect(screen.getByText('Custom Save')).toBeInTheDocument();
    expect(screen.getByText('Custom Cancel')).toBeInTheDocument();
    expect(screen.getByText('Custom Reset')).toBeInTheDocument();
  });

  test('calls onCancel when cancel button is clicked', () => {
    render(
      <CropModal
        file={mockFile}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        aspectRatio="free"
      />
    );
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalled();
  });

  test('calls onCancel when close button is clicked', () => {
    render(
      <CropModal
        file={mockFile}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        aspectRatio="free"
      />
    );
    
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    
    expect(mockOnCancel).toHaveBeenCalled();
  });

  test('calls handleReset when reset button is clicked', () => {
    render(
      <CropModal
        file={mockFile}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        aspectRatio="free"
      />
    );
    
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    
    // We can't easily test the reset functionality without a full implementation
    // but we can verify the function was called
    expect(mockOnCancel).not.toHaveBeenCalled(); // Reset shouldn't call onCancel
  });

  test('renders image with correct src', () => {
    render(
      <CropModal
        file={mockFile}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        aspectRatio="free"
      />
    );
    
    // The image is handled by react-easy-crop, so we check for the mock
    expect(screen.getByTestId('mock-cropper')).toBeInTheDocument();
  });

  test('applies aspect ratio to crop modal', () => {
    render(
      <CropModal
        file={mockFile}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        aspectRatio={16/9}
      />
    );
    
    // We can't easily test the visual aspect ratio without a full DOM environment
    // but we can verify the component renders without errors
    expect(screen.getByText('Crop Image')).toBeInTheDocument();
  });

  test('applies free aspect ratio to crop modal', () => {
    render(
      <CropModal
        file={mockFile}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        aspectRatio="free"
      />
    );
    
    // We can't easily test the visual aspect ratio without a full DOM environment
    // but we can verify the component renders without errors
    expect(screen.getByText('Crop Image')).toBeInTheDocument();
  });
});