import { ReactNode } from 'react';
import { ThemeProp } from './theme';

/**
 * Upload state machine states
 */
export type UploadState =
  | 'idle' // No file selected
  | 'uploading' // File being read
  | 'cropping' // User is cropping
  | 'processing' // Generating output
  | 'complete' // Crop complete
  | 'error'; // Error occurred

/**
 * Aspect ratio presets
 */
export interface AspectRatioPreset {
  label: string;
  value: number | 'free';
  icon?: ReactNode;
}

/**
 * Crop area data from react-easy-crop
 */
export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Pixel crop data
 */
export interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Result returned to consumer
 */
export interface CropResult {
  base64?: string;
  blob?: Blob;
  file?: File;
  width: number;
  height: number;
}

/**
 * Error types for better error handling
 */
export type ImageCropError =
  | { type: 'FILE_TOO_LARGE'; maxSize: number }
  | { type: 'INVALID_FILE_TYPE'; allowedTypes: string[] }
  | { type: 'FILE_READ_ERROR'; message: string }
  | { type: 'CROP_ERROR'; message: string }
  | { type: 'CANVAS_ERROR'; message: string };

/**
 * Label configuration interface
 */
export interface Labels {
  dropzone: {
    idle: string;
    active: string;
    reject: string;
  };
  buttons: {
    cancel: string;
    crop: string;
    retry: string;
  };
  errors: {
    fileTooLarge: string;
    invalidFileType: string;
    fileReadError: string;
    cropError: string;
    canvasError: string;
  };
  controls: {
    zoom: string;
    rotation: string;
    aspectRatio: string;
  };
}

/**
 * Main component props
 */
export interface ImageCropUploadProps {
  // Callbacks
  onCropComplete: (result: CropResult) => void;
  onError?: (error: ImageCropError) => void;
  onChange?: (state: UploadState) => void;

  // Crop settings
  aspectRatio?: number;
  aspectRatioPresets?: AspectRatioPreset[];
  circularCrop?: boolean;
  showGrid?: boolean;

  // Upload constraints
  maxFileSize?: number; // in bytes
  allowedFormats?: string[]; // MIME types

  // Zoom settings
  minZoom?: number;
  maxZoom?: number;
  initialZoom?: number;

  // Rotation
  enableRotation?: boolean;
  rotationStep?: number; // degrees

  // Touch gestures
  enablePinchZoom?: boolean;
  enableTouchRotation?: boolean;

  // Output settings
  outputFormat?: 'base64' | 'blob' | 'file' | 'all';
  outputQuality?: number; // 0-1
  outputType?: 'image/png' | 'image/jpeg' | 'image/webp';
  outputMaxWidth?: number;
  outputMaxHeight?: number;

  // UI customization
  className?: string;
  cropAreaClassName?: string;
  previewClassName?: string;
  showPreview?: boolean;
  previewSize?: number;

  // Labels and text
  labels?: Partial<Labels>;

  // Theming
  theme?: ThemeProp;

  // Advanced
  restrictPosition?: boolean;
  objectFit?: 'contain' | 'cover' | 'horizontal-cover' | 'vertical-cover';
  initialCroppedAreaPixels?: PixelCrop;
}

/**
 * Internal component state
 */
export interface ImageCropState {
  uploadState: UploadState;
  selectedFile: File | null;
  imageSrc: string | null;
  crop: { x: number; y: number };
  zoom: number;
  rotation: number;
  aspectRatio: number;
  croppedAreaPixels: PixelCrop | null;
  error: ImageCropError | null;
}

/**
 * State actions for reducer
 */
export type ImageCropAction =
  | { type: 'FILE_SELECTED'; payload: File }
  | { type: 'IMAGE_LOADED'; payload: string }
  | { type: 'CROP_CHANGED'; payload: { x: number; y: number } }
  | { type: 'ZOOM_CHANGED'; payload: number }
  | { type: 'ROTATION_CHANGED'; payload: number }
  | { type: 'ASPECT_RATIO_CHANGED'; payload: number }
  | { type: 'CROP_COMPLETE'; payload: PixelCrop }
  | { type: 'PROCESSING_START' }
  | { type: 'PROCESSING_COMPLETE'; payload: CropResult }
  | { type: 'ERROR_OCCURRED'; payload: ImageCropError }
  | { type: 'RESET' };
