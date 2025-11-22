export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to convert canvas to blob'));
        }
      },
      type,
      quality
    );
  });
}

export function blobToFile(blob: Blob, fileName: string): File {
  return new File([blob], fileName, { type: blob.type });
}

export function applyCircularMask(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const size = Math.min(canvas.width, canvas.height);
  const circularCanvas = document.createElement('canvas');
  circularCanvas.width = size;
  circularCanvas.height = size;

  const ctx = circularCanvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  const offsetX = (size - canvas.width) / 2;
  const offsetY = (size - canvas.height) / 2;
  ctx.drawImage(canvas, offsetX, offsetY);

  return circularCanvas;
}

export function calculateFitDimensions(
  width: number,
  height: number,
  maxWidth?: number,
  maxHeight?: number
): { width: number; height: number } {
  let newWidth = width;
  let newHeight = height;

  if (maxWidth && newWidth > maxWidth) {
    newHeight = (newHeight * maxWidth) / newWidth;
    newWidth = maxWidth;
  }

  if (maxHeight && newHeight > maxHeight) {
    newWidth = (newWidth * maxHeight) / newHeight;
    newHeight = maxHeight;
  }

  return { width: newWidth, height: newHeight };
}
