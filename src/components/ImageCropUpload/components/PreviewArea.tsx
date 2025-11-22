import React, { useEffect, useRef } from 'react';
import { PixelCrop } from '../types';
import { loadImage } from '../utils/canvasUtils';
import styles from './PreviewArea.module.css';

export interface PreviewAreaProps {
  imageSrc: string;
  croppedAreaPixels: PixelCrop | null;
  rotation: number;
  circular?: boolean;
  size?: number;
  className?: string;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({
  imageSrc,
  croppedAreaPixels,
  rotation,
  circular = false,
  size = 150,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!croppedAreaPixels || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const renderPreview = async () => {
      try {
        const image = await loadImage(imageSrc);

        canvas.width = size;
        canvas.height = size;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (circular) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
        }

        const scale = Math.min(
          size / croppedAreaPixels.width,
          size / croppedAreaPixels.height
        );

        const scaledWidth = croppedAreaPixels.width * scale;
        const scaledHeight = croppedAreaPixels.height * scale;
        const offsetX = (size - scaledWidth) / 2;
        const offsetY = (size - scaledHeight) / 2;

        const rotRad = (rotation * Math.PI) / 180;
        ctx.save();
        ctx.translate(size / 2, size / 2);
        ctx.rotate(rotRad);
        ctx.translate(-size / 2, -size / 2);

        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          offsetX,
          offsetY,
          scaledWidth,
          scaledHeight
        );

        ctx.restore();

        if (circular) {
          ctx.restore();
        }
      } catch (error) {
        console.error('Failed to render preview:', error);
      }
    };

    renderPreview();
  }, [imageSrc, croppedAreaPixels, rotation, circular, size]);

  return (
    <div className={`${styles.previewArea} ${className || ''}`}>
      <label className={styles.label}>Preview</label>
      <div className={styles.previewContainer}>
        <canvas
          ref={canvasRef}
          className={`${styles.canvas} ${circular ? styles.circular : ''}`}
          style={{ width: size, height: size }}
          aria-label="Cropped image preview"
        />
      </div>
    </div>
  );
};
