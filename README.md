# React Image Crop Uploader

[![npm version](https://badge.fury.io/js/@alekpr%2Freact-image-crop-uploader.svg)](https://www.npmjs.com/package/@alekpr/react-image-crop-uploader)
[![npm downloads](https://img.shields.io/npm/dm/@alekpr/react-image-crop-uploader.svg)](https://www.npmjs.com/package/@alekpr/react-image-crop-uploader)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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
npm install @alekpr/react-image-crop-uploader
```

or

```bash
yarn add @alekpr/react-image-crop-uploader
```

## Quick Start

```tsx
import { ImageUploader } from '@alekpr/react-image-crop-uploader';
import '@alekpr/react-image-crop-uploader/style.css';

function App() {
  return (
    <ImageUploader
      onFilesChange={(files) => console.log(files)}
      cropEnabled={true}
      maxFiles={5}
    />
  );
}
```

## Usage

### Basic Usage

```tsx
import { ImageUploader } from '@alekpr/react-image-crop-uploader';
import '@alekpr/react-image-crop-uploader/style.css';

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
import { ImageUploader } from '@alekpr/react-image-crop-uploader';
import '@alekpr/react-image-crop-uploader/style.css';

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

### Upload Button Features

The component automatically shows an upload button when files are present. You can customize the upload button behavior:

```tsx
import { ImageUploader } from '@alekpr/react-image-crop-uploader';
import '@alekpr/react-image-crop-uploader/style.css';

function App() {
  return (
    <ImageUploader
      uploadUrl="/api/images/upload"
      enableCrop={true}
      // Upload button configuration
      showUploadButton={true}           // Show/hide upload button (default: true)
      uploadButtonText="Send Files"     // Custom button text (default: "Upload")
      uploadButtonClassName="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
      onUploadComplete={(response) => console.log('Upload completed:', response)}
    />
  );
}
```

**Upload Button Features:**
- ✅ **Auto-display**: Shows automatically when files are present and `uploadUrl` is provided
- ✅ **File count**: Displays file count for multiple files (e.g., "Upload (3 files)")
- ✅ **Customizable**: Support custom text and CSS styling
- ✅ **Smart disable**: Automatically disabled when no files are present
- ✅ **Hide option**: Can be hidden with `showUploadButton={false}` for manual upload handling

### Direct Upload Mode

```tsx
import { ImageUploader } from '@alekpr/react-image-crop-uploader';
import '@alekpr/react-image-crop-uploader/style.css';

function App() {
  const handleUploadComplete = (response: any) => {
    console.log('Upload response:', response);
  };

  const handleError = (error: string) => {
    console.error('Upload error:', error);
  };

  const handleUploadProgress = (progress: number) => {
    console.log(`Upload progress: ${progress}%`);
  };

  return (
    <ImageUploader
      uploadUrl="/api/images/upload"
      maxFileSize={10}
      enableCrop={true}
      uploadFieldName="image"
      multipleFileStrategy="single-request"
      uploadButtonText="Upload Image"
      showUploadButton={true}
      onUploadComplete={handleUploadComplete}
      onError={handleError}
      onUploadProgress={handleUploadProgress}
    />
  );
}
```

### Multiple File Upload Strategies

```tsx
import { ImageUploader } from '@alekpr/react-image-crop-uploader';
import '@alekpr/react-image-crop-uploader/style.css';

// Strategy 1: Send all files in a single request
function SingleRequestUpload() {
  return (
    <ImageUploader
      uploadUrl="/api/images/upload-multiple"
      maxFiles={5}
      multipleFileStrategy="single-request"
      uploadFieldName="images"
      onUploadComplete={(response) => console.log('All files uploaded:', response)}
    />
  );
}

// Strategy 2: Send each file in separate requests
function MultipleRequestsUpload() {
  return (
    <ImageUploader
      uploadUrl="/api/images/upload"
      maxFiles={5}
      multipleFileStrategy="multiple-requests"
      uploadFieldName="image"
      onUploadComplete={(responses) => console.log('Upload responses:', responses)}
    />
  );
}
```
```

### Edit Mode

```tsx
import { ImageUploader } from '@alekpr/react-image-crop-uploader';
import '@alekpr/react-image-crop-uploader/style.css';

function App() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleUploadComplete = (response: any) => {
    // Add new uploaded images to the collection
    const newImageUrls = response.imageUrls; // Assume response contains URLs
    setUploadedImages(prev => [...prev, ...newImageUrls]);
    // Component will automatically clear its upload state when initialImages updates
  };

  const handleFilesChange = (files: File[]) => {
    console.log('Updated files:', files);
  };

  return (
    <ImageUploader
      editMode={true}
      initialImages={uploadedImages} // Updates trigger state clearing
      uploadUrl="/api/images/upload"
      enableCrop={true}
      maxFiles={5} // Can add more images even in edit mode
      showEditButton={true}
      onFilesChange={handleFilesChange}
      onUploadComplete={handleUploadComplete}
    />
  );
}
```

**Enhanced Edit Mode Features:**
- ✅ **Add Images**: Can add new images even when in edit mode
- ✅ **State Clearing**: Automatically clears upload state when `initialImages` updates
- ✅ **Full Editing**: Crop, remove, and add images in the same interface
- ✅ **Upload Integration**: Upload new images and see them added to the collection
- ✅ **Dynamic Drop Zone**: Shows/hides drop zone based on file count vs maxFiles

## Props

### Upload Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `uploadUrl` | `string` | `undefined` | URL to upload files to |
| `maxFileSize` | `number` | `5` | Maximum file size in MB |
| `maxFiles` | `number` | `1` | Maximum number of files |
| `acceptedTypes` | `string[]` | `['image/jpeg', 'image/png', 'image/webp']` | Accepted file types |
| `uploadFieldName` | `string` | `'image'` | FormData field name for uploaded files |
| `multipleFileStrategy` | `'single-request' \| 'multiple-requests'` | `'single-request'` | How to handle multiple file uploads |

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
| `onUploadProgress` | `(progress: number) => void` | Called with upload progress (0-100) |

### UI Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `'Drag & drop images here or click to select'` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable the component |
| `className` | `string` | `''` | Custom CSS class |
| `showEditButton` | `boolean` | `true` | Show edit button on previews |
| `editButtonText` | `string` | `'Edit'` | Text for edit button |
| `showUploadButton` | `boolean` | `true` | Show upload button when files are present and uploadUrl is provided |
| `uploadButtonText` | `string` | `'Upload'` | Text for upload button. Shows file count for multiple files |
| `uploadButtonClassName` | `string` | `''` | Custom CSS class for upload button. Falls back to default styling if empty |
| `uploadButtonText` | `string` | `'Upload'` | Text for upload button |
| `uploadButtonClassName` | `string` | `''` | Custom CSS class for upload button |

### Modal Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cropModalProps` | `object` | `{}` | Configuration for crop modal |
| `cropModalProps.title` | `string` | `'Crop Image'` | Modal title |
| `cropModalProps.saveButtonText` | `string` | `'Save'` | Save button text |
| `cropModalProps.cancelButtonText` | `string` | `'Cancel'` | Cancel button text |
| `cropModalProps.resetButtonText` | `string` | `'Reset'` | Reset button text |

## Upload Button Behavior

The upload button is intelligently managed by the component:

### When Upload Button Shows
- ✅ Files are present (`files.length > 0`)
- ✅ Upload URL is provided (`uploadUrl` prop)
- ✅ Upload button is not hidden (`showUploadButton={true}`)

### Upload Button Features
- **File Count Display**: For multiple files, shows count (e.g., "Upload (3 files)")
- **Auto Disable**: Automatically disabled when no files are present
- **Custom Styling**: Use `uploadButtonClassName` for custom CSS classes
- **Fallback Styling**: Uses default blue styling when `uploadButtonClassName` is empty
- **Manual Control**: Set `showUploadButton={false}` to handle uploads programmatically

### Upload Button Examples

```tsx
// Default upload button
<ImageUploader uploadUrl="/api/upload" />

// Custom text
<ImageUploader 
  uploadUrl="/api/upload" 
  uploadButtonText="Send to Server" 
/>

// Custom styling
<ImageUploader 
  uploadUrl="/api/upload" 
  uploadButtonClassName="btn btn-primary" 
/>

// Hidden upload button (manual upload)
<ImageUploader 
  uploadUrl="/api/upload" 
  showUploadButton={false}
  onFilesChange={(files) => {
    // Handle upload manually
    if (files.length > 0) {
      // Your custom upload logic
    }
  }}
/>
```

## Styling

The component comes with default styling. You can customize the appearance by importing the CSS file and overriding styles:

```tsx
import '@alekpr/react-image-crop-uploader/style.css';
```

Or import the CSS in your own stylesheet:

```css
@import '@alekpr/react-image-crop-uploader/style.css';
```

You can also import the CSS file directly from the dist folder:

```tsx
import '@alekpr/react-image-crop-uploader/dist/react-image-crop-uploader.css';
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

MIT © [alekpr](https://github.com/alekpr)

## Support

If you encounter any issues or have questions, please [file an issue](https://github.com/alekpr/react-image-crop-uploader/issues) on GitHub.