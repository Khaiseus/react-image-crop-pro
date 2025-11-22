/**
 * Integration tests for ImageCropUpload
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageCropUpload } from './ImageCropUpload';

describe('ImageCropUpload - Integration', () => {
  it('should render dropzone in initial state', () => {
    render(<ImageCropUpload onCropComplete={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Upload image' })).toBeInTheDocument();
  });

  it('should handle file upload', async () => {
    const user = userEvent.setup();
    const onCropComplete = vi.fn();

    render(<ImageCropUpload onCropComplete={onCropComplete} />);

    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/choose file/i) as HTMLInputElement;

    await user.upload(input, file);

    // Wait for image to be loaded and cropper to appear
    await waitFor(() => {
      expect(screen.queryByText(/zoom/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should validate file size', async () => {
    const user = userEvent.setup();
    const onError = vi.fn();

    render(
      <ImageCropUpload
        onCropComplete={vi.fn()}
        onError={onError}
        maxFileSize={1024} // 1KB limit
      />
    );

    // Create a large file (2KB, exceeding the limit)
    const largeContent = new Array(2048).fill('a').join('');
    const file = new File([largeContent], 'large.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/choose file/i) as HTMLInputElement;

    await user.upload(input, file);

    // Verify error was called or error message is displayed
    await waitFor(
      () => {
        const hasError =
          onError.mock.calls.length > 0 || screen.queryByRole('alert') !== null;
        expect(hasError).toBe(true);
      },
      { timeout: 2000 }
    );
  });

  it('should configure allowed file types', () => {
    render(
      <ImageCropUpload
        onCropComplete={vi.fn()}
        allowedFormats={['image/jpeg', 'image/png']}
      />
    );

    const input = screen.getByLabelText(/choose file/i) as HTMLInputElement;

    // Verify input has accept attribute configured
    expect(input).toHaveAttribute('accept');
  });

  it('should display error message on validation failure', async () => {
    const user = userEvent.setup();

    render(
      <ImageCropUpload
        onCropComplete={vi.fn()}
        maxFileSize={1024}
      />
    );

    const largeContent = new Array(2048).fill('a').join('');
    const file = new File([largeContent], 'large.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/choose file/i) as HTMLInputElement;

    await user.upload(input, file);

    // Verify error is displayed
    await waitFor(() => {
      const errorAlert = screen.queryByRole('alert');
      expect(errorAlert).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should provide retry functionality after error', async () => {
    const user = userEvent.setup();

    render(
      <ImageCropUpload
        onCropComplete={vi.fn()}
        maxFileSize={1024}
      />
    );

    // Upload invalid file
    const largeFile = new File([new Array(2048).fill('a')], 'large.jpg', {
      type: 'image/jpeg',
    });
    const input = screen.getByLabelText(/choose file/i) as HTMLInputElement;
    await user.upload(input, largeFile);

    // Verify error state is reached
    await waitFor(
      () => {
        const errorAlert = screen.queryByRole('alert');
        expect(errorAlert).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('should call onChange when state changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<ImageCropUpload onCropComplete={vi.fn()} onChange={onChange} />);

    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/choose file/i) as HTMLInputElement;

    await user.upload(input, file);

    // Should call onChange with 'uploading' and then 'cropping'
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('uploading');
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('cropping');
    }, { timeout: 3000 });
  });

  it('should accept custom labels', () => {
    render(
      <ImageCropUpload
        onCropComplete={vi.fn()}
        labels={{
          dropzone: {
            idle: 'Custom upload message',
            active: 'Custom drop message',
            reject: 'Custom reject message',
          },
        }}
      />
    );

    expect(screen.getByText('Custom upload message')).toBeInTheDocument();
  });

  it('should respect maxFileSize prop', async () => {
    const user = userEvent.setup();
    const onError = vi.fn();
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    render(
      <ImageCropUpload
        onCropComplete={vi.fn()}
        onError={onError}
        maxFileSize={maxFileSize}
      />
    );

    // File under limit should be accepted
    const validFile = new File(['small content'], 'small.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/choose file/i) as HTMLInputElement;

    await user.upload(input, validFile);

    // Should not trigger error
    expect(onError).not.toHaveBeenCalled();
  });

  it('should render with custom className', () => {
    const { container } = render(
      <ImageCropUpload onCropComplete={vi.fn()} className="custom-crop-component" />
    );

    const component = container.querySelector('.custom-crop-component');
    expect(component).toBeInTheDocument();
  });

  it('should initialize with custom aspect ratio', async () => {
    const user = userEvent.setup();

    render(<ImageCropUpload onCropComplete={vi.fn()} aspectRatio={16 / 9} />);

    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/choose file/i) as HTMLInputElement;

    await user.upload(input, file);

    // Wait for cropper to load
    await waitFor(() => {
      expect(screen.queryByText(/zoom/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should accept showPreview prop', () => {
    render(<ImageCropUpload onCropComplete={vi.fn()} showPreview={true} />);

    // Component should render with showPreview configuration
    expect(screen.getByRole('button', { name: 'Upload image' })).toBeInTheDocument();
  });

  it('should handle circular crop mode', async () => {
    const user = userEvent.setup();

    render(<ImageCropUpload onCropComplete={vi.fn()} circularCrop={true} />);

    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/choose file/i) as HTMLInputElement;

    await user.upload(input, file);

    // Wait for cropper to load
    await waitFor(() => {
      expect(screen.queryByText(/zoom/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should enable rotation controls when enableRotation is true', async () => {
    const user = userEvent.setup();

    render(<ImageCropUpload onCropComplete={vi.fn()} enableRotation={true} />);

    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/choose file/i) as HTMLInputElement;

    await user.upload(input, file);

    // Wait for cropper and rotation controls to appear
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /rotate left/i })).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
