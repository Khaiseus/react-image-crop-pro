/**
 * Component tests for RotationControl
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RotationControl } from './RotationControl';

describe('RotationControl', () => {
  const defaultProps = {
    rotation: 0,
    rotationStep: 90,
    onRotationChange: vi.fn(),
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render rotation control with label', () => {
    render(<RotationControl {...defaultProps} label="Rotate Image" />);

    expect(screen.getByText('Rotate Image')).toBeInTheDocument();
  });

  it('should render with default label', () => {
    render(<RotationControl {...defaultProps} />);

    expect(screen.getByText('Rotation')).toBeInTheDocument();
  });

  it('should display current rotation value', () => {
    render(<RotationControl {...defaultProps} rotation={90} />);

    expect(screen.getByText('90°')).toBeInTheDocument();
  });

  it('should render rotate left button', () => {
    render(<RotationControl {...defaultProps} />);

    const rotateLeftButton = screen.getByRole('button', { name: 'Rotate left' });
    expect(rotateLeftButton).toBeInTheDocument();
    expect(rotateLeftButton).toHaveAttribute('title', 'Rotate left');
  });

  it('should render rotate right button', () => {
    render(<RotationControl {...defaultProps} />);

    const rotateRightButton = screen.getByRole('button', { name: 'Rotate right' });
    expect(rotateRightButton).toBeInTheDocument();
    expect(rotateRightButton).toHaveAttribute('title', 'Rotate right');
  });

  it('should render reset button', () => {
    render(<RotationControl {...defaultProps} />);

    const resetButton = screen.getByRole('button', { name: 'Reset rotation' });
    expect(resetButton).toBeInTheDocument();
    expect(resetButton).toHaveTextContent('Reset');
  });

  it('should call onRotationChange with decreased value when rotate left clicked', async () => {
    const user = userEvent.setup();
    render(<RotationControl {...defaultProps} rotation={90} />);

    const rotateLeftButton = screen.getByRole('button', { name: 'Rotate left' });
    await user.click(rotateLeftButton);

    expect(defaultProps.onRotationChange).toHaveBeenCalledWith(0);
  });

  it('should call onRotationChange with increased value when rotate right clicked', async () => {
    const user = userEvent.setup();
    render(<RotationControl {...defaultProps} rotation={0} />);

    const rotateRightButton = screen.getByRole('button', { name: 'Rotate right' });
    await user.click(rotateRightButton);

    expect(defaultProps.onRotationChange).toHaveBeenCalledWith(90);
  });

  it('should call onRotationChange with 0 when reset clicked', async () => {
    const user = userEvent.setup();
    render(<RotationControl {...defaultProps} rotation={180} />);

    const resetButton = screen.getByRole('button', { name: 'Reset rotation' });
    await user.click(resetButton);

    expect(defaultProps.onRotationChange).toHaveBeenCalledWith(0);
  });

  it('should handle negative rotations when rotating left', async () => {
    const user = userEvent.setup();
    render(<RotationControl {...defaultProps} rotation={0} />);

    const rotateLeftButton = screen.getByRole('button', { name: 'Rotate left' });
    await user.click(rotateLeftButton);

    expect(defaultProps.onRotationChange).toHaveBeenCalledWith(-90);
  });

  it('should handle rotation greater than 360 when rotating right', async () => {
    const user = userEvent.setup();
    render(<RotationControl {...defaultProps} rotation={270} />);

    const rotateRightButton = screen.getByRole('button', { name: 'Rotate right' });
    await user.click(rotateRightButton);

    expect(defaultProps.onRotationChange).toHaveBeenCalledWith(360);
  });

  it('should apply custom className', () => {
    const { container } = render(<RotationControl {...defaultProps} className="custom-rotation" />);

    const rotationControl = container.querySelector('.custom-rotation');
    expect(rotationControl).toBeInTheDocument();
  });

  it('should handle custom rotation steps', async () => {
    const user = userEvent.setup();
    render(<RotationControl {...defaultProps} rotation={0} rotationStep={45} />);

    const rotateRightButton = screen.getByRole('button', { name: 'Rotate right' });
    await user.click(rotateRightButton);

    expect(defaultProps.onRotationChange).toHaveBeenCalledWith(45);
  });

  it('should be keyboard accessible', async () => {
    const user = userEvent.setup();
    render(<RotationControl {...defaultProps} />);

    const rotateLeftButton = screen.getByRole('button', { name: 'Rotate left' });

    // Tab to the first button
    await user.tab();
    expect(rotateLeftButton).toHaveFocus();

    // Press Enter to click
    await user.keyboard('{Enter}');
    expect(defaultProps.onRotationChange).toHaveBeenCalled();
  });

  it('should have all buttons with type="button"', () => {
    render(<RotationControl {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  it('should display rotation with degree symbol', () => {
    render(<RotationControl {...defaultProps} rotation={45} />);

    expect(screen.getByText('45°')).toBeInTheDocument();
  });

  it('should render SVG icons for rotate buttons', () => {
    const { container } = render(<RotationControl {...defaultProps} />);

    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });
});
