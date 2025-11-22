import React from 'react';
import { CropperArea } from './CropperArea';
import { ZoomControl } from './ZoomControl';
import { RotationControl } from './RotationControl';
import { AspectRatioSelector } from './AspectRatioSelector';
import { PreviewArea } from './PreviewArea';
import { AspectRatioPreset, PixelCrop } from '../types';
import styles from '../ImageCropUpload.module.css';

interface CroppingViewProps {
  // Image state
  imageSrc: string;
  crop: { x: number; y: number };
  zoom: number;
  rotation: number;
  aspectRatio: number;
  croppedAreaPixels: PixelCrop | null;

  // Configuration
  circularCrop: boolean;
  showGrid: boolean;
  restrictPosition: boolean;
  objectFit: 'contain' | 'cover' | 'horizontal-cover' | 'vertical-cover';
  enablePinchZoom: boolean;
  enableTouchRotation: boolean;
  minZoom: number;
  maxZoom: number;
  enableRotation: boolean;
  rotationStep: number;
  showPreview: boolean;
  previewSize: number;
  aspectRatioPresets: AspectRatioPreset[] | undefined;

  // Event handlers
  onCropChange: (crop: { x: number; y: number }) => void;
  onZoomChange: (zoom: number) => void;
  onRotationChange: (rotation: number) => void;
  onAspectRatioChange: (ratio: number) => void;
  onCropComplete: (croppedAreaPixels: PixelCrop) => void;
  onCancel: () => void;
  onCrop: () => void;

  // Styling
  className?: string;
  cropAreaClassName?: string;
  previewClassName?: string;

  // Labels
  labels: {
    controls: {
      zoom: string;
      rotation: string;
      aspectRatio: string;
    };
    buttons: {
      cancel: string;
      crop: string;
    };
  };
}

export const CroppingView: React.FC<CroppingViewProps> = ({
  imageSrc,
  crop,
  zoom,
  rotation,
  aspectRatio,
  croppedAreaPixels,
  circularCrop,
  showGrid,
  restrictPosition,
  objectFit,
  enablePinchZoom,
  enableTouchRotation,
  minZoom,
  maxZoom,
  enableRotation,
  rotationStep,
  showPreview,
  previewSize,
  aspectRatioPresets,
  onCropChange,
  onZoomChange,
  onRotationChange,
  onAspectRatioChange,
  onCropComplete,
  onCancel,
  onCrop,
  className,
  cropAreaClassName,
  previewClassName,
  labels,
}) => {
  return (
    <div className={`${styles.container} ${styles.croppingMode} ${className || ''}`}>
      <div className={styles.cropperWrapper}>
        <CropperArea
          imageSrc={imageSrc}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspectRatio={aspectRatio}
          circularCrop={circularCrop}
          showGrid={showGrid}
          restrictPosition={restrictPosition}
          objectFit={objectFit}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onRotationChange={onRotationChange}
          onCropComplete={onCropComplete}
          className={cropAreaClassName}
          enablePinchZoom={enablePinchZoom}
          enableTouchRotation={enableTouchRotation}
          minZoom={minZoom}
          maxZoom={maxZoom}
        />
      </div>

      <div className={styles.controls}>
        <ZoomControl
          zoom={zoom}
          minZoom={minZoom}
          maxZoom={maxZoom}
          onZoomChange={onZoomChange}
          label={labels.controls.zoom}
        />

        {enableRotation && (
          <RotationControl
            rotation={rotation}
            rotationStep={rotationStep}
            onRotationChange={onRotationChange}
            label={labels.controls.rotation}
          />
        )}

        {aspectRatioPresets && aspectRatioPresets.length > 0 && (
          <AspectRatioSelector
            currentRatio={aspectRatio}
            presets={aspectRatioPresets}
            onRatioChange={onAspectRatioChange}
            label={labels.controls.aspectRatio}
          />
        )}

        {showPreview && croppedAreaPixels && (
          <PreviewArea
            imageSrc={imageSrc}
            croppedAreaPixels={croppedAreaPixels}
            rotation={rotation}
            circular={circularCrop}
            size={previewSize}
            className={previewClassName}
          />
        )}
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={onCancel}
          className={`${styles.button} ${styles.cancelButton}`}
        >
          {labels.buttons.cancel}
        </button>
        <button
          type="button"
          onClick={onCrop}
          disabled={!croppedAreaPixels}
          className={`${styles.button} ${styles.cropButton}`}
        >
          {labels.buttons.crop}
        </button>
      </div>
    </div>
  );
};
