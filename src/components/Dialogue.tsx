'use client';

import { useEffect, useState } from 'react';
import { useTypewriter } from '@/game/useTypewriter';
import { AvatarSprite } from './AvatarSprite';

interface AlexDialogueProps {
  text: string;
  charDelayMs?: number;
  /** Called once the typewriter completes. */
  onDone?: () => void;
  attribution?: string;
}

/**
 * Alex (the boss) typewriter speech bubble — used in 2025/2026/2027 contexts.
 * Mirrors original startAlexDialogue (HTML 3493) and 2026/proworker variants.
 */
export function AlexDialogue({
  text,
  charDelayMs = 16,
  onDone,
  attribution = 'ALEX · VP',
}: AlexDialogueProps) {
  const { visible, done } = useTypewriter(text, charDelayMs);

  useEffect(() => {
    if (done) onDone?.();
  }, [done, onDone]);

  return (
    <div className="dialogue-scene">
      <div className="alex-stage">
        <div className="alex-frame">
          <AvatarSprite id="bossAlex" viewBox="0 0 16 16" />
        </div>
        <div className="alex-nametag">
          ALEX<span className="role">· VP</span>
        </div>
      </div>
      <div className="speech-stack">
        <div className={`speech-bubble ${done ? '' : 'typing'}`} role="status" aria-live="polite">
          <span className="speech-attrib-mini">{attribution}</span>
          <span className="speech-text">{visible}</span>
        </div>
      </div>
    </div>
  );
}

interface ContinueLockProps {
  /** When false, button is faded + non-interactive. */
  unlocked: boolean;
  onClick: () => void;
  children?: React.ReactNode;
  color?: 'terracotta' | 'forest' | 'teal';
}

export function LockedContinueBtn({
  unlocked,
  onClick,
  children = '→ YOUR CALL',
  color = 'terracotta',
}: ContinueLockProps) {
  const colorClass =
    color === 'forest' ? 'btn-forest' : color === 'teal' ? 'btn-teal' : 'btn-terracotta';
  return (
    <button
      type="button"
      className={`btn ${colorClass} continue-btn ${unlocked ? '' : 'locked'}`}
      onClick={onClick}
      disabled={!unlocked}
      aria-disabled={!unlocked}
    >
      {children}
    </button>
  );
}

/** A speech bubble with optional lock-on-typewriter behavior, generic version. */
export function TypewriterBubble({
  text,
  attribution,
  charDelayMs = 18,
  onDone,
  attribClass = '',
}: {
  text: string;
  attribution?: string;
  charDelayMs?: number;
  onDone?: () => void;
  attribClass?: string;
}) {
  const { visible, done } = useTypewriter(text, charDelayMs);
  const [didFire, setDidFire] = useState(false);
  useEffect(() => {
    if (done && !didFire) {
      setDidFire(true);
      onDone?.();
    }
  }, [done, didFire, onDone]);
  return (
    <div className={`speech-bubble ${done ? '' : 'typing'}`} role="status" aria-live="polite">
      {attribution ? (
        <span className={`speech-attrib-mini ${attribClass}`}>{attribution}</span>
      ) : null}
      <span className="speech-text">{visible}</span>
    </div>
  );
}
