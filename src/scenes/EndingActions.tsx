'use client';

import { useGame } from '@/game/GameProvider';
import { Btn } from '@/components/Btn';

export function EndingActions() {
  const { state, go, reset } = useGame();
  return (
    <>
      <div className="ending-actions">
        <Btn color="terracotta" onClick={reset}>
          ↻ PLAY AGAIN
        </Btn>
        <Btn color="teal" onClick={() => go('futures')}>
          ↔ EXPLORE OTHER FUTURES
        </Btn>
        <Btn color="forest" onClick={() => go('policies')}>
          ◆ EXPLORE POLICIES
        </Btn>
      </div>
      <p className="muted center" style={{ fontSize: 11, marginTop: 30, letterSpacing: '0.1em' }}>
        HEADCOUNT: {state.headcount}/5 · STANDING: {state.standing}% · AI CLIMATE: {state.aiSentiment}%
      </p>
      <p className="muted center" style={{ fontSize: 10, marginTop: 10 }}>
        SOURCES: THE ATLANTIC (2027) · ROTMAN: AI &amp; THE FUTURE OF WORK · HBR
      </p>
    </>
  );
}

export function ProworkerHeroActions() {
  const { go, reset } = useGame();
  return (
    <div className="ending-hero-actions">
      <Btn color="terracotta" onClick={reset}>
        ↻ PLAY AGAIN
      </Btn>
      <Btn color="teal" onClick={() => go('futures')}>
        → EXPLORE OTHER FUTURES
      </Btn>
      <Btn color="forest" onClick={() => go('policies')}>
        ◆ EXPLORE POLICIES
      </Btn>
    </div>
  );
}
