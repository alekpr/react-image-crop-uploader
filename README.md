# React Image Crop Uploader

A comprehensive React image upload component with modal-based cropping capabilities. This library provides an all-in-one solution for handling image uploads with cropping functionality in your React applications.

## Features

- 📁 **Multi-file Support**: Upload single or multiple images
- 📏 **Image Cropping**: Modal-based cropping with real-time preview using [react-easy-crop](https://github.com/ricardo-ch/react-easy-crop)
- 🎯 **Configurable Crop**: Custom aspect ratios and dimensions
- 📤 **Upload Modes**: Direct upload or form integration
- 🖼️ **Image Preview**: Thumbnail previews with edit functionality
- ✂️ **Re-cropping**: Edit existing images after upload
- 🎨 **Customizable UI**: Fully styled with standard CSS
- 📱 **Responsive**: Mobile-friendly design
- 🔧 **TypeScript**: Full TypeScript support with type definitions
- 🧪 **Tested**: Comprehensive test suite

## Installation

```bash
npm install react-image-crop-uploader
```

or

```bash
yarn add react-image-crop-uploader
```

## Usage

### Basic Usage

```tsx
import { ImageUploader } from 'react-image-crop-uploader';
import 'react-image-crop-uploader/dist/style.css';

function App() {
  const handleFilesChange = (files: File[]) => {
    console.log('Selected files:', files);
  };

  return (
    <ImageUploader
      maxFileSize={5}
      maxFiles={3}
      onFilesChange={handleFilesChange}
    />
  );
}
```

### With Cropping Enabled

```tsx
import { ImageUploader } from 'react-image-crop-uploader';
import 'react-image-crop-uploader/dist/style.css';

function App() {
  const handleFilesChange = (files: File[]) => {
    console.log('Selected files:', files);
  };

  const handleCropComplete = (croppedFile: File, originalFile: File) => {
    console.log('Cropped file:', croppedFile);
  };

  return (
    <ImageUploader
      maxFileSize={10}
      maxFiles={5}
      enableCrop={true}
      cropAspectRatio={16/9}
      onFilesChange={handleFilesChange}
      onCropComplete={handleCropComplete}
    />
  );
}
```

### Direct Upload Mode

```tsx
import { ImageUploader } from 'react-image-crop-uploader';
import 'react-image-crop-uploader/dist/style.css';

function App() {
  const handleUploadComplete = (response: any) => {
    console.log('Upload response:', response);
  };

  const handleError = (error: string) => {
    console.error('Upload error:', error);
  };

  return (
    <ImageUploader
      uploadUrl="/api/upload"
      maxFileSize={10}
      enableCrop={true}
      onUploadComplete={handleUploadComplete}
      onError={handleError}
    />
  );
}
```

### Edit Mode

```tsx
import { ImageUploader } from 'react-image-crop-uploader';
import 'react-image-crop-uploader/dist/style.css';

function App() {
  const initialImages = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg'
  ];

  const handleFilesChange = (files: File[]) => {
    console.log('Updated files:', files);
  };

  return (
    <ImageUploader
      editMode={true}
      initialImages={initialImages}
      enableCrop={true}
      showEditButton={true}
      onFilesChange={handleFilesChange}
    />
  );
}
```

## Props

### Upload Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `uploadUrl` | `string` | `undefined` | URL to upload files to |
| `maxFileSize` | `number` | `5` | Maximum file size in MB |
| `maxFiles` | `number` | `1` | Maximum number of files |
| `acceptedTypes` | `string[]` | `['image/jpeg', 'image/png', 'image/webp']` | Accepted file types |

### Crop Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cropAspectRatio` | `number | 'free'` | `'free'` | Aspect ratio for cropping |
| `cropSize` | `{ width: number; height: number }` | `undefined` | Fixed crop size |
| `enableCrop` | `boolean` | `false` | Enable cropping functionality |
| `cropModalTitle` | `string` | `'Crop Image'` | Title for crop modal |

### Initial State

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialImages` | `string[] | File[]` | `[]` | Initial images to display |
| `editMode` | `boolean` | `false` | Enable edit mode |

### Callbacks

| Prop | Type | Description |
|------|------|-------------|
| `onUploadComplete` | `(response: any) => void` | Called when upload completes |
| `onFilesChange` | `(files: File[]) => void` | Called when files change |
| `onError` | `(error: string) => void` | Called when errors occur |
| `onCropComplete` | `(croppedFile: File, originalFile: File, index?: number) => void` | Called when cropping completes |
| `onCropModalOpen` | `(file: File, index?: number) => void` | Called when crop modal opens |
| `onCropModalClose` | `() => void` | Called when crop modal closes |

### UI Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `'Drag & drop images here or click to select'` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable the component |
| `className` | `string` | `''` | Custom CSS class |
| `showEditButton` | `boolean` | `true` | Show edit button on previews |
| `editButtonText` | `string` | `'Edit'` | Text for edit button |

### Modal Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cropModalProps` | `object` | `{}` | Configuration for crop modal |
| `cropModalProps.title` | `string` | `'Crop Image'` | Modal title |
| `cropModalProps.saveButtonText` | `string` | `'Save'` | Save button text |
| `cropModalProps.cancelButtonText` | `string` | `'Cancel'` | Cancel button text |
| `cropModalProps.resetButtonText` | `string` | `'Reset'` | Reset button text |

## Styling

The component comes with default styling. You can customize the appearance by importing the CSS file and overriding styles:

```tsx
import 'react-image-crop-uploader/dist/style.css';
```

Or import the CSS in your own stylesheet:

```css
@import 'react-image-crop-uploader/dist/style.css';
```

## TypeScript Support

This library is written in TypeScript and provides full type definitions. All props and callbacks are properly typed.

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Dependencies

This library uses [react-easy-crop](https://github.com/ricardo-ch/react-easy-crop) for the cropping functionality, which provides a robust and feature-rich cropping experience.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

MIT © [Your Name]

## Support

If you encounter any issues or have questions, please [file an issue](https://github.com/alekpr/react-image-crop-uploader/issues) on GitHub.