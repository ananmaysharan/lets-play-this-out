'use client';

import posthog from 'posthog-js';
import { useGame } from '@/game/GameProvider';
import { Btn } from '@/components/Btn';

export function EndingActions() {
  const { state, dispatch, go, reset } = useGame();
  function goWithBack(scene: 'futures' | 'policies') {
    dispatch({ type: 'SET_PREVIOUS_SCENE', scene: state.scene });
    go(scene);
  }
  return (
    <div className="ending-actions">
      <Btn color="terracotta" onClick={() => { posthog.capture('game_replayed'); reset(); }}>
        ↻ PLAY AGAIN
      </Btn>
      <Btn color="teal" onClick={() => { posthog.capture('futures_explored'); goWithBack('futures'); }}>
        ↔ EXPLORE OTHER FUTURES
      </Btn>
      <Btn color="forest" onClick={() => { posthog.capture('policies_explored'); goWithBack('policies'); }}>
        ◆ EXPLORE POLICIES
      </Btn>
    </div>
  );
}

export function ProworkerHeroActions() {
  const { state, dispatch, go, reset } = useGame();
  function goWithBack(scene: 'futures' | 'policies') {
    dispatch({ type: 'SET_PREVIOUS_SCENE', scene: state.scene });
    go(scene);
  }
  return (
    <div className="ending-hero-actions">
      <Btn color="terracotta" onClick={() => { posthog.capture('game_replayed'); reset(); }}>
        ↻ PLAY AGAIN
      </Btn>
      <Btn color="teal" onClick={() => { posthog.capture('futures_explored'); goWithBack('futures'); }}>
        EXPLORE OTHER FUTURES
      </Btn>
      <Btn color="forest" onClick={() => { posthog.capture('policies_explored'); goWithBack('policies'); }}>
        ◆ EXPLORE POLICIES
      </Btn>
    </div>
  );
}
