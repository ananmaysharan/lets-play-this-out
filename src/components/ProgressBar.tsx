'use client';

import { useGame } from '@/game/GameProvider';
import { GAME_LENGTH } from '@/game/types';

export function ProgressBar() {
  const { state } = useGame();
  const pct = Math.round((state.pagesSeen / GAME_LENGTH) * 100);
  return (
    <div className="progress-shell" aria-hidden>
      <div className="progress-fill" style={{ width: `${Math.min(100, pct)}%` }} />
    </div>
  );
}
