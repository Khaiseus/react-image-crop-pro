/**
 * Constants and default values for ImageCropUpload component
 */

import { AspectRatioPreset, ImageCropState, Labels } from './types';

/**
 * Default labels for internationalization
 */
export const DEFAULT_LABELS: Labels = {
  dropzone: {
    idle: 'Drag and drop an image here, or click to select',
    active: 'Drop the image here',
    reject: 'File type not supported',
  },
  buttons: {
    cancel: 'Cancel',
    crop: 'Crop Image',
    retry: 'Choose Another Image',
  },
  errors: {
    fileTooLarge: 'File size exceeds maximum allowed size',
    invalidFileType: 'File type not supported',
    fileReadError: 'Failed to read file',
    cropError: 'Failed to crop image',
    canvasError: 'Canvas rendering error',
  },
  controls: {
    zoom: 'Zoom',
    rotation: 'Rotation',
    aspectRatio: 'Aspect Ratio',
  },
};

/**
 * Default aspect ratio presets
 */
export const DEFAULT_ASPECT_RATIO_PRESETS: AspectRatioPreset[] = [
  { label: 'Free', value: 'free' },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
];

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG = {
  // Upload constraints
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],

  // Zoom settings
  minZoom: 1,
  maxZoom: 3,
  initialZoom: 1,

  // Rotation
  enableRotation: true,
  rotationStep: 90,

  // Touch gestures
  enablePinchZoom: true,
  enableTouchRotation: true,

  // Crop settings
  aspectRatio: 1,
  circularCrop: false,
  showGrid: true,
  restrictPosition: true,
  objectFit: 'contain' as const,

  // Output settings
  outputFormat: 'base64' as const,
  outputQuality: 0.95,
  outputType: 'image/jpeg' as const,

  // UI customization
  showPreview: true,
  previewSize: 150,
} as const;

/**
 * Initial state for the reducer
 */
export const INITIAL_STATE: ImageCropState = {
  uploadState: 'idle',
  selectedFile: null,
  imageSrc: null,
  crop: { x: 0, y: 0 },
  zoom: DEFAULT_CONFIG.initialZoom,
  rotation: 0,
  aspectRatio: DEFAULT_CONFIG.aspectRatio,
  croppedAreaPixels: null,
  error: null,
};

/**
 * Accepted file types for validation
 */
export const ACCEPTED_FILE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'image/gif': ['.gif'],
} as const;
