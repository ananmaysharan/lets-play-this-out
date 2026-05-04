'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Piece {
  /** % from left edge of viewport for the cannon origin (around center). */
  left: number;
  hue: string;
  width: number;
  height: number;
  delay: number;
  duration: number;
  rotateStart: number;
  spin: number;
  /** Horizontal drift in px by the time it lands. */
  drift: number;
  /** Peak height reached (negative vh, e.g. -85). */
  peakVh: number;
}

const COLORS = [
  'var(--terracotta)',
  'var(--mustard)',
  'var(--teal)',
  'var(--forest)',
  'var(--orange)',
  'var(--paper)',
];

function makePieces(count: number): Piece[] {
  const out: Piece[] = [];
  for (let i = 0; i < count; i++) {
    // Cannon origin: clustered around horizontal center (35%–65%).
    const left = 35 + Math.random() * 30;
    // Drift biases away from center — left-side particles drift left, right-side drift right.
    const baseDrift = (left - 50) * 12; // px per percent off-center
    const drift = baseDrift + (-220 + Math.random() * 440);
    out.push({
      left,
      hue: COLORS[Math.floor(Math.random() * COLORS.length)],
      width: 8 + Math.random() * 8,
      height: 4 + Math.random() * 6,
      delay: Math.random() * 0.35,
      duration: 2.6 + Math.random() * 1.6,
      rotateStart: Math.random() * 360,
      spin: 540 + Math.random() * 720,
      drift,
      peakVh: -(60 + Math.random() * 45), // -60vh to -105vh
    });
  }
  return out;
}

interface ConfettiProps {
  /** Number of particles. Default 120. */
  count?: number;
  /** Auto-unmount after this many ms (so it cleans up after the burst). */
  durationMs?: number;
}

/**
 * CSS-keyframe confetti cannon. Particles launch from the bottom-center of
 * the viewport, arc upward, and fall back down. Position-fixed full-screen,
 * pointer-events: none, auto-unmounts after `durationMs`.
 */
export function Confetti({ count = 120, durationMs = 5000 }: ConfettiProps) {
  const [pieces, setPieces] = useState<Piece[] | null>(null);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPieces(makePieces(count));
    const t = setTimeout(() => setVisible(false), durationMs);
    return () => clearTimeout(t);
  }, [count, durationMs]);

  if (!mounted || !pieces || !visible) return null;
  if (typeof document === 'undefined') return null;

  const overlay = (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 9000,
      }}
    >
      {pieces.map((p, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            bottom: -20,
            left: `${p.left}%`,
            width: p.width,
            height: p.height,
            background: p.hue,
            border: '1px solid var(--ink)',
            animation: `confetti-cannon ${p.duration}s linear ${p.delay}s forwards`,
            ['--cf-rot-start' as string]: `${p.rotateStart}deg`,
            ['--cf-spin' as string]: `${p.spin}deg`,
            ['--cf-drift' as string]: `${p.drift}px`,
            ['--cf-peak' as string]: `${p.peakVh}vh`,
          }}
        />
      ))}
    </div>
  );

  // Portal to <body> so the fixed overlay escapes any transformed ancestor
  // (e.g. `.page` with its fadeIn transform creates a containing block).
  return createPortal(overlay, document.body);
}
