"use client";

import { Crosshair, Smiley, SmileyMeh, Sparkle } from "@phosphor-icons/react";
import { useGame } from "@/game/GameProvider";

interface Props {
  tag?: string;
  /** Override the displayed year (defaults to state.year). */
  year?: number;
  /** Hide the standing/climate metrics row. */
  showMetrics?: boolean;
}

const ICON_PROPS = {
  size: 22,
  weight: "regular" as const,
  color: "var(--ink)",
};

export function Hud({ tag = "", year, showMetrics = true }: Props) {
  const { state } = useGame();
  const y = year ?? state.year;
  const yearPct = Math.max(0, Math.min(100, ((y - 2025) / 10) * 100));

  const standingColor =
    state.standing < 25
      ? "var(--terracotta)"
      : state.standing < 65
        ? "var(--mustard)"
        : "var(--forest)";
  const climateColor =
    state.aiSentiment > 75
      ? "var(--terracotta)"
      : state.aiSentiment > 25
        ? "var(--teal)"
        : "var(--forest)";

  const timelineCls =
    `hud-timeline ${y <= 2025 ? "at-start" : ""} ${y >= 2035 ? "at-end" : ""}`.trim();

  return (
    <div className="hud">
      <div className={timelineCls}>
        <span className="timeline-start">2025</span>
        <div className="timeline-track">
          <div className="timeline-marker" style={{ left: `${yearPct}%` }}>
            {y}
          </div>
        </div>
        <span className="timeline-end">2035</span>
        {tag ? <span className="timeline-tag">{tag}</span> : null}
      </div>

      {showMetrics ? (
        <div className="hud-metrics-row">
          <div className="hud-metric">
            <div className="hud-metric-label">
              <span>Company Standing</span>
              <span className="hud-metric-pct">{state.standing}%</span>
            </div>
            <div className="hud-metric-bar-row">
              <SmileyMeh {...ICON_PROPS} />
              <div className="hud-bar-track">
                <div
                  className="hud-bar-fill"
                  style={{
                    width: `${state.standing}%`,
                    background: standingColor,
                  }}
                />
              </div>
              <Smiley {...ICON_PROPS} />
            </div>
          </div>
          <div className="hud-metric">
            <div className="hud-metric-label">
              <span>AI Climate</span>
              <span className="hud-metric-pct">{state.aiSentiment}%</span>
            </div>
            <div className="hud-metric-bar-row">
              <Crosshair {...ICON_PROPS} />
              <div className="hud-bar-track">
                <div
                  className="hud-bar-fill"
                  style={{
                    width: `${state.aiSentiment}%`,
                    background: climateColor,
                  }}
                />
              </div>
              <Sparkle {...ICON_PROPS} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
