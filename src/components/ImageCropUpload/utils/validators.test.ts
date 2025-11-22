/**
 * Unit tests for validators
 */

import { describe, it, expect } from 'vitest';
import {
  validateZoom,
  validateRotation,
  validateAspectRatio,
  validateQuality,
  isValidNumber,
} from './validators';

describe('validateZoom', () => {
  it('should return the zoom value if within bounds', () => {
    expect(validateZoom(1.5, 1, 3)).toBe(1.5);
    expect(validateZoom(2.0, 1, 3)).toBe(2.0);
  });

  it('should clamp zoom to minimum value', () => {
    expect(validateZoom(0.5, 1, 3)).toBe(1);
    expect(validateZoom(-1, 1, 3)).toBe(1);
  });

  it('should clamp zoom to maximum value', () => {
    expect(validateZoom(4, 1, 3)).toBe(3);
    expect(validateZoom(10, 1, 3)).toBe(3);
  });

  it('should handle edge cases', () => {
    expect(validateZoom(1, 1, 3)).toBe(1);
    expect(validateZoom(3, 1, 3)).toBe(3);
  });
});

describe('validateRotation', () => {
  it('should return rotation value for valid range (0-360)', () => {
    expect(validateRotation(0)).toBe(0);
    expect(validateRotation(90)).toBe(90);
    expect(validateRotation(180)).toBe(180);
    expect(validateRotation(270)).toBe(270);
    expect(validateRotation(359)).toBe(359);
  });

  it('should normalize rotation greater than 360', () => {
    expect(validateRotation(360)).toBe(0);
    expect(validateRotation(450)).toBe(90);
    expect(validateRotation(720)).toBe(0);
  });

  it('should normalize negative rotation', () => {
    expect(validateRotation(-90)).toBe(270);
    expect(validateRotation(-180)).toBe(180);
    expect(validateRotation(-270)).toBe(90);
    expect(validateRotation(-360)).toBe(0);
  });

  it('should handle large rotations', () => {
    expect(validateRotation(1000)).toBe(280);
    expect(validateRotation(-1000)).toBe(80);
  });
});

describe('validateAspectRatio', () => {
  it('should return valid aspect ratio', () => {
    expect(validateAspectRatio(1)).toBe(1);
    expect(validateAspectRatio(16 / 9)).toBe(16 / 9);
    expect(validateAspectRatio(4 / 3)).toBe(4 / 3);
  });

  it('should return 1 for zero or negative aspect ratio', () => {
    expect(validateAspectRatio(0)).toBe(1);
    expect(validateAspectRatio(-1)).toBe(1);
  });

  it('should return 1 for Infinity', () => {
    expect(validateAspectRatio(Infinity)).toBe(1);
    expect(validateAspectRatio(-Infinity)).toBe(1);
  });

  it('should return 1 for NaN', () => {
    expect(validateAspectRatio(NaN)).toBe(1);
  });
});

describe('validateQuality', () => {
  it('should return quality if within bounds (0-1)', () => {
    expect(validateQuality(0.5)).toBe(0.5);
    expect(validateQuality(0.8)).toBe(0.8);
  });

  it('should clamp quality to 0', () => {
    expect(validateQuality(-0.5)).toBe(0);
    expect(validateQuality(-1)).toBe(0);
  });

  it('should clamp quality to 1', () => {
    expect(validateQuality(1.5)).toBe(1);
    expect(validateQuality(2)).toBe(1);
  });

  it('should handle edge cases', () => {
    expect(validateQuality(0)).toBe(0);
    expect(validateQuality(1)).toBe(1);
  });
});

describe('isValidNumber', () => {
  it('should return true for valid numbers', () => {
    expect(isValidNumber(0)).toBe(true);
    expect(isValidNumber(1)).toBe(true);
    expect(isValidNumber(-1)).toBe(true);
    expect(isValidNumber(3.14)).toBe(true);
  });

  it('should return false for NaN', () => {
    expect(isValidNumber(NaN)).toBe(false);
  });

  it('should return false for Infinity', () => {
    expect(isValidNumber(Infinity)).toBe(false);
    expect(isValidNumber(-Infinity)).toBe(false);
  });

  it('should return false for non-numbers', () => {
    expect(isValidNumber('123')).toBe(false);
    expect(isValidNumber(null)).toBe(false);
    expect(isValidNumber(undefined)).toBe(false);
    expect(isValidNumber({})).toBe(false);
    expect(isValidNumber([])).toBe(false);
    expect(isValidNumber(true)).toBe(false);
  });
});
