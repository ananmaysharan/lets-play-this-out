'use client';

import type { CSSProperties } from 'react';
import { useGame } from '@/game/GameProvider';

const STACK_OFFSET_PX = 56;

/**
 * Renders the notification stack (top-right corner).
 * Each notification animates in/out via CSS keyframes (popIn / popOut)
 * and stacks vertically using --notif-i for offset.
 */
export function Notifications() {
  const { notifications } = useGame();
  return (
    <>
      {notifications.map((n, i) => (
        <div
          key={n.id}
          className="notification-pop"
          style={{ '--notif-i': i, top: `calc(20px + ${i} * ${STACK_OFFSET_PX}px)` } as CSSProperties}
          role="status"
          aria-live="polite"
        >
          {`▸ ${n.text}`}
        </div>
      ))}
    </>
  );
}
