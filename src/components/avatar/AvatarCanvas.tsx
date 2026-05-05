'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import {
  type AvatarConfig,
  type Grid,
  buildAvatarGrid,
  renderGridToCanvas,
  SIZE,
} from './avatarRender';

interface Props {
  config: AvatarConfig;
  /** Rendered canvas pixel size (square). Default 768. */
  size?: number;
  /** Background fill behind transparent avatar pixels. Default --paper-dim. */
  background?: string;
  className?: string;
  style?: CSSProperties;
}

export function AvatarCanvas({ config, size = 768, background = '#EDE4CC', className, style }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const grid = buildAvatarGrid(config);
    renderGridToCanvas(canvas, grid, background);
  }, [config, background]);

  return (
    <canvas
      ref={ref}
      width={size}
      height={size}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        imageRendering: 'pixelated',
        ...style,
      }}
    />
  );
}

interface SwatchProps {
  buildGrid: () => Grid;
  background?: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/** Compact canvas for swatch tiles. Re-renders only when buildGrid identity changes. */
export function AvatarSwatchCanvas({
  buildGrid,
  background = '#EDE4CC',
  size = 96,
  className,
  style,
}: SwatchProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const grid = buildGrid();
    renderGridToCanvas(canvas, grid, background);
  }, [buildGrid, background]);

  return (
    <canvas
      ref={ref}
      width={size}
      height={size}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        imageRendering: 'pixelated',
        ...style,
      }}
    />
  );
}

export { SIZE };
