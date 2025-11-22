import React from 'react';
import { AspectRatioPreset } from '../types';
import styles from './AspectRatioSelector.module.css';

const ASPECT_RATIO_TOLERANCE = 0.01;

export interface AspectRatioSelectorProps {
  currentRatio: number;
  presets: AspectRatioPreset[];
  onRatioChange: (ratio: number) => void;
  label?: string;
  className?: string;
}

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({
  currentRatio,
  presets,
  onRatioChange,
  label = 'Aspect Ratio',
  className,
}) => {
  const isActive = (preset: AspectRatioPreset): boolean => {
    if (preset.value === 'free') {
      return false;
    }
    return Math.abs(currentRatio - (preset.value as number)) < ASPECT_RATIO_TOLERANCE;
  };

  const handlePresetClick = (preset: AspectRatioPreset) => {
    if (preset.value === 'free') {
      onRatioChange(currentRatio);
    } else {
      onRatioChange(preset.value as number);
    }
  };

  return (
    <div className={`${styles.aspectRatioSelector} ${className || ''}`}>
      <label className={styles.label}>{label}</label>
      <div className={styles.presets} role="group" aria-label="Aspect ratio presets">
        {presets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => handlePresetClick(preset)}
            className={`${styles.preset} ${isActive(preset) ? styles.active : ''}`}
            aria-label={`Set aspect ratio to ${preset.label}`}
            aria-pressed={isActive(preset)}
          >
            {preset.icon && <span className={styles.icon}>{preset.icon}</span>}
            <span className={styles.label}>{preset.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
