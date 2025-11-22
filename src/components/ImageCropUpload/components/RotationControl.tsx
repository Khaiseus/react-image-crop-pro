import React from 'react';
import styles from './RotationControl.module.css';

export interface RotationControlProps {
  rotation: number;
  rotationStep: number;
  onRotationChange: (rotation: number) => void;
  label?: string;
  className?: string;
}

export const RotationControl: React.FC<RotationControlProps> = ({
  rotation,
  rotationStep,
  onRotationChange,
  label = 'Rotation',
  className,
}) => {
  const handleRotateLeft = () => {
    onRotationChange(rotation - rotationStep);
  };

  const handleRotateRight = () => {
    onRotationChange(rotation + rotationStep);
  };

  const handleReset = () => {
    onRotationChange(0);
  };

  return (
    <div className={`${styles.rotationControl} ${className || ''}`}>
      <label className={styles.label}>{label}</label>
      <div className={styles.controls}>
        <button
          type="button"
          onClick={handleRotateLeft}
          className={styles.button}
          aria-label="Rotate left"
          title="Rotate left"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.icon}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9l-3 3 3 3" />
          </svg>
        </button>

        <div className={styles.display}>
          <span className={styles.value}>{rotation}°</span>
          <button
            type="button"
            onClick={handleReset}
            className={styles.resetButton}
            aria-label="Reset rotation"
            title="Reset rotation"
          >
            Reset
          </button>
        </div>

        <button
          type="button"
          onClick={handleRotateRight}
          className={styles.button}
          aria-label="Rotate right"
          title="Rotate right"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.icon}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9l3 3-3 3" />
          </svg>
        </button>
      </div>
    </div>
  );
};
