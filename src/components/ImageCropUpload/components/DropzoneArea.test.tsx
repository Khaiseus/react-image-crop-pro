/**
 * Component tests for DropzoneArea
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DropzoneArea } from './DropzoneArea';

describe('DropzoneArea', () => {
  const defaultProps = {
    onFileSelected: vi.fn(),
    onError: vi.fn(),
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFormats: ['image/jpeg', 'image/png'],
    labels: {
      idle: 'Drop or click to upload',
      active: 'Drop here',
      reject: 'Invalid file type',
    },
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render dropzone with idle label', () => {
    render(<DropzoneArea {...defaultProps} />);

    expect(screen.getByText('Drop or click to upload')).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(<DropzoneArea {...defaultProps} />);

    const dropzone = screen.getByRole('button');
    expect(dropzone).toHaveAttribute('aria-label', 'Upload image');
    expect(dropzone).toHaveAttribute('tabIndex', '0');
  });

  it('should have file input with correct attributes', () => {
    render(<DropzoneArea {...defaultProps} />);

    const input = screen.getByLabelText('Choose file');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'file');
  });

  it('should handle file selection', async () => {
    const user = userEvent.setup();
    render(<DropzoneArea {...defaultProps} />);

    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText('Choose file') as HTMLInputElement;

    await user.upload(input, file);

    expect(defaultProps.onFileSelected).toHaveBeenCalledWith(file);
  });

  it('should call onError for oversized files', async () => {
    const user = userEvent.setup();
    render(<DropzoneArea {...defaultProps} />);

    // Create a large file (6MB, exceeding the 5MB limit)
    const largeContent = new Array(6 * 1024 * 1024).fill('a').join('');
    const file = new File([largeContent], 'large.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText('Choose file') as HTMLInputElement;

    await user.upload(input, file);

    expect(defaultProps.onError).toHaveBeenCalled();
    const errorMessage = defaultProps.onError.mock.calls[0][0];
    expect(errorMessage).toContain('5MB');
  });

  it('should configure file type restrictions', () => {
    render(<DropzoneArea {...defaultProps} />);

    const input = screen.getByLabelText('Choose file') as HTMLInputElement;

    // Verify that the input has accept attribute configured
    expect(input).toHaveAttribute('accept');
  });

  it('should be keyboard navigable', async () => {
    const user = userEvent.setup();
    render(<DropzoneArea {...defaultProps} />);

    const dropzone = screen.getByRole('button');

    await user.tab();

    expect(dropzone).toHaveFocus();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<DropzoneArea {...defaultProps} disabled={true} />);

    const dropzone = screen.getByRole('button');
    expect(dropzone).toHaveAttribute('aria-disabled', 'true');
    expect(dropzone).toHaveAttribute('tabIndex', '-1');
  });

  it('should apply custom className', () => {
    const { container } = render(<DropzoneArea {...defaultProps} className="custom-class" />);

    const dropzone = container.querySelector('.custom-class');
    expect(dropzone).toBeInTheDocument();
  });

  it('should only accept one file', async () => {
    const user = userEvent.setup();
    render(<DropzoneArea {...defaultProps} />);

    const files = [
      new File(['content1'], 'test1.jpg', { type: 'image/jpeg' }),
      new File(['content2'], 'test2.jpg', { type: 'image/jpeg' }),
    ];
    const input = screen.getByLabelText('Choose file') as HTMLInputElement;

    await user.upload(input, files);

    // Only the first file should be selected
    expect(defaultProps.onFileSelected).toHaveBeenCalledTimes(1);
    expect(defaultProps.onFileSelected).toHaveBeenCalledWith(files[0]);
  });

  it('should display icon', () => {
    const { container } = render(<DropzoneArea {...defaultProps} />);

    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
