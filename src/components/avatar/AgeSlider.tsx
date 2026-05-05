'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  ariaLabel?: string;
}

/** Pixel-style slider with paper track, ink border, and a chunky terracotta thumb.
 *  Built from divs + pointer events to match the project's drop-shadow aesthetic. */
export function AgeSlider({ value, min, max, onChange, ariaLabel = 'Age' }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const pct = ((value - min) / (max - min)) * 100;

  const setFromClientX = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const next = Math.round(min + ratio * (max - min));
      if (next !== value) onChange(next);
    },
    [min, max, value, onChange]
  );

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => setFromClientX(e.clientX);
    const up = () => setDragging(false);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, [dragging, setFromClientX]);

  return (
    <div
      ref={trackRef}
      className="age-slider"
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      tabIndex={0}
      onPointerDown={(e) => {
        (e.target as Element).setPointerCapture?.(e.pointerId);
        setDragging(true);
        setFromClientX(e.clientX);
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          e.preventDefault();
          onChange(Math.max(min, value - 1));
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          e.preventDefault();
          onChange(Math.min(max, value + 1));
        } else if (e.key === 'Home') {
          e.preventDefault();
          onChange(min);
        } else if (e.key === 'End') {
          e.preventDefault();
          onChange(max);
        }
      }}
    >
      <div className="age-slider-track" />
      <div className="age-slider-fill" style={{ width: `${pct}%` }} />
      <div
        className="age-slider-thumb"
        style={{ left: `calc(${pct}% )` }}
        aria-hidden="true"
      />
    </div>
  );
}
