/**
 * Unit tests for reducer
 */

import { describe, it, expect } from 'vitest';
import {
  imageCropReducer,
  getErrorMessage,
} from './reducer';
import { INITIAL_STATE } from './constants';
import { ImageCropState } from './types';

describe('imageCropReducer', () => {
  describe('FILE_SELECTED action', () => {
    it('should transition to uploading state', () => {
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
      const action = { type: 'FILE_SELECTED' as const, payload: file };

      const newState = imageCropReducer(INITIAL_STATE, action);

      expect(newState.uploadState).toBe('uploading');
      expect(newState.selectedFile).toBe(file);
      expect(newState.error).toBeNull();
    });

    it('should clear previous errors', () => {
      const stateWithError: ImageCropState = {
        ...INITIAL_STATE,
        uploadState: 'error',
        error: { type: 'FILE_TOO_LARGE', maxSize: 1024 },
      };
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
      const action = { type: 'FILE_SELECTED' as const, payload: file };

      const newState = imageCropReducer(stateWithError, action);

      expect(newState.error).toBeNull();
    });
  });

  describe('IMAGE_LOADED action', () => {
    it('should transition to cropping state', () => {
      const imageSrc = 'data:image/jpeg;base64,mockdata';
      const action = { type: 'IMAGE_LOADED' as const, payload: imageSrc };

      const newState = imageCropReducer(INITIAL_STATE, action);

      expect(newState.uploadState).toBe('cropping');
      expect(newState.imageSrc).toBe(imageSrc);
      expect(newState.error).toBeNull();
    });
  });

  describe('CROP_CHANGED action', () => {
    it('should update crop position', () => {
      const crop = { x: 10, y: 20 };
      const action = { type: 'CROP_CHANGED' as const, payload: crop };

      const newState = imageCropReducer(INITIAL_STATE, action);

      expect(newState.crop).toEqual(crop);
    });
  });

  describe('ZOOM_CHANGED action', () => {
    it('should update zoom level', () => {
      const action = { type: 'ZOOM_CHANGED' as const, payload: 1.5 };

      const newState = imageCropReducer(INITIAL_STATE, action);

      expect(newState.zoom).toBe(1.5);
    });
  });

  describe('ROTATION_CHANGED action', () => {
    it('should update rotation', () => {
      const action = { type: 'ROTATION_CHANGED' as const, payload: 90 };

      const newState = imageCropReducer(INITIAL_STATE, action);

      expect(newState.rotation).toBe(90);
    });
  });

  describe('ASPECT_RATIO_CHANGED action', () => {
    it('should update aspect ratio', () => {
      const action = { type: 'ASPECT_RATIO_CHANGED' as const, payload: 16 / 9 };

      const newState = imageCropReducer(INITIAL_STATE, action);

      expect(newState.aspectRatio).toBe(16 / 9);
    });
  });

  describe('CROP_COMPLETE action', () => {
    it('should store cropped area pixels', () => {
      const croppedAreaPixels = { x: 10, y: 10, width: 100, height: 100 };
      const action = { type: 'CROP_COMPLETE' as const, payload: croppedAreaPixels };

      const newState = imageCropReducer(INITIAL_STATE, action);

      expect(newState.croppedAreaPixels).toEqual(croppedAreaPixels);
    });
  });

  describe('PROCESSING_START action', () => {
    it('should transition to processing state', () => {
      const action = { type: 'PROCESSING_START' as const };

      const newState = imageCropReducer(INITIAL_STATE, action);

      expect(newState.uploadState).toBe('processing');
    });
  });

  describe('PROCESSING_COMPLETE action', () => {
    it('should transition to complete state', () => {
      const action = { type: 'PROCESSING_COMPLETE' as const };

      const newState = imageCropReducer(INITIAL_STATE, action);

      expect(newState.uploadState).toBe('complete');
    });
  });

  describe('ERROR_OCCURRED action', () => {
    it('should transition to error state', () => {
      const error = { type: 'FILE_TOO_LARGE' as const, maxSize: 1024 };
      const action = { type: 'ERROR_OCCURRED' as const, payload: error };

      const newState = imageCropReducer(INITIAL_STATE, action);

      expect(newState.uploadState).toBe('error');
      expect(newState.error).toEqual(error);
    });

    it('should handle different error types', () => {
      const errors = [
        { type: 'FILE_TOO_LARGE' as const, maxSize: 1024 },
        { type: 'INVALID_FILE_TYPE' as const, allowedTypes: ['image/jpeg'] },
        { type: 'FILE_READ_ERROR' as const, message: 'Read failed' },
        { type: 'CROP_ERROR' as const, message: 'Crop failed' },
        { type: 'CANVAS_ERROR' as const, message: 'Canvas error' },
      ];

      errors.forEach((error) => {
        const action = { type: 'ERROR_OCCURRED' as const, payload: error };
        const newState = imageCropReducer(INITIAL_STATE, action);

        expect(newState.error).toEqual(error);
      });
    });
  });

  describe('RESET action', () => {
    it('should return to initial state', () => {
      const modifiedState: ImageCropState = {
        ...INITIAL_STATE,
        uploadState: 'cropping',
        zoom: 2,
        rotation: 90,
        selectedFile: new File(['content'], 'test.jpg', { type: 'image/jpeg' }),
        imageSrc: 'data:image/jpeg;base64,mock',
      };
      const action = { type: 'RESET' as const };

      const newState = imageCropReducer(modifiedState, action);

      expect(newState.uploadState).toBe('idle');
      expect(newState.selectedFile).toBeNull();
      expect(newState.imageSrc).toBeNull();
    });

    it('should preserve aspect ratio on reset', () => {
      const modifiedState: ImageCropState = {
        ...INITIAL_STATE,
        aspectRatio: 16 / 9,
      };
      const action = { type: 'RESET' as const };

      const newState = imageCropReducer(modifiedState, action);

      expect(newState.aspectRatio).toBe(16 / 9);
    });
  });
});

describe('getErrorMessage', () => {
  it('should return empty string for null error', () => {
    expect(getErrorMessage(null)).toBe('');
  });

  it('should format FILE_TOO_LARGE error', () => {
    const error = { type: 'FILE_TOO_LARGE' as const, maxSize: 5 * 1024 * 1024 };
    const message = getErrorMessage(error);
    expect(message).toContain('5MB');
  });

  it('should format INVALID_FILE_TYPE error', () => {
    const error = {
      type: 'INVALID_FILE_TYPE' as const,
      allowedTypes: ['image/jpeg', 'image/png'],
    };
    const message = getErrorMessage(error);
    expect(message).toContain('image/jpeg, image/png');
  });

  it('should return message for FILE_READ_ERROR', () => {
    const error = { type: 'FILE_READ_ERROR' as const, message: 'Custom error' };
    const message = getErrorMessage(error);
    expect(message).toBe('Custom error');
  });

  it('should return message for CROP_ERROR', () => {
    const error = { type: 'CROP_ERROR' as const, message: 'Crop failed' };
    const message = getErrorMessage(error);
    expect(message).toBe('Crop failed');
  });

  it('should return message for CANVAS_ERROR', () => {
    const error = { type: 'CANVAS_ERROR' as const, message: 'Canvas failed' };
    const message = getErrorMessage(error);
    expect(message).toBe('Canvas failed');
  });
});
