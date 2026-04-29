'use client';

import { useEffect, useState } from 'react';

const PUNCTUATION_PAUSE_MS = 140;

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

/**
 * Char-by-char typewriter that mirrors the original `typeText` (HTML lines 3516-3532).
 * Returns the current visible substring + a `done` flag.
 * Honors prefers-reduced-motion: reveals the entire text instantly.
 */
export function useTypewriter(text: string, charDelayMs = 16): { visible: string; done: boolean } {
  const [visible, setVisible] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setVisible('');
    setDone(false);

    if (!text) {
      setDone(true);
      return;
    }

    if (prefersReducedMotion()) {
      setVisible(text);
      setDone(true);
      return;
    }

    let i = 0;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const tick = () => {
      if (cancelled) return;
      if (i >= text.length) {
        setDone(true);
        return;
      }
      const next = text.slice(0, i + 1);
      setVisible(next);
      const ch = text[i];
      const extra =
        ch === '.' || ch === ',' || ch === '!' || ch === '?' || ch === '…' ? PUNCTUATION_PAUSE_MS : 0;
      i += 1;
      timer = setTimeout(tick, charDelayMs + extra);
    };

    tick();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [text, charDelayMs]);

  return { visible, done };
}
