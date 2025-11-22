import React from 'react';
import styles from '../ImageCropUpload.module.css';

interface CompleteViewProps {
  onReset: () => void;
  className?: string;
  retryLabel: string;
}

export const CompleteView: React.FC<CompleteViewProps> = ({
  onReset,
  className,
  retryLabel,
}) => {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.complete} role="status" aria-live="polite">
        <p>Image cropped successfully!</p>
        <button
          type="button"
          onClick={onReset}
          className={styles.button}
        >
          {retryLabel}
        </button>
      </div>
    </div>
  );
};
