import '@testing-library/jest-dom';

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

// Mock FileReader
class MockFileReader {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  result: string | ArrayBuffer | null = null;

  readAsDataURL() {
    this.result = 'data:image/png;base64,mock';
    if (this.onload) {
      this.onload();
    }
  }

  readAsArrayBuffer() {
    this.result = new ArrayBuffer(100);
    if (this.onload) {
      this.onload();
    }
  }
}

global.FileReader = MockFileReader as any;

// Mock Image
class MockImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  src = '';

  constructor() {
    setTimeout(() => {
      if (this.onload) {
        this.onload();
      }
    }, 0);
  }
}

global.Image = MockImage as any;

// Mock Canvas
class MockCanvas {
  width = 0;
  height = 0;

  getContext() {
    return {
      drawImage: jest.fn(),
      getImageData: jest.fn(),
      putImageData: jest.fn(),
      fillRect: jest.fn(),
      beginPath: jest.fn(),
      closePath: jest.fn(),
      fill: jest.fn(),
      arc: jest.fn(),
      globalCompositeOperation: '',
    };
  }

  toBlob(callback: (blob: Blob | null) => void) {
    callback(new Blob());
  }

  toDataURL() {
    return 'data:image/png;base64,mock';
  }
}

global.HTMLCanvasElement = MockCanvas as any;