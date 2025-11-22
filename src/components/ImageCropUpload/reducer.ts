import { ImageCropAction, ImageCropState } from './types';
import { INITIAL_STATE } from './constants';

export function imageCropReducer(
  state: ImageCropState,
  action: ImageCropAction
): ImageCropState {
  switch (action.type) {
    case 'FILE_SELECTED':
      return {
        ...state,
        uploadState: 'uploading',
        selectedFile: action.payload,
        error: null,
      };

    case 'IMAGE_LOADED':
      return {
        ...state,
        uploadState: 'cropping',
        imageSrc: action.payload,
        error: null,
      };

    case 'CROP_CHANGED':
      return {
        ...state,
        crop: action.payload,
      };

    case 'ZOOM_CHANGED':
      return {
        ...state,
        zoom: action.payload,
      };

    case 'ROTATION_CHANGED':
      return {
        ...state,
        rotation: action.payload,
      };

    case 'ASPECT_RATIO_CHANGED':
      return {
        ...state,
        aspectRatio: action.payload,
      };

    case 'CROP_COMPLETE':
      return {
        ...state,
        croppedAreaPixels: action.payload,
      };

    case 'PROCESSING_START':
      return {
        ...state,
        uploadState: 'processing',
      };

    case 'PROCESSING_COMPLETE':
      return {
        ...state,
        uploadState: 'complete',
      };

    case 'ERROR_OCCURRED':
      return {
        ...state,
        uploadState: 'error',
        error: action.payload,
      };

    case 'RESET':
      return {
        ...INITIAL_STATE,
        aspectRatio: state.aspectRatio,
      };

    default:
      return state;
  }
}

export function getErrorMessage(error: ImageCropState['error']): string {
  if (!error) return '';

  switch (error.type) {
    case 'FILE_TOO_LARGE':
      return `File size exceeds ${Math.round(error.maxSize / 1024 / 1024)}MB limit`;
    case 'INVALID_FILE_TYPE':
      return `Only ${error.allowedTypes.join(', ')} files are supported`;
    case 'FILE_READ_ERROR':
      return error.message;
    case 'CROP_ERROR':
      return error.message;
    case 'CANVAS_ERROR':
      return error.message;
    default:
      return 'An unknown error occurred';
  }
}
