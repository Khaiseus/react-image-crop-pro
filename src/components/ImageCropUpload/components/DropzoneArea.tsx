import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './DropzoneArea.module.css';

export interface DropzoneAreaProps {
  onFileSelected: (file: File) => void;
  onError: (error: string) => void;
  maxFileSize: number;
  allowedFormats: string[];
  disabled?: boolean;
  labels: {
    idle: string;
    active: string;
    reject: string;
  };
  className?: string;
}

export const DropzoneArea: React.FC<DropzoneAreaProps> = ({
  onFileSelected,
  onError,
  maxFileSize,
  allowedFormats,
  disabled = false,
  labels,
  className,
}) => {
  const handleDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: unknown) => {
      const rejections = rejectedFiles as Array<{ file: File; errors: ReadonlyArray<{ code: string; message: string }> }>;

      if (rejections.length > 0) {
        const rejection = rejections[0];
        const error = rejection.errors[0];

        if (error.code === 'file-too-large') {
          onError(`File size exceeds ${Math.round(maxFileSize / 1024 / 1024)}MB limit`);
        } else if (error.code === 'file-invalid-type') {
          onError('File type not supported');
        } else {
          onError(error.message || 'File selection failed');
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        onFileSelected(acceptedFiles[0]);
      }
    },
    [onFileSelected, onError, maxFileSize]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: allowedFormats.reduce((acc, format) => {
      acc[format] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize: maxFileSize,
    multiple: false,
    disabled,
    onDrop: handleDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`${styles.dropzone} ${
        isDragActive ? styles.active : ''
      } ${isDragReject ? styles.reject : ''} ${
        disabled ? styles.disabled : ''
      } ${className || ''}`}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="Upload image"
      aria-disabled={disabled}
    >
      <input {...getInputProps()} aria-label="Choose file" />
      <div className={styles.content}>
        <svg
          className={styles.icon}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className={styles.text}>
          {isDragReject
            ? labels.reject
            : isDragActive
            ? labels.active
            : labels.idle}
        </p>
      </div>
    </div>
  );
};
