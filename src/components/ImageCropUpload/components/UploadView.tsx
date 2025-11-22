import React from 'react';
import { DropzoneArea } from './DropzoneArea';
import { ImageCropError } from '../types';
import { getErrorMessage } from '../reducer';
import styles from '../ImageCropUpload.module.css';

interface UploadViewProps {
  onFileSelected: (file: File) => void;
  onFileError: (error: string) => void;
  onRetry: () => void;
  maxFileSize: number;
  allowedFormats: string[];
  error: ImageCropError | null;
  className?: string;
  dropzoneLabels: {
    idle: string;
    active: string;
    reject: string;
  };
  retryLabel: string;
}

export const UploadView: React.FC<UploadViewProps> = ({
  onFileSelected,
  onFileError,
  onRetry,
  maxFileSize,
  allowedFormats,
  error,
  className,
  dropzoneLabels,
  retryLabel,
}) => {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      <DropzoneArea
        onFileSelected={onFileSelected}
        onError={onFileError}
        maxFileSize={maxFileSize}
        allowedFormats={allowedFormats}
        labels={dropzoneLabels}
      />
      {error && (
        <div className={styles.error} role="alert" aria-live="polite">
          <p>{getErrorMessage(error)}</p>
          <button
            type="button"
            onClick={onRetry}
            className={styles.retryButton}
          >
            {retryLabel}
          </button>
        </div>
      )}
    </div>
  );
};
