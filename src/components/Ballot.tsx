"use client";

import { useState, type KeyboardEvent } from "react";

export interface BallotOption {
  id: string;
  letter: string;
  text: string;
}

interface Props {
  eyebrow: string;
  title: string;
  question: string;
  options: BallotOption[];
  onSubmit: (id: string) => void;
  submitColor?: "forest" | "teal";
  submitLabel?: string;
}

export function Ballot({
  eyebrow,
  title,
  question,
  options,
  onSubmit,
  submitColor = "forest",
  submitLabel = "CAST YOUR VOTE",
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  function handleKey(e: KeyboardEvent<HTMLDivElement>, id: string) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelected(id);
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const idx = options.findIndex((o) => o.id === id);
      const next = options[(idx + 1) % options.length];
      (
        document.querySelector(`[data-vote="${next.id}"]`) as HTMLElement | null
      )?.focus();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const idx = options.findIndex((o) => o.id === id);
      const prev = options[(idx - 1 + options.length) % options.length];
      (
        document.querySelector(`[data-vote="${prev.id}"]`) as HTMLElement | null
      )?.focus();
    }
  }

  const submitColorCls = submitColor === "teal" ? "btn-teal" : "btn-forest";

  return (
    <>
      <div className="ballot-frame">
        <div className="ballot-header">
          <div className="ballot-eyebrow">{eyebrow}</div>
          <div className="ballot-title">{title}</div>
        </div>

        <div className="ballot-options" role="radiogroup">
          {options.map((opt) => {
            const isSel = selected === opt.id;
            return (
              <div
                key={opt.id}
                className={`ballot-row ${isSel ? "selected" : ""}`}
                role="radio"
                aria-checked={isSel}
                tabIndex={0}
                data-vote={opt.id}
                onClick={() => setSelected(opt.id)}
                onKeyDown={(e) => handleKey(e, opt.id)}
              >
                <div className="ballot-checkbox">
                  {isSel ? (
                    <svg
                      key={selected}
                      className="ballot-mark"
                      viewBox="0 0 40 40"
                    >
                      <line x1="8" y1="8" x2="32" y2="32" />
                      <line x1="32" y1="8" x2="8" y2="32" />
                    </svg>
                  ) : null}
                </div>
                <div className="ballot-content">
                  <div className="ballot-letter">{opt.letter}</div>
                  <div className="ballot-text">{opt.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className={`btn ${submitColorCls} continue-btn`}
        disabled={!selected}
        aria-disabled={!selected}
        style={{
          opacity: selected ? 1 : 0.4,
          cursor: selected ? "pointer" : "not-allowed",
        }}
        onClick={() => selected && onSubmit(selected)}
      >
        {submitLabel}
      </button>
    </>
  );
}
