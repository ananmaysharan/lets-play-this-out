'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { type CSSProperties, type ReactNode } from 'react';
import { PixelLogo } from './PixelLogo';

const EXIT_MS = 220;

interface Props {
  year: number;
  /** Pixel pattern (8x8) for the icon block. */
  pattern: ReadonlyArray<ReadonlyArray<0 | 1>>;
  /** Title text inside the notification card. */
  title?: string;
  time?: string;
  /** Body — JSX so callers can include <strong>. */
  body: ReactNode;
  onDismiss: () => void;
  /** Optional inline overrides for forest/mustard variants. */
  takeoverStyle?: CSSProperties;
  yearStyle?: CSSProperties;
}

export function NewsTakeover({
  year,
  pattern,
  title = 'Breaking News',
  time = 'now',
  body,
  onDismiss,
  takeoverStyle,
  yearStyle,
}: Props) {
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleDismiss = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    window.setTimeout(onDismiss, EXIT_MS);
  }, [exiting, onDismiss]);

  useEffect(() => {
    setMounted(true);
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') handleDismiss();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleDismiss]);

  if (!mounted || typeof document === 'undefined') return null;

  // Portal to <body> so the fixed-position overlay isn't trapped by any
  // ancestor with `transform` (e.g. .page during its fadeIn animation).
  return createPortal(
    <div
      className={`news-takeover ${exiting ? 'is-exiting' : ''}`}
      style={takeoverStyle}
      role="dialog"
      aria-modal="true"
      aria-label={`Breaking news for ${year}`}
    >
      <div className="takeover-year" style={yearStyle}>
        {year}
      </div>
      <div className="takeover-notif">
        <PixelLogo pattern={pattern} gridClass="takeover-icon" />
        <div className="takeover-notif-body">
          <div className="top-row">
            <div className="t-title">{title}</div>
            <div className="t-time">{time}</div>
          </div>
          <div className="t-copy">{body}</div>
        </div>
      </div>
      <button
        type="button"
        className="takeover-dismiss"
        onClick={handleDismiss}
        disabled={exiting}
        aria-disabled={exiting}
        autoFocus
      >
        DISMISS
      </button>
    </div>,
    document.body
  );
}
