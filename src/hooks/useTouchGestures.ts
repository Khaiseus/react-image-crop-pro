import { useCallback, useRef, useEffect } from 'react';

interface TouchPoint {
  x: number;
  y: number;
}

interface GestureState {
  initialDistance: number;
  initialAngle: number;
  initialZoom: number;
  initialRotation: number;
}

interface UseTouchGesturesProps {
  enabled?: boolean;
  enablePinchZoom?: boolean;
  enableTouchRotation?: boolean;
  minZoom?: number;
  maxZoom?: number;
  currentZoom: number;
  currentRotation: number;
  onZoomChange: (zoom: number) => void;
  onRotationChange: (rotation: number) => void;
  rotationSensitivity?: number;
}

export const useTouchGestures = ({
  enabled = true,
  enablePinchZoom = true,
  enableTouchRotation = true,
  minZoom = 1,
  maxZoom = 3,
  currentZoom,
  currentRotation,
  onZoomChange,
  onRotationChange,
  rotationSensitivity = 1,
}: UseTouchGesturesProps) => {
  const gestureStateRef = useRef<GestureState | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const currentZoomRef = useRef(currentZoom);
  const currentRotationRef = useRef(currentRotation);

  currentZoomRef.current = currentZoom;
  currentRotationRef.current = currentRotation;

  const getDistance = useCallback((touch1: TouchPoint, touch2: TouchPoint): number => {
    const dx = touch2.x - touch1.x;
    const dy = touch2.y - touch1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  const getAngle = useCallback((touch1: TouchPoint, touch2: TouchPoint): number => {
    const dx = touch2.x - touch1.x;
    const dy = touch2.y - touch1.y;
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  }, []);

  const getTouchPoints = useCallback((event: TouchEvent): [TouchPoint, TouchPoint] | null => {
    if (event.touches.length < 2) return null;

    return [
      { x: event.touches[0].clientX, y: event.touches[0].clientY },
      { x: event.touches[1].clientX, y: event.touches[1].clientY },
    ];
  }, []);

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      if (!enabled) return;

      if (event.touches.length !== 2) {
        return;
      }

      const touchPoints = getTouchPoints(event);
      if (!touchPoints) return;

      const [touch1, touch2] = touchPoints;
      const distance = getDistance(touch1, touch2);
      const angle = getAngle(touch1, touch2);

      gestureStateRef.current = {
        initialDistance: distance,
        initialAngle: angle,
        initialZoom: currentZoomRef.current,
        initialRotation: currentRotationRef.current,
      };

      event.preventDefault();
      event.stopPropagation();
    },
    [enabled, getTouchPoints, getDistance, getAngle]
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (!enabled) return;

      if (!gestureStateRef.current || event.touches.length !== 2) {
        return;
      }

      const touchPoints = getTouchPoints(event);
      if (!touchPoints) return;

      const [touch1, touch2] = touchPoints;
      const currentDistance = getDistance(touch1, touch2);
      const currentAngle = getAngle(touch1, touch2);

      const { initialDistance, initialAngle, initialZoom, initialRotation } = gestureStateRef.current;

      if (enablePinchZoom) {
        const scale = currentDistance / initialDistance;
        const newZoom = Math.min(maxZoom, Math.max(minZoom, initialZoom * scale));
        onZoomChange(newZoom);
      }

      if (enableTouchRotation) {
        let angleDiff = currentAngle - initialAngle;

        while (angleDiff > 180) angleDiff -= 360;
        while (angleDiff < -180) angleDiff += 360;

        const newRotation = initialRotation + angleDiff * rotationSensitivity;
        onRotationChange(newRotation);
      }

      event.preventDefault();
      event.stopPropagation();
    },
    [
      enabled,
      enablePinchZoom,
      enableTouchRotation,
      minZoom,
      maxZoom,
      onZoomChange,
      onRotationChange,
      getTouchPoints,
      getDistance,
      getAngle,
      rotationSensitivity,
    ]
  );

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (!enabled) return;

      if (event.touches.length < 2) {
        gestureStateRef.current = null;
      }
    },
    [enabled]
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !enabled) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: false, capture: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
    element.addEventListener('touchend', handleTouchEnd, { capture: true });
    element.addEventListener('touchcancel', handleTouchEnd, { capture: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart, true);
      element.removeEventListener('touchmove', handleTouchMove, true);
      element.removeEventListener('touchend', handleTouchEnd, true);
      element.removeEventListener('touchcancel', handleTouchEnd, true);
    };
  }, [enabled, handleTouchStart, handleTouchMove, handleTouchEnd]);

  const attachRef = useCallback((node: HTMLDivElement | null) => {
    elementRef.current = node;
  }, []);

  return { attachRef };
};
