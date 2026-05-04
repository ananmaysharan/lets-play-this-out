'use client';

import { useState, type CSSProperties, type ReactNode } from 'react';
import { NewsTakeover } from './NewsTakeover';

interface Props {
  year: number;
  pattern: ReadonlyArray<ReadonlyArray<0 | 1>>;
  title?: string;
  time?: string;
  body: ReactNode;
  takeoverStyle?: CSSProperties;
  yearStyle?: CSSProperties;
  children: ReactNode;
}

/**
 * Wraps a scene with a full-screen NewsTakeover that appears on mount and is
 * dismissed by the user. The takeover is rendered via portal (overlays page).
 *
 * Children render only AFTER the takeover is dismissed, so any mount-time
 * effects in the underlying scene (confetti bursts, typewriters, autoplay
 * animations) fire when the player actually sees them — not while the news
 * overlay is still up.
 */
export function SceneNewsIntro({ children, ...takeoverProps }: Props) {
  const [show, setShow] = useState(true);
  return show ? (
    <NewsTakeover {...takeoverProps} onDismiss={() => setShow(false)} />
  ) : (
    <>{children}</>
  );
}
