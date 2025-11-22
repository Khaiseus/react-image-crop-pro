import React from 'react';
import styles from '../ImageCropUpload.module.css';

interface ProcessingViewProps {
  className?: string;
}

export const ProcessingView: React.FC<ProcessingViewProps> = ({ className }) => {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.processing} role="status" aria-live="polite">
        <div className={styles.spinner} aria-label="Processing image" />
        <p>Processing image...</p>
      </div>
    </div>
  );
};
