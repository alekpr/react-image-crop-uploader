import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DropZone } from './DropZone';

describe('DropZone', () => {
  const mockOnFilesSelected = jest.fn();

  beforeEach(() => {
    mockOnFilesSelected.mockClear();
  });

  test('renders with default props', () => {
    render(<DropZone onFilesSelected={mockOnFilesSelected} />);
    expect(screen.getByText('Drag & drop images here or click to select')).toBeInTheDocument();
    expect(screen.getByText('Select an image')).toBeInTheDocument();
  });

  test('renders with custom placeholder', () => {
    render(<DropZone onFilesSelected={mockOnFilesSelected} placeholder="Custom placeholder" />);
    expect(screen.getByText('Custom placeholder')).toBeInTheDocument();
  });

  test('renders with multiple file selection info', () => {
    render(<DropZone onFilesSelected={mockOnFilesSelected} multiple={true} />);
    expect(screen.getByText('Select multiple images')).toBeInTheDocument();
  });

  test('applies disabled state correctly', () => {
    render(<DropZone onFilesSelected={mockOnFilesSelected} disabled={true} />);
    const dropZone = screen.getByText('Drag & drop images here or click to select').closest('.drop-zone');
    expect(dropZone).toHaveClass('disabled');
  });

  test('handles click to open file selector', () => {
    const mockClick = jest.fn();
    const clickSpy = jest.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(mockClick);
    
    render(<DropZone onFilesSelected={mockOnFilesSelected} />);
    const dropZone = screen.getByText('Drag & drop images here or click to select');
    fireEvent.click(dropZone);
    
    expect(mockClick).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  test('handles drag over event', () => {
    render(<DropZone onFilesSelected={mockOnFilesSelected} />);
    const dropZone = screen.getByText('Drag & drop images here or click to select');
    
    fireEvent.dragOver(dropZone);
    expect(dropZone.closest('.drop-zone')).toHaveClass('drag-over');
  });

  test('handles drag leave event', () => {
    render(<DropZone onFilesSelected={mockOnFilesSelected} />);
    const dropZone = screen.getByText('Drag & drop images here or click to select');
    
    fireEvent.dragOver(dropZone);
    expect(dropZone.closest('.drop-zone')).toHaveClass('drag-over');
    
    fireEvent.dragLeave(dropZone);
    expect(dropZone.closest('.drop-zone')).not.toHaveClass('drag-over');
  });

  test('handles file drop', () => {
    render(<DropZone onFilesSelected={mockOnFilesSelected} />);
    const dropZone = screen.getByText('Drag & drop images here or click to select');
    
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const dataTransfer = {
      files: [file],
      types: ['Files'],
    } as any;
    
    fireEvent.drop(dropZone, { dataTransfer });
    expect(mockOnFilesSelected).toHaveBeenCalledWith(dataTransfer.files);
  });

  test('handles file input change', () => {
    render(<DropZone onFilesSelected={mockOnFilesSelected} />);
    const input = screen.getByTestId('file-input') as HTMLInputElement;
    
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    Object.defineProperty(input, 'files', {
      value: [file],
    });
    
    fireEvent.change(input);
    expect(mockOnFilesSelected).toHaveBeenCalledWith(input.files);
  });

  test('does not handle events when disabled', () => {
    const clickSpy = jest.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(() => {});
    
    render(<DropZone onFilesSelected={mockOnFilesSelected} disabled={true} />);
    const dropZone = screen.getByText('Drag & drop images here or click to select');
    const input = screen.getByTestId('file-input') as HTMLInputElement;
    
    fireEvent.dragOver(dropZone);
    expect(dropZone.closest('.drop-zone')).not.toHaveClass('drag-over');
    
    fireEvent.click(dropZone);
    expect(clickSpy).not.toHaveBeenCalled();
    
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    Object.defineProperty(input, 'files', {
      value: [file],
    });
    
    fireEvent.change(input);
    expect(mockOnFilesSelected).not.toHaveBeenCalled();
    
    clickSpy.mockRestore();
  });
});