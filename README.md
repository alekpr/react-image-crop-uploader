# React Image Crop Uploader

[![npm version](https://badge.fury.io/js/@alekpr%2Freact-image-crop-uploader.svg)](https://www.npmjs.com/package/@alekpr/react-image-crop-uploader)
[![npm downloads](https://img.shields.io/npm/dm/@alekpr/react-image-crop-uploader.svg)](https://www.npmjs.com/package/@alekpr/react-image-crop-uploader)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/🚀-Live%20Demo-blue.svg)](https://github.com/alekpr/react-image-upload-library-sample)

A comprehensive React image upload component with modal-based cropping capabilities. This library provides an all-in-one solution for handling image uploads with cropping functionality in your React applications.

## 📚 Live Demo & Examples

🚀 **[View Live Demo](https://github.com/alekpr/react-image-upload-library-sample)** - Complete sample project with multiple examples

The sample repository includes:
- Basic upload functionality
- Cropping with different aspect ratios
- Initial images handling
- Direct upload integration
- Edit mode examples
- TypeScript usage examples

## Features

- 📁 **Multi-file Support**: Upload single or multiple images
- 📏 **Image Cropping**: Modal-based cropping with real-time preview using [react-easy-crop](https://github.com/ricardo-ch/react-easy-crop)
- 🎯 **Configurable Crop**: Custom aspect ratios and dimensions
- 📤 **Upload Modes**: Direct upload or form integration with selective upload support
- 🖼️ **Image Preview**: Thumbnail previews with edit functionality
- ✂️ **Re-cropping**: Edit existing images after upload
- 🔄 **Selective Upload**: Smart upload that distinguishes between initial images and new files
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

### Clone Sample Project

To quickly get started with a working example:

```bash
git clone https://github.com/alekpr/react-image-upload-library-sample.git
cd react-image-upload-library-sample
npm install
npm start
```

## Quick Start

> **💡 Tip**: Check out the [complete sample project](https://github.com/alekpr/react-image-upload-library-sample) for more examples and usage patterns!

```tsx
import { ImageUploader } from '@alekpr/react-image-crop-uploader';
import '@alekpr/react-image-crop-uploader/style.css';

function App() {
  const handleUploadComplete = ({ unuploadedFiles, uploadResponse }) => {
    console.log('New files uploaded:', unuploadedFiles);
    console.log('Server response:', uploadResponse);
  };

  return (
    <ImageUploader
      uploadUrl="/api/upload"
      onUploadComplete={handleUploadComplete}
      enableCrop={true}
      maxFiles={5}
      initialImages={["existing-image.jpg"]} // Won't be re-uploaded
    />
  );
}
```

## Usage

### Getting Started

For complete examples and advanced usage patterns, visit our **[Sample Project Repository](https://github.com/alekpr/react-image-upload-library-sample)**.

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

### Direct Upload Mode with Selective Upload

```tsx
import { ImageUploader } from '@alekpr/react-image-crop-uploader';
import '@alekpr/react-image-crop-uploader/style.css';

function App() {
  const handleUploadComplete = ({ unuploadedFiles, uploadResponse }) => {
    console.log('Files that were uploaded:', unuploadedFiles);
    console.log('Server response:', uploadResponse);
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
      uploadButtonText="Upload New Images"
      showUploadButton={true}
      initialImages={["existing-image1.jpg", "existing-image2.jpg"]}
      onUploadComplete={handleUploadComplete}
      onError={handleError}
      onUploadProgress={handleUploadProgress}
    />
  );
}
```

**Selective Upload Features:**
- ✅ **Smart Upload**: Only uploads new files, skips initial images
- ✅ **Enhanced Callback**: Provides both uploaded files and server response
- ✅ **Initial Image Support**: Display existing images without re-uploading
- ✅ **Mixed Content**: Handle both initial images and new uploads in one component
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

### Enhanced Edit Mode with Selective Upload

```tsx
import { ImageUploader } from '@alekpr/react-image-crop-uploader';
import '@alekpr/react-image-crop-uploader/style.css';

function App() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ]);

  const handleUploadComplete = ({ unuploadedFiles, uploadResponse }) => {
    console.log('New files uploaded:', unuploadedFiles);
    console.log('Server response:', uploadResponse);
    
    // Add new uploaded image URLs to the collection
    if (uploadResponse?.imageUrls) {
      setUploadedImages(prev => [...prev, ...uploadResponse.imageUrls]);
    }
  };

  const handleFilesChange = (files: File[]) => {
    console.log('Current files in component:', files);
  };

  return (
    <ImageUploader
      editMode={true}
      initialImages={uploadedImages} // Existing images won't be re-uploaded
      uploadUrl="/api/images/upload"
      enableCrop={true}
      maxFiles={10}
      showEditButton={true}
      uploadButtonText="Upload New Images"
      onFilesChange={handleFilesChange}
      onUploadComplete={handleUploadComplete}
    />
  );
}
```

**Enhanced Edit Mode Features:**
- ✅ **Selective Upload**: Only uploads new files, preserves initial images
- ✅ **Mixed Content**: Display existing images alongside new uploads
- ✅ **Enhanced Callback**: Get both uploaded files and server response details
- ✅ **Smart State Management**: Automatically handles initial vs new file distinction
- ✅ **Full Editing**: Crop, remove, and add images in the same interface

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
| `onUploadComplete` | `(result: { unuploadedFiles: File[]; uploadResponse: any }) => void` | Called when upload completes with enhanced data |
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

```

## Selective Upload Features

The library provides intelligent upload handling that distinguishes between initial images and newly added files:

### How Selective Upload Works

```tsx
import { ImageUploader } from '@alekpr/react-image-crop-uploader';

function App() {
  const existingImages = [
    "https://example.com/existing1.jpg",
    "https://example.com/existing2.jpg"
  ];

  const handleUploadComplete = ({ unuploadedFiles, uploadResponse }) => {
    // unuploadedFiles: Only the new files that were actually uploaded
    // uploadResponse: Server response from the upload request
    console.log('New files uploaded:', unuploadedFiles.length);
    console.log('Server response:', uploadResponse);
  };

  return (
    <ImageUploader
      initialImages={existingImages}  // These won't be uploaded again
      uploadUrl="/api/upload"
      onUploadComplete={handleUploadComplete}
    />
  );
}
```

### Initial Images vs New Files

| Initial Images | New Files |
|---|---|
| ✅ Displayed in gallery | ✅ Displayed in gallery |
| ✅ Can be cropped/edited | ✅ Can be cropped/edited |
| ✅ Can be removed | ✅ Can be removed |
| ❌ **Not uploaded again** | ✅ **Uploaded to server** |
| 🏷️ Marked as `isUploaded: true` | 🏷️ Marked as `isUploaded: false` |

### Enhanced Upload Callback

The `onUploadComplete` callback now provides more detailed information:

```tsx
onUploadComplete={({ unuploadedFiles, uploadResponse }) => {
  // unuploadedFiles: Array of File objects that were just uploaded
  // uploadResponse: The actual server response
  
  console.log(`${unuploadedFiles.length} new files uploaded`);
  console.log('Server response:', uploadResponse);
  
  // Handle the response based on your API structure
  if (uploadResponse.success) {
    // Update your state with new image URLs
    setImages(prev => [...prev, ...uploadResponse.imageUrls]);
  }
}}
```

### Use Cases

**1. Profile Picture with History**
```tsx
// Show current profile picture + allow new uploads
<ImageUploader
  initialImages={[user.profilePicture]}
  maxFiles={1}
  uploadUrl="/api/profile/upload"
  onUploadComplete={({ uploadResponse }) => {
    // Only new profile picture is uploaded
    updateUserProfile(uploadResponse.imageUrl);
  }}
/>
```

**2. Product Gallery Management**
```tsx
// Edit product images + add new ones
<ImageUploader
  initialImages={product.imageUrls}
  maxFiles={10}
  uploadUrl="/api/products/images"
  onUploadComplete={({ unuploadedFiles, uploadResponse }) => {
    // Only new images are uploaded to server
    const newImageUrls = uploadResponse.imageUrls;
    updateProduct({ 
      imageUrls: [...product.imageUrls, ...newImageUrls] 
    });
  }}
/>
```

**3. Document Attachment System**
```tsx
// Show existing attachments + upload new ones
<ImageUploader
  initialImages={document.attachments}
  uploadUrl="/api/documents/attach"
  onUploadComplete={({ unuploadedFiles, uploadResponse }) => {
    // Track only newly uploaded files
    console.log(`Added ${unuploadedFiles.length} new attachments`);
    refreshDocumentData();
  }}
/>
```

## Upload Button Behavior

The upload button is intelligently managed by the component:

### When Upload Button Shows
- ✅ Files are present (`files.length > 0`)
- ✅ Upload URL is provided (`uploadUrl` prop)
- ✅ Upload button is not hidden (`showUploadButton={true}`)

### Upload Button Features
- **Smart File Count**: Shows total files in gallery (e.g., "Upload (5 files)")
  - Includes both initial images and new files in the count
  - Helps users understand how many files are in the current session
- **Selective Upload**: Only uploads new files, regardless of total count shown
- **Auto Disable**: Automatically disabled when no files are present
- **Custom Styling**: Use `uploadButtonClassName` for custom CSS classes
- **Fallback Styling**: Uses default blue styling when `uploadButtonClassName` is empty
- **Manual Control**: Set `showUploadButton={false}` to handle uploads programmatically

### Upload Button Examples

```tsx
// Basic upload with file count (shows total files including initial)
<ImageUploader 
  uploadUrl="/api/upload"
  initialImages={["existing1.jpg", "existing2.jpg"]}
  // Button shows "Upload (4 files)" when 2 new files are added
  // But only uploads the 2 new files
/>

// Custom text with selective upload
<ImageUploader 
  uploadUrl="/api/upload"
  uploadButtonText="Upload New Images"
  initialImages={existingImageUrls}
  onUploadComplete={({ unuploadedFiles, uploadResponse }) => {
    console.log(`Uploaded ${unuploadedFiles.length} new images`);
  }}
/>

// Custom styling with smart upload
<ImageUploader 
  uploadUrl="/api/upload"
  uploadButtonClassName="custom-upload-btn"
  initialImages={currentImages}
  // Only new files are uploaded, existing ones are preserved
  // Default styling uses modern CSS classes with animations
/>

// Hidden upload button (manual upload with selective logic)
<ImageUploader 
  uploadUrl="/api/upload"
  showUploadButton={false}
  initialImages={existingImages}
  onFilesChange={(files) => {
    // files contains both initial images and new files
    // But you can trigger upload manually and only new files will be sent
  }}
/>
```

## Styling

The component comes with modern, built-in styling including:

### Built-in CSS Classes

- ✅ **Modern Upload Button**: `.upload-button` with hover effects and animations
- ✅ **Responsive Design**: Mobile-friendly button sizing
- ✅ **Accessibility**: Focus states and proper contrast ratios
- ✅ **Loading States**: Disabled state styling
- ✅ **File Count Display**: Stylized file count badges

### CSS Import

Import the CSS file to use the built-in styling:

```tsx
import '@alekpr/react-image-crop-uploader/style.css';
```

Or import the CSS in your own stylesheet:

```css
@import '@alekpr/react-image-crop-uploader/style.css';
```

### Custom Styling

You can override the default upload button styling:

```tsx
// Use your own CSS class
<ImageUploader 
  uploadUrl="/api/upload"
  uploadButtonClassName="my-custom-button"
/>
```

```css
/* Your custom button styles */
.my-custom-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
}

.my-custom-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}
```

### Default Button Classes

The built-in upload button uses these CSS classes:

- `.upload-button-container` - Container wrapper
- `.upload-button` - Main button styling
- `.upload-button-text` - Button text styling  
- `.upload-file-count` - File count badge styling

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

## 🔗 Resources

- **[📚 Sample Project](https://github.com/alekpr/react-image-upload-library-sample)** - Complete examples and usage patterns
- **[📦 NPM Package](https://www.npmjs.com/package/@alekpr/react-image-crop-uploader)** - Install from npm
- **[🐛 Issue Tracker](https://github.com/alekpr/react-image-crop-uploader/issues)** - Report bugs or request features
- **[📖 Documentation](https://github.com/alekpr/react-image-crop-uploader#readme)** - Full API documentation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

MIT © [alekpr](https://github.com/alekpr)

## Support

### Getting Help

- **[📚 Sample Project](https://github.com/alekpr/react-image-upload-library-sample)** - Browse working examples
- **[🐛 GitHub Issues](https://github.com/alekpr/react-image-crop-uploader/issues)** - Report bugs or request features
- **[📖 API Documentation](#props)** - Complete props and callback reference

### Common Issues

Before opening an issue, please check the [sample project](https://github.com/alekpr/react-image-upload-library-sample) to see if your use case is covered.

If you encounter any issues or have questions, please [file an issue](https://github.com/alekpr/react-image-crop-uploader/issues) on GitHub with:
1. Steps to reproduce
2. Expected behavior
3. Code example (preferably a minimal reproduction)