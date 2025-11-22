import React, { useReducer, useCallback, useEffect, useMemo, useRef } from 'react';
import { ImageCropUploadProps, PixelCrop } from './types';
import { imageCropReducer } from './reducer';
import { DEFAULT_CONFIG, DEFAULT_LABELS, DEFAULT_ASPECT_RATIO_PRESETS, INITIAL_STATE } from './constants';
import { readFileAsDataURL, validateFile } from './utils/fileUtils';
import { createCroppedImage, createCircularCrop } from './utils/cropImage';
import { UploadView } from './components/UploadView';
import { CroppingView } from './components/CroppingView';
import { ProcessingView } from './components/ProcessingView';
import { CompleteView } from './components/CompleteView';
import { resolveTheme, applyTheme } from './themeUtils';

export const ImageCropUpload: React.FC<ImageCropUploadProps> = (props) => {
  const config = useMemo(() => ({
    ...DEFAULT_CONFIG,
    ...props,
    labels: { ...DEFAULT_LABELS, ...props.labels },
  }), [props]);

  const {
    onCropComplete,
    onError,
    onChange,
    aspectRatio = config.aspectRatio,
    aspectRatioPresets = DEFAULT_ASPECT_RATIO_PRESETS,
    circularCrop = config.circularCrop,
    showGrid = config.showGrid,
    maxFileSize = config.maxFileSize,
    allowedFormats = config.allowedFormats,
    minZoom = config.minZoom,
    maxZoom = config.maxZoom,
    initialZoom = config.initialZoom,
    enableRotation = config.enableRotation,
    rotationStep = config.rotationStep,
    enablePinchZoom = config.enablePinchZoom,
    enableTouchRotation = config.enableTouchRotation,
    outputFormat = config.outputFormat,
    outputQuality = config.outputQuality,
    outputType = config.outputType,
    outputMaxWidth,
    outputMaxHeight,
    className,
    cropAreaClassName,
    previewClassName,
    showPreview = config.showPreview,
    previewSize = config.previewSize,
    labels = config.labels,
    restrictPosition = config.restrictPosition,
    objectFit = config.objectFit,
    theme,
  } = config;

  const containerRef = useRef<HTMLDivElement>(null);
  const resolvedTheme = useMemo(() => resolveTheme(theme), [theme]);

  useEffect(() => {
    if (containerRef.current) {
      applyTheme(containerRef.current, resolvedTheme);
    }
  }, [resolvedTheme]);

  const [state, dispatch] = useReducer(imageCropReducer, {
    ...INITIAL_STATE,
    aspectRatio,
    zoom: initialZoom,
  });

  useEffect(() => {
    onChange?.(state.uploadState);
  }, [state.uploadState, onChange]);

  const handleFileSelected = useCallback(
    async (file: File) => {
      try {
        const validationError = validateFile(file, maxFileSize, [...allowedFormats]);
        if (validationError) {
          dispatch({ type: 'ERROR_OCCURRED', payload: validationError });
          onError?.(validationError);
          return;
        }

        dispatch({ type: 'FILE_SELECTED', payload: file });
        const dataURL = await readFileAsDataURL(file);
        dispatch({ type: 'IMAGE_LOADED', payload: dataURL });
      } catch (error) {
        const errorPayload = {
          type: 'FILE_READ_ERROR' as const,
          message: error instanceof Error ? error.message : 'Failed to read file',
        };
        dispatch({ type: 'ERROR_OCCURRED', payload: errorPayload });
        onError?.(errorPayload);
      }
    },
    [maxFileSize, allowedFormats, onError]
  );

  const handleFileError = useCallback(
    (error: string) => {
      const errorPayload = {
        type: 'FILE_READ_ERROR' as const,
        message: error,
      };
      dispatch({ type: 'ERROR_OCCURRED', payload: errorPayload });
      onError?.(errorPayload);
    },
    [onError]
  );

  const handleCropChange = useCallback((crop: { x: number; y: number }) => {
    dispatch({ type: 'CROP_CHANGED', payload: crop });
  }, []);

  const handleZoomChange = useCallback((zoom: number) => {
    dispatch({ type: 'ZOOM_CHANGED', payload: zoom });
  }, []);

  const handleRotationChange = useCallback((rotation: number) => {
    dispatch({ type: 'ROTATION_CHANGED', payload: rotation });
  }, []);

  const handleAspectRatioChange = useCallback((ratio: number) => {
    dispatch({ type: 'ASPECT_RATIO_CHANGED', payload: ratio });
  }, []);

  const handleCropComplete = useCallback((croppedAreaPixels: PixelCrop) => {
    dispatch({ type: 'CROP_COMPLETE', payload: croppedAreaPixels });
  }, []);

  const handleCrop = useCallback(async () => {
    if (!state.imageSrc || !state.croppedAreaPixels) return;

    try {
      dispatch({ type: 'PROCESSING_START' });

      const cropFunction = circularCrop ? createCircularCrop : createCroppedImage;

      const result = await cropFunction(
        state.imageSrc,
        state.croppedAreaPixels,
        state.rotation,
        {
          format: outputFormat,
          quality: outputQuality,
          type: outputType,
          maxWidth: outputMaxWidth,
          maxHeight: outputMaxHeight,
          fileName: state.selectedFile?.name || 'cropped-image.jpg',
        }
      );

      dispatch({ type: 'PROCESSING_COMPLETE', payload: result });
      onCropComplete(result);
    } catch (error) {
      const errorPayload = {
        type: 'CROP_ERROR' as const,
        message: error instanceof Error ? error.message : 'Failed to crop image',
      };
      dispatch({ type: 'ERROR_OCCURRED', payload: errorPayload });
      onError?.(errorPayload);
    }
  }, [
    state.imageSrc,
    state.croppedAreaPixels,
    state.rotation,
    state.selectedFile,
    circularCrop,
    outputFormat,
    outputQuality,
    outputType,
    outputMaxWidth,
    outputMaxHeight,
    onCropComplete,
    onError,
  ]);

  const handleCancel = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  if (state.uploadState === 'idle' || state.uploadState === 'error') {
    return (
      <div ref={containerRef}>
        <UploadView
          onFileSelected={handleFileSelected}
          onFileError={handleFileError}
          onRetry={handleCancel}
          maxFileSize={maxFileSize}
          allowedFormats={[...allowedFormats]}
          error={state.uploadState === 'error' ? state.error : null}
          className={className}
          dropzoneLabels={labels.dropzone}
          retryLabel={labels.buttons.retry}
        />
      </div>
    );
  }

  if (state.uploadState === 'cropping' && state.imageSrc) {
    return (
      <div ref={containerRef}>
        <CroppingView
          imageSrc={state.imageSrc}
          crop={state.crop}
          zoom={state.zoom}
          rotation={state.rotation}
          aspectRatio={state.aspectRatio}
          croppedAreaPixels={state.croppedAreaPixels}
          circularCrop={circularCrop}
          showGrid={showGrid}
          restrictPosition={restrictPosition}
          objectFit={objectFit}
          enablePinchZoom={enablePinchZoom}
          enableTouchRotation={enableTouchRotation}
          minZoom={minZoom}
          maxZoom={maxZoom}
          enableRotation={enableRotation}
          rotationStep={rotationStep}
          showPreview={showPreview}
          previewSize={previewSize}
          aspectRatioPresets={aspectRatioPresets}
          onCropChange={handleCropChange}
          onZoomChange={handleZoomChange}
          onRotationChange={handleRotationChange}
          onAspectRatioChange={handleAspectRatioChange}
          onCropComplete={handleCropComplete}
          onCancel={handleCancel}
          onCrop={handleCrop}
          className={className}
          cropAreaClassName={cropAreaClassName}
          previewClassName={previewClassName}
          labels={labels}
        />
      </div>
    );
  }

  if (state.uploadState === 'processing') {
    return (
      <div ref={containerRef}>
        <ProcessingView className={className} />
      </div>
    );
  }

  if (state.uploadState === 'complete') {
    return (
      <div ref={containerRef}>
        <CompleteView
          onReset={handleCancel}
          className={className}
          retryLabel={labels.buttons.retry}
        />
      </div>
    );
  }

  return null;
};
