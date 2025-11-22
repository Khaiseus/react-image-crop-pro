/**
 * Unit tests for fileUtils
 */

import { describe, it, expect, vi } from 'vitest';
import {
  dataURLtoBlob,
  dataURLtoFile,
  validateFileSize,
  validateFileType,
  validateFile,
  formatFileSize,
  getFileExtension,
  isImageFile,
  readFileAsDataURL,
} from './fileUtils';
import { loadImage } from './canvasUtils';

describe('dataURLtoBlob', () => {
  it('should convert JPEG data URL to Blob', () => {
    const dataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==';
    const blob = dataURLtoBlob(dataURL);

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('image/jpeg');
  });

  it('should convert PNG data URL to Blob', () => {
    const dataURL = 'data:image/png;base64,iVBORw0KGgo=';
    const blob = dataURLtoBlob(dataURL);

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('image/png');
  });

  it('should throw error for invalid MIME type', () => {
    const dataURL = 'data:;base64,test';

    expect(() => dataURLtoBlob(dataURL)).toThrow('Invalid MIME type');
  });
});

describe('dataURLtoFile', () => {
  it('should convert data URL to File', () => {
    const dataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==';
    const filename = 'test.jpg';

    const file = dataURLtoFile(dataURL, filename);

    expect(file).toBeInstanceOf(File);
    expect(file.name).toBe(filename);
    expect(file.type).toBe('image/jpeg');
  });

  it('should handle PNG files', () => {
    const dataURL = 'data:image/png;base64,iVBORw0KGgo=';
    const filename = 'test.png';

    const file = dataURLtoFile(dataURL, filename);

    expect(file.type).toBe('image/png');
    expect(file.name).toBe(filename);
  });
});

describe('validateFileSize', () => {
  it('should return null for valid file size', () => {
    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
    const maxSize = 1024 * 1024; // 1MB

    const result = validateFileSize(file, maxSize);

    expect(result).toBeNull();
  });

  it('should return error for oversized file', () => {
    const largeContent = new Array(2 * 1024 * 1024).fill('a').join('');
    const file = new File([largeContent], 'large.jpg', { type: 'image/jpeg' });
    const maxSize = 1024 * 1024; // 1MB

    const result = validateFileSize(file, maxSize);

    expect(result).toEqual({
      type: 'FILE_TOO_LARGE',
      maxSize,
    });
  });

  it('should handle exact size limit', () => {
    const content = new Array(1024 * 1024).fill('a').join('');
    const file = new File([content], 'exact.jpg', { type: 'image/jpeg' });
    const maxSize = 1024 * 1024;

    const result = validateFileSize(file, maxSize);

    expect(result).toBeNull();
  });
});

describe('validateFileType', () => {
  it('should return null for allowed file type', () => {
    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
    const allowedTypes = ['image/jpeg', 'image/png'];

    const result = validateFileType(file, allowedTypes);

    expect(result).toBeNull();
  });

  it('should return error for disallowed file type', () => {
    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    const allowedTypes = ['image/jpeg', 'image/png'];

    const result = validateFileType(file, allowedTypes);

    expect(result).toEqual({
      type: 'INVALID_FILE_TYPE',
      allowedTypes,
    });
  });

  it('should handle MIME types correctly', () => {
    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
    const allowedTypes = ['image/jpeg'];

    const result = validateFileType(file, allowedTypes);

    // MIME types are normalized by the browser, so this should pass
    expect(result).toBeNull();
  });
});

describe('validateFile', () => {
  it('should validate both size and type', () => {
    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
    const maxSize = 1024 * 1024;
    const allowedTypes = ['image/jpeg'];

    const result = validateFile(file, maxSize, allowedTypes);

    expect(result).toBeNull();
  });

  it('should return size error first when both validations fail', () => {
    const largeContent = new Array(2 * 1024 * 1024).fill('a').join('');
    const file = new File([largeContent], 'large.pdf', { type: 'application/pdf' });
    const maxSize = 1024 * 1024;
    const allowedTypes = ['image/jpeg'];

    const result = validateFile(file, maxSize, allowedTypes);

    expect(result?.type).toBe('FILE_TOO_LARGE');
  });

  it('should return type error when size is valid but type is not', () => {
    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    const maxSize = 1024 * 1024;
    const allowedTypes = ['image/jpeg'];

    const result = validateFile(file, maxSize, allowedTypes);

    expect(result?.type).toBe('INVALID_FILE_TYPE');
  });
});

describe('formatFileSize', () => {
  it('should format zero bytes', () => {
    expect(formatFileSize(0)).toBe('0 Bytes');
  });

  it('should format bytes', () => {
    expect(formatFileSize(500)).toBe('500 Bytes');
  });

  it('should format kilobytes', () => {
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(2048)).toBe('2 KB');
    expect(formatFileSize(1536)).toBe('1.5 KB');
  });

  it('should format megabytes', () => {
    expect(formatFileSize(1024 * 1024)).toBe('1 MB');
    expect(formatFileSize(2.5 * 1024 * 1024)).toBe('2.5 MB');
  });

  it('should format gigabytes', () => {
    expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
  });
});

describe('getFileExtension', () => {
  it('should get extension from filename', () => {
    expect(getFileExtension('test.jpg')).toBe('.jpg');
    expect(getFileExtension('test.png')).toBe('.png');
    expect(getFileExtension('document.pdf')).toBe('.pdf');
  });

  it('should handle multiple dots', () => {
    expect(getFileExtension('archive.tar.gz')).toBe('.gz');
  });

  it('should return empty string for no extension', () => {
    expect(getFileExtension('README')).toBe('');
  });

  it('should handle hidden files', () => {
    expect(getFileExtension('.gitignore')).toBe('.gitignore');
  });
});

describe('isImageFile', () => {
  it('should return true for image files', () => {
    const jpegFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const pngFile = new File([''], 'test.png', { type: 'image/png' });
    const gifFile = new File([''], 'test.gif', { type: 'image/gif' });

    expect(isImageFile(jpegFile)).toBe(true);
    expect(isImageFile(pngFile)).toBe(true);
    expect(isImageFile(gifFile)).toBe(true);
  });

  it('should return false for non-image files', () => {
    const pdfFile = new File([''], 'test.pdf', { type: 'application/pdf' });
    const textFile = new File([''], 'test.txt', { type: 'text/plain' });

    expect(isImageFile(pdfFile)).toBe(false);
    expect(isImageFile(textFile)).toBe(false);
  });
});

describe('loadImage', () => {
  it('should load an image from URL', async () => {
    const src = 'data:image/jpeg;base64,test';

    const img = await loadImage(src);

    // In test environment, we use MockImage
    expect(img.width).toBe(100);
    expect(img.height).toBe(100);
  });
});

describe('readFileAsDataURL', () => {
  it('should read file as data URL', async () => {
    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });

    const result = await readFileAsDataURL(file);

    expect(result).toContain('data:image/jpeg;base64,');
  });

  it('should handle FileReader errors', async () => {
    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });

    // Mock FileReader to simulate error
    const originalFileReader = global.FileReader;
    global.FileReader = class {
      readAsDataURL() {
        setTimeout(() => {
          if (this.onerror) {
            this.onerror(new Event('error'));
          }
        }, 0);
      }
    } as any;

    await expect(readFileAsDataURL(file)).rejects.toThrow('FileReader error');

    // Restore FileReader
    global.FileReader = originalFileReader;
  });
});
