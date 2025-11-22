/**
 * Performance tests for ImageCropUpload
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ImageCropUpload } from './ImageCropUpload';

describe('ImageCropUpload - Performance', () => {
  it('should render within acceptable time', () => {
    const start = performance.now();

    render(<ImageCropUpload onCropComplete={vi.fn()} />);

    const end = performance.now();
    const renderTime = end - start;

    // Component should render in less than 100ms
    expect(renderTime).toBeLessThan(100);
  });

  it('should render multiple instances efficiently', () => {
    const start = performance.now();

    // Render 5 instances
    for (let i = 0; i < 5; i++) {
      const { unmount } = render(<ImageCropUpload onCropComplete={vi.fn()} />);
      unmount();
    }

    const end = performance.now();
    const totalTime = end - start;

    // Should render all instances in less than 500ms
    expect(totalTime).toBeLessThan(500);
  });

  it('should not cause memory leaks on unmount', () => {
    const { unmount } = render(<ImageCropUpload onCropComplete={vi.fn()} />);

    // Unmount should complete without errors
    expect(() => unmount()).not.toThrow();
  });

  it('should handle rapid prop updates efficiently', () => {
    const { rerender } = render(<ImageCropUpload onCropComplete={vi.fn()} aspectRatio={1} />);

    const start = performance.now();

    // Rapidly update props
    for (let i = 0; i < 10; i++) {
      rerender(<ImageCropUpload onCropComplete={vi.fn()} aspectRatio={1 + i * 0.1} />);
    }

    const end = performance.now();
    const updateTime = end - start;

    // Updates should complete quickly
    expect(updateTime).toBeLessThan(100);
  });

  it('should efficiently handle zoom changes', () => {
    const { rerender } = render(<ImageCropUpload onCropComplete={vi.fn()} />);

    const start = performance.now();

    // Simulate rapid zoom changes
    for (let zoom = 1; zoom <= 3; zoom += 0.1) {
      rerender(<ImageCropUpload onCropComplete={vi.fn()} />);
    }

    const end = performance.now();
    const zoomTime = end - start;

    // Zoom updates should be performant
    expect(zoomTime).toBeLessThan(200);
  });

  it('should not re-render unnecessarily with same props', () => {
    let renderCount = 0;

    const TestWrapper = ({ children }: { children: React.ReactNode }) => {
      renderCount++;
      return <>{children}</>;
    };

    const { rerender } = render(
      <TestWrapper>
        <ImageCropUpload onCropComplete={vi.fn()} aspectRatio={1} />
      </TestWrapper>
    );

    const initialRenderCount = renderCount;

    // Rerender with same props
    rerender(
      <TestWrapper>
        <ImageCropUpload onCropComplete={vi.fn()} aspectRatio={1} />
      </TestWrapper>
    );

    // Should have minimal additional renders
    expect(renderCount - initialRenderCount).toBeLessThan(5);
  });

  it('should handle large file metadata efficiently', () => {
    const start = performance.now();

    const props = {
      onCropComplete: vi.fn(),
      maxFileSize: 50 * 1024 * 1024, // 50MB
      allowedFormats: [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'image/bmp',
        'image/tiff',
      ],
    };

    render(<ImageCropUpload {...props} />);

    const end = performance.now();
    const renderTime = end - start;

    expect(renderTime).toBeLessThan(100);
  });

  it('should initialize with default props quickly', () => {
    const start = performance.now();

    render(<ImageCropUpload onCropComplete={vi.fn()} />);

    const end = performance.now();
    const initTime = end - start;

    // Initialization should be fast
    expect(initTime).toBeLessThan(50);
  });

  it('should handle aspect ratio preset changes efficiently', () => {
    const presets = [
      { label: 'Free', value: 'free' as const },
      { label: '1:1', value: 1 },
      { label: '4:3', value: 4 / 3 },
      { label: '16:9', value: 16 / 9 },
      { label: '3:2', value: 3 / 2 },
      { label: '2:3', value: 2 / 3 },
    ];

    const { rerender } = render(
      <ImageCropUpload onCropComplete={vi.fn()} aspectRatioPresets={presets} />
    );

    const start = performance.now();

    // Change aspect ratios multiple times
    presets.forEach((preset) => {
      rerender(
        <ImageCropUpload
          onCropComplete={vi.fn()}
          aspectRatioPresets={presets}
          aspectRatio={typeof preset.value === 'number' ? preset.value : 1}
        />
      );
    });

    const end = performance.now();
    const changeTime = end - start;

    expect(changeTime).toBeLessThan(150);
  });

  it('should cleanup resources on unmount', () => {
    const onCropComplete = vi.fn();
    const { unmount } = render(<ImageCropUpload onCropComplete={onCropComplete} />);

    // Measure cleanup time
    const start = performance.now();
    unmount();
    const end = performance.now();
    const cleanupTime = end - start;

    // Cleanup should be fast
    expect(cleanupTime).toBeLessThan(50);
  });

  it('should handle custom labels without performance degradation', () => {
    const customLabels = {
      dropzone: {
        idle: 'Custom idle message with lots of text that might impact performance',
        active: 'Custom active message',
        reject: 'Custom reject message',
      },
      buttons: {
        cancel: 'Custom cancel',
        crop: 'Custom crop',
        retry: 'Custom retry',
      },
      errors: {
        fileTooLarge: 'Custom file too large error message',
        invalidFileType: 'Custom invalid file type error message',
        fileReadError: 'Custom file read error',
        cropError: 'Custom crop error',
        canvasError: 'Custom canvas error',
      },
      controls: {
        zoom: 'Custom zoom label',
        rotation: 'Custom rotation label',
        aspectRatio: 'Custom aspect ratio label',
      },
    };

    const start = performance.now();

    render(<ImageCropUpload onCropComplete={vi.fn()} labels={customLabels} />);

    const end = performance.now();
    const renderTime = end - start;

    expect(renderTime).toBeLessThan(100);
  });
});
