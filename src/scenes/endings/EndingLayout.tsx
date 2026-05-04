"use client";

import posthog from "posthog-js";
import type { ReactNode } from "react";
import { useGame } from "@/game/GameProvider";

export type EndingPathId =
  | "augmentation"
  | "erosion"
  | "shrinkage"
  | "proworker";

const PATHS: {
  id: EndingPathId;
  label: string;
  subtitle: string;
  color: string;
}[] = [
  {
    id: "augmentation",
    label: "AUGMENTATION",
    subtitle: "Humans in the loop",
    color: "var(--teal-dark)",
  },
  {
    id: "erosion",
    label: "JOB EROSION",
    subtitle: "Lower wages, less craft",
    color: "var(--terracotta)",
  },
  {
    id: "shrinkage",
    label: "SHRINKAGE",
    subtitle: "Margins up, jobs down",
    color: "var(--mustard)",
  },
  {
    id: "proworker",
    label: "PRO-WORKER",
    subtitle: "Workers steer AI",
    color: "var(--forest)",
  },
];

interface Props {
  current: EndingPathId;
  label: string;
  /** Big title — already styled with display font, color, and line breaks. */
  title: ReactNode;
  /** Body paragraphs (use multiple <p> elements). */
  body: ReactNode;
}

export function EndingLayout({ current, label, title, body }: Props) {
  const { go, reset } = useGame();
  return (
    <div className="ending-screen-v2">
      <div className="ending-label">{label}</div>
      <h1 className="ending-title">{title}</h1>

      <div className="ending-body-v2">{body}</div>

      <div className="ending-paths">
        {PATHS.map((p) => {
          const isHere = p.id === current;
          return (
            <div
              key={p.id}
              className={`ending-path-card${isHere ? " is-here" : ""}`}
              style={
                isHere
                  ? { background: p.color, borderColor: "var(--ink)" }
                  : { borderColor: p.color }
              }
            >
              <div className="ending-path-label">{p.label}</div>
              <div className="ending-path-sub">
                {isHere ? "You are here" : p.subtitle}
              </div>
            </div>
          );
        })}
      </div>

      <div className="ending-cta-stack">
        <button
          type="button"
          className="ending-cta"
          onClick={() => {
            posthog.capture("futures_explored");
            go("futures");
          }}
        >
          <span className="ending-cta-text">
            EXPLORE YOUR PATH AND OTHER FUTURES
          </span>
          <span className="ending-cta-arrow" aria-hidden>
            →
          </span>
        </button>
        <button
          type="button"
          className="ending-cta"
          onClick={() => {
            posthog.capture("policies_explored");
            go("policies");
          }}
        >
          <span className="ending-cta-text">EXPLORE REAL-WORLD POLICIES</span>
          <span className="ending-cta-arrow" aria-hidden>
            →
          </span>
        </button>
      </div>

      <button
        type="button"
        className="ending-replay"
        onClick={() => {
          posthog.capture("game_replayed");
          reset();
        }}
      >
        ↻ PLAY AGAIN
      </button>
    </div>
  );
}
