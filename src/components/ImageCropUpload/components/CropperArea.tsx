import React, { useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { PixelCrop, CropArea } from '../types';
import { useTouchGestures } from '../../../hooks/useTouchGestures';
import styles from './CropperArea.module.css';

export interface CropperAreaProps {
  imageSrc: string;
  crop: { x: number; y: number };
  zoom: number;
  rotation: number;
  aspectRatio: number;
  circularCrop?: boolean;
  showGrid?: boolean;
  restrictPosition?: boolean;
  objectFit?: 'contain' | 'cover' | 'horizontal-cover' | 'vertical-cover';
  onCropChange: (crop: { x: number; y: number }) => void;
  onZoomChange?: (zoom: number) => void;
  onRotationChange?: (rotation: number) => void;
  onCropComplete: (croppedAreaPixels: PixelCrop) => void;
  className?: string;
  enablePinchZoom?: boolean;
  enableTouchRotation?: boolean;
  minZoom?: number;
  maxZoom?: number;
}

export const CropperArea: React.FC<CropperAreaProps> = ({
  imageSrc,
  crop,
  zoom,
  rotation,
  aspectRatio,
  circularCrop = false,
  showGrid = true,
  restrictPosition = true,
  objectFit = 'contain',
  onCropChange,
  onZoomChange,
  onRotationChange,
  onCropComplete,
  className,
  enablePinchZoom = true,
  enableTouchRotation = true,
  minZoom = 1,
  maxZoom = 3,
}) => {
  const handleCropComplete = useCallback(
    (_croppedArea: CropArea, croppedAreaPixels: PixelCrop) => {
      onCropComplete(croppedAreaPixels);
    },
    [onCropComplete]
  );

  const handleZoomChange = useCallback(
    (newZoom: number) => {
      if (onZoomChange) {
        onZoomChange(newZoom);
      }
    },
    [onZoomChange]
  );

  const handleRotationChange = useCallback(
    (newRotation: number) => {
      if (onRotationChange) {
        onRotationChange(newRotation);
      }
    },
    [onRotationChange]
  );

  const { attachRef } = useTouchGestures({
    enabled: enablePinchZoom || enableTouchRotation,
    enablePinchZoom,
    enableTouchRotation,
    minZoom,
    maxZoom,
    currentZoom: zoom,
    currentRotation: rotation,
    onZoomChange: handleZoomChange,
    onRotationChange: handleRotationChange,
  });

  return (
    <div ref={attachRef} className={`${styles.cropperContainer} ${className || ''}`}>
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        rotation={rotation}
        aspect={aspectRatio}
        onCropChange={onCropChange}
        onZoomChange={onZoomChange}
        onCropComplete={handleCropComplete}
        showGrid={showGrid}
        cropShape={circularCrop ? 'round' : 'rect'}
        restrictPosition={restrictPosition}
        objectFit={objectFit}
        style={{
          containerStyle: {
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
          },
        }}
      />
    </div>
  );
};
