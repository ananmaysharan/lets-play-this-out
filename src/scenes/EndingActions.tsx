'use client';

import posthog from 'posthog-js';
import { useGame } from '@/game/GameProvider';
import { Btn } from '@/components/Btn';

export function EndingActions() {
  const { go, reset } = useGame();
  return (
    <div className="ending-actions">
      <Btn color="terracotta" onClick={() => { posthog.capture('game_replayed'); reset(); }}>
        ↻ PLAY AGAIN
      </Btn>
      <Btn color="teal" onClick={() => { posthog.capture('futures_explored'); go('futures'); }}>
        ↔ EXPLORE OTHER FUTURES
      </Btn>
      <Btn color="forest" onClick={() => { posthog.capture('policies_explored'); go('policies'); }}>
        ◆ EXPLORE POLICIES
      </Btn>
    </div>
  );
}

export function ProworkerHeroActions() {
  const { go, reset } = useGame();
  return (
    <div className="ending-hero-actions">
      <Btn color="terracotta" onClick={() => { posthog.capture('game_replayed'); reset(); }}>
        ↻ PLAY AGAIN
      </Btn>
      <Btn color="teal" onClick={() => { posthog.capture('futures_explored'); go('futures'); }}>
        EXPLORE OTHER FUTURES
      </Btn>
      <Btn color="forest" onClick={() => { posthog.capture('policies_explored'); go('policies'); }}>
        ◆ EXPLORE POLICIES
      </Btn>
    </div>
  );
}
