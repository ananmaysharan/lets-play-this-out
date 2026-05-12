"use client";

import { useState } from "react";
import posthog from "posthog-js";
import { useGame } from "@/game/GameProvider";
import { BlinkingSquares } from "@/components/BlinkingSquares";

export function IntroScene() {
  const { go, hasSave, resume } = useGame();
  const [consent, setConsent] = useState(true);
  return (
    <>
      <BlinkingSquares />
      <div className="intro-wrap">
      <h1 className="intro-title">
        <span className="tint-ink">LET&apos;S PLAY</span>
        <span className="tint-terra">THIS OUT</span>
        <span className="tint-teal intro-subtitle">
          AI &amp; THE FUTURE OF WORK
        </span>
      </h1>
      <p className="intro-sub">
        Can you stay employed as AI transforms the workplace over the next 10
        years?
      </p>
      <button
        type="button"
        className="intro-start"
        onClick={() => { posthog.capture("game_started"); go("avatar"); }}
      >
        START
      </button>
      {hasSave ? (
        <button type="button" className="intro-resume" onClick={() => { posthog.capture("game_resumed"); resume(); }}>
          ↻ Resume saved game
        </button>
      ) : null}
      <label className="intro-consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>
          By playing, I agree to share anonymous gameplay data via PostHog
          to help the team improve this game. No personal information is
          collected.
        </span>
      </label>
      <p className="intro-credits">
        Created by Sophia DeVito · Izzie Mack · Maya Kiernan · Ananmay Sharan
      </p>
      </div>
    </>
  );
}
