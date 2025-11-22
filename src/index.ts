/**
 * React Image Crop Upload - A powerful, accessible image cropping component
 *
 * @packageDocumentation
 * @module react-image-crop-upload
 *
 * @example
 * Basic usage:
 * ```tsx
 * import { ImageCropUpload } from 'react-image-crop-upload';
 * import 'react-image-crop-upload/dist/react-image-crop-upload.css';
 *
 * function App() {
 *   const handleCropComplete = (result) => {
 *     console.log('Cropped image:', result.base64);
 *   };
 *
 *   return <ImageCropUpload onCropComplete={handleCropComplete} />;
 * }
 * ```
 *
 * @example
 * Avatar upload with circular crop:
 * ```tsx
 * <ImageCropUpload
 *   onCropComplete={handleCropComplete}
 *   aspectRatio={1}
 *   circularCrop
 *   maxFileSize={5 * 1024 * 1024}
 * />
 * ```
 *
 * @see {@link ImageCropUploadProps} for all available props
 */

// Main Component
export { ImageCropUpload } from './components/ImageCropUpload';

// TypeScript Types
export type {
  ImageCropUploadProps,
  UploadState,
  CropResult,
  ImageCropError,
  AspectRatioPreset,
  PixelCrop,
  CropArea,
  Labels,
} from './components/ImageCropUpload/types';

// Constants
export {
  DEFAULT_LABELS,
  DEFAULT_ASPECT_RATIO_PRESETS,
  DEFAULT_CONFIG,
} from './components/ImageCropUpload/constants';

// Utility Functions (exported for advanced usage)
export {
  validateFile,
  validateFileSize,
  validateFileType,
  readFileAsDataURL,
  formatFileSize,
  isImageFile,
  dataURLtoBlob,
  dataURLtoFile,
} from './components/ImageCropUpload/utils/fileUtils';

export {
  createCroppedImage,
  createCircularCrop,
} from './components/ImageCropUpload/utils/cropImage';

// Theme types and utilities
export type { ThemeName } from './components/ImageCropUpload/theme';
