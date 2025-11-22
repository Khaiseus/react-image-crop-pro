import React from 'react';
import styles from './ZoomControl.module.css';

export interface ZoomControlProps {
  zoom: number;
  minZoom: number;
  maxZoom: number;
  onZoomChange: (zoom: number) => void;
  label?: string;
  className?: string;
}

export const ZoomControl: React.FC<ZoomControlProps> = ({
  zoom,
  minZoom,
  maxZoom,
  onZoomChange,
  label = 'Zoom',
  className,
}) => {
  const step = 0.1;

  return (
    <div className={`${styles.zoomControl} ${className || ''}`}>
      <label htmlFor="zoom-slider" className={styles.label}>
        {label}
      </label>
      <div className={styles.sliderContainer}>
        <span className={styles.minLabel}>{Math.round(minZoom * 100)}%</span>
        <input
          id="zoom-slider"
          type="range"
          min={minZoom}
          max={maxZoom}
          step={step}
          value={zoom}
          onChange={(e) => onZoomChange(Number(e.target.value))}
          className={styles.slider}
          aria-label={label}
          aria-valuemin={minZoom}
          aria-valuemax={maxZoom}
          aria-valuenow={zoom}
          aria-valuetext={`${Math.round(zoom * 100)}%`}
        />
        <span className={styles.maxLabel}>{Math.round(maxZoom * 100)}%</span>
      </div>
      <span className={styles.value}>{Math.round(zoom * 100)}%</span>
    </div>
  );
};
