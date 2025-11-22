import { PixelCrop, CropResult } from '../types';
import { loadImage, canvasToBlob, blobToFile, calculateFitDimensions, applyCircularMask } from './canvasUtils';
import { dataURLtoBlob, dataURLtoFile } from './fileUtils';

export async function createCroppedImage(
  imageSrc: string,
  cropPixels: PixelCrop,
  rotation = 0,
  outputOptions?: {
    format?: 'base64' | 'blob' | 'file' | 'all';
    quality?: number;
    type?: 'image/png' | 'image/jpeg' | 'image/webp';
    maxWidth?: number;
    maxHeight?: number;
    fileName?: string;
  }
): Promise<CropResult> {
  const {
    format = 'base64',
    quality = 0.95,
    type = 'image/jpeg',
    maxWidth,
    maxHeight,
    fileName = 'cropped-image.jpg',
  } = outputOptions || {};

  try {
    const image = await loadImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }

    const { width: cropWidth, height: cropHeight } = cropPixels;
    const dimensions = calculateFitDimensions(
      cropWidth,
      cropHeight,
      maxWidth,
      maxHeight
    );

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const rotRad = (rotation * Math.PI) / 180;

    ctx.save();
    ctx.translate(dimensions.width / 2, dimensions.height / 2);
    ctx.rotate(rotRad);
    ctx.translate(-dimensions.width / 2, -dimensions.height / 2);

    ctx.drawImage(
      image,
      cropPixels.x,
      cropPixels.y,
      cropPixels.width,
      cropPixels.height,
      0,
      0,
      dimensions.width,
      dimensions.height
    );

    ctx.restore();

    const base64 = canvas.toDataURL(type, quality);

    const result: CropResult = {
      width: dimensions.width,
      height: dimensions.height,
    };

    if (format === 'base64' || format === 'all') {
      result.base64 = base64;
    }

    if (format === 'blob' || format === 'all') {
      const blob = await canvasToBlob(canvas, type, quality);
      result.blob = blob;
    }

    if (format === 'file' || format === 'all') {
      const blob = await canvasToBlob(canvas, type, quality);
      const file = blobToFile(blob, fileName);
      result.file = file;
    }

    if (format === 'all' && !result.blob) {
      result.blob = dataURLtoBlob(base64);
    }

    if (format === 'all' && !result.file) {
      result.file = dataURLtoFile(base64, fileName);
    }

    return result;
  } catch (error) {
    throw new Error(
      `Failed to crop image: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export async function createCircularCrop(
  imageSrc: string,
  cropPixels: PixelCrop,
  rotation = 0,
  outputOptions?: {
    format?: 'base64' | 'blob' | 'file' | 'all';
    quality?: number;
    type?: 'image/png' | 'image/jpeg' | 'image/webp';
    maxWidth?: number;
    maxHeight?: number;
    fileName?: string;
  }
): Promise<CropResult> {
  const {
    format = 'base64',
    quality = 0.95,
    type = 'image/png',
    maxWidth,
    maxHeight,
    fileName = 'cropped-image.png',
  } = outputOptions || {};

  try {
    const image = await loadImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }

    const { width: cropWidth, height: cropHeight } = cropPixels;
    const dimensions = calculateFitDimensions(
      cropWidth,
      cropHeight,
      maxWidth,
      maxHeight
    );

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const rotRad = (rotation * Math.PI) / 180;

    ctx.save();
    ctx.translate(dimensions.width / 2, dimensions.height / 2);
    ctx.rotate(rotRad);
    ctx.translate(-dimensions.width / 2, -dimensions.height / 2);

    ctx.drawImage(
      image,
      cropPixels.x,
      cropPixels.y,
      cropPixels.width,
      cropPixels.height,
      0,
      0,
      dimensions.width,
      dimensions.height
    );

    ctx.restore();

    const circularCanvas = applyCircularMask(canvas);
    const base64 = circularCanvas.toDataURL(type, quality);

    const result: CropResult = {
      width: circularCanvas.width,
      height: circularCanvas.height,
    };

    if (format === 'base64' || format === 'all') {
      result.base64 = base64;
    }

    if (format === 'blob' || format === 'all') {
      const blob = await canvasToBlob(circularCanvas, type, quality);
      result.blob = blob;
    }

    if (format === 'file' || format === 'all') {
      const blob = await canvasToBlob(circularCanvas, type, quality);
      const file = blobToFile(blob, fileName);
      result.file = file;
    }

    if (format === 'all') {
      if (!result.blob) {
        result.blob = dataURLtoBlob(base64);
      }
      if (!result.file) {
        const blob = result.blob || dataURLtoBlob(base64);
        result.file = blobToFile(blob, fileName);
      }
    }

    return result;
  } catch (error) {
    throw new Error(
      `Failed to create circular crop: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
