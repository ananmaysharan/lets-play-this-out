'use client';

import { useGame } from '@/game/GameProvider';

export function IntroScene() {
  const { go, hasSave, resume } = useGame();
  return (
    <div className="intro-wrap">
      <h1 className="intro-title">
        <span className="tint-ink">LET&apos;S PLAY</span>
        <span className="tint-terra">THIS OUT</span>
        <span className="tint-teal intro-subtitle">AI &amp; THE FUTURE OF WORK</span>
      </h1>
      <p className="intro-sub">Can you stay employed as AI transforms the workplace?</p>
      <button type="button" className="intro-start" onClick={() => go('avatar')}>
        START...
      </button>
      {hasSave ? (
        <button type="button" className="intro-resume" onClick={resume}>
          ↻ Resume saved game
        </button>
      ) : null}
      <p className="intro-credits">Created by Sophia · Izzy · Maya · Ananmay</p>
    </div>
  );
}
