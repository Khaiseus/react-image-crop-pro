export function validateZoom(zoom: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, zoom));
}

export function validateRotation(rotation: number): number {
  return ((rotation % 360) + 360) % 360;
}

export function validateAspectRatio(aspectRatio: number): number {
  if (aspectRatio <= 0 || !isFinite(aspectRatio)) {
    return 1;
  }
  return aspectRatio;
}

export function validateQuality(quality: number): number {
  return Math.max(0, Math.min(1, quality));
}

export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && isFinite(value) && !isNaN(value);
}
