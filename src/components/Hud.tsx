'use client';

import { useGame } from '@/game/GameProvider';

interface Props {
  tag?: string;
  /** Override the displayed year (defaults to state.year). */
  year?: number;
  /** Hide the standing/climate metrics row. */
  showMetrics?: boolean;
}

const IconNeutral = () => (
  <svg className="hud-icon" viewBox="0 0 18 18">
    <circle cx="9" cy="9" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="6.5" cy="7.5" r="1" fill="currentColor" />
    <circle cx="11.5" cy="7.5" r="1" fill="currentColor" />
    <line x1="5.5" y1="12" x2="12.5" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IconHappy = () => (
  <svg className="hud-icon" viewBox="0 0 18 18">
    <circle cx="9" cy="9" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="6.5" cy="7.5" r="1" fill="currentColor" />
    <circle cx="11.5" cy="7.5" r="1" fill="currentColor" />
    <path d="M 5.5 11 Q 9 14 12.5 11" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);
const IconDocX = () => (
  <svg className="hud-icon" viewBox="0 0 18 18">
    <path d="M 3 1.5 L 10 1.5 L 14 5.5 L 14 16.5 L 3 16.5 Z" fill="currentColor" />
    <path d="M 10 1.5 L 10 5.5 L 14 5.5" fill="#F2EBDA" stroke="#F2EBDA" strokeWidth="0.5" />
    <circle cx="11" cy="12.5" r="3" fill="#F2EBDA" stroke="currentColor" strokeWidth="1" />
    <line x1="9.5" y1="11" x2="12.5" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="12.5" y1="11" x2="9.5" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
const IconDocCheck = () => (
  <svg className="hud-icon" viewBox="0 0 18 18">
    <path d="M 3 1.5 L 10 1.5 L 14 5.5 L 14 16.5 L 3 16.5 Z" fill="currentColor" />
    <path d="M 10 1.5 L 10 5.5 L 14 5.5" fill="#F2EBDA" stroke="#F2EBDA" strokeWidth="0.5" />
    <circle cx="11" cy="12.5" r="3" fill="#F2EBDA" stroke="currentColor" strokeWidth="1" />
    <path d="M 9.5 12.5 L 10.8 13.8 L 12.5 11.3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Hud({ tag = '', year, showMetrics = true }: Props) {
  const { state } = useGame();
  const y = year ?? state.year;
  const yearPct = Math.max(0, Math.min(100, ((y - 2025) / 10) * 100));

  const standingColor =
    state.standing < 25 ? 'var(--terracotta)' : state.standing < 65 ? 'var(--mustard)' : 'var(--forest)';
  const climateColor =
    state.aiSentiment > 75 ? 'var(--terracotta)' : state.aiSentiment > 25 ? 'var(--teal)' : 'var(--forest)';

  const timelineCls = `hud-timeline ${y <= 2025 ? 'at-start' : ''} ${y >= 2035 ? 'at-end' : ''}`.trim();

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
              <IconNeutral />
              <div className="hud-bar-track">
                <div className="hud-bar-fill" style={{ width: `${state.standing}%`, background: standingColor }} />
              </div>
              <IconHappy />
            </div>
          </div>
          <div className="hud-metric">
            <div className="hud-metric-label">
              <span>AI Climate</span>
              <span className="hud-metric-pct">{state.aiSentiment}%</span>
            </div>
            <div className="hud-metric-bar-row">
              <IconDocX />
              <div className="hud-bar-track">
                <div className="hud-bar-fill" style={{ width: `${state.aiSentiment}%`, background: climateColor }} />
              </div>
              <IconDocCheck />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
