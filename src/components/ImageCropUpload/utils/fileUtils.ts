import { ImageCropError } from '../types';

const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/bmp',
  'image/svg+xml',
];

export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const result = reader.result;

        if (!result.startsWith('data:image/')) {
          reject(new Error('Invalid image data: File content is not a valid image'));
          return;
        }

        const mimeMatch = result.match(/^data:(image\/[^;]+);/);
        if (!mimeMatch) {
          reject(new Error('Invalid image data: Could not parse MIME type'));
          return;
        }

        const mimeType = mimeMatch[1];
        if (!ALLOWED_IMAGE_MIME_TYPES.includes(mimeType)) {
          reject(new Error(`Unsupported image type: ${mimeType}`));
          return;
        }

        resolve(result);
      } else {
        reject(new Error('Failed to read file as data URL'));
      }
    };

    reader.onerror = () => {
      reject(new Error('FileReader error: Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

export function dataURLtoFile(dataURL: string, filename: string): File {
  const arr = dataURL.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);

  if (!mimeMatch) {
    throw new Error('Invalid data URL: Could not extract MIME type');
  }

  const mime = mimeMatch[1];

  if (!ALLOWED_IMAGE_MIME_TYPES.includes(mime)) {
    throw new Error(`Invalid MIME type: ${mime}. Only image types are allowed.`);
  }

  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export function dataURLtoBlob(dataURL: string): Blob {
  const arr = dataURL.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);

  if (!mimeMatch) {
    throw new Error('Invalid data URL: Could not extract MIME type');
  }

  const mime = mimeMatch[1];

  if (!ALLOWED_IMAGE_MIME_TYPES.includes(mime)) {
    throw new Error(`Invalid MIME type: ${mime}. Only image types are allowed.`);
  }

  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
}

export function validateFileSize(
  file: File,
  maxSize: number
): ImageCropError | null {
  if (file.size > maxSize) {
    return { type: 'FILE_TOO_LARGE', maxSize };
  }
  return null;
}

export function validateFileType(
  file: File,
  allowedTypes: string[]
): ImageCropError | null {
  if (!allowedTypes.includes(file.type)) {
    return { type: 'INVALID_FILE_TYPE', allowedTypes };
  }
  return null;
}

export function validateFile(
  file: File,
  maxSize: number,
  allowedTypes: string[]
): ImageCropError | null {
  const sizeError = validateFileSize(file, maxSize);
  if (sizeError) return sizeError;

  const typeError = validateFileType(file, allowedTypes);
  if (typeError) return typeError;

  return null;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function getFileExtension(fileName: string): string {
  const lastDot = fileName.lastIndexOf('.');
  return lastDot !== -1 ? fileName.substring(lastDot) : '';
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}
