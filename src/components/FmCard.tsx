/* FlowMetrics 2026 monitor card. SVG monitor ported from renderFmMonitor (HTML 3709-3732). */

const FmMonitorSvg = () => (
  <svg viewBox="0 0 32 36" preserveAspectRatio="xMidYMid meet">
    <rect x="3" y="6" width="26" height="19" fill="#8B2E1E" />
    <rect x="4" y="7" width="24" height="17" fill="#4A1C12" />
    <rect x="6" y="9" width="20" height="13" fill="#EFB48F" />
    <rect x="6" y="10" width="20" height="1" fill="#E08340" opacity="0.6" />
    <rect x="6" y="14" width="20" height="1" fill="#E08340" opacity="0.6" />
    <rect x="6" y="18" width="20" height="1" fill="#E08340" opacity="0.6" />
    <rect x="8" y="18" width="2" height="3" fill="#8B2E1E" />
    <rect x="11" y="16" width="2" height="5" fill="#8B2E1E" />
    <rect x="14" y="14" width="2" height="7" fill="#8B2E1E" />
    <rect x="17" y="11" width="2" height="10" fill="#4A1C12" />
    <rect x="20" y="13" width="2" height="8" fill="#8B2E1E" />
    <rect x="23" y="15" width="2" height="6" fill="#8B2E1E" />
    <rect x="14" y="25" width="4" height="5" fill="#8B2E1E" />
    <rect x="15" y="25" width="2" height="5" fill="#4A1C12" />
    <rect x="9" y="30" width="14" height="2" fill="#8B2E1E" />
    <rect x="10" y="31" width="12" height="1" fill="#4A1C12" />
    <rect x="25" y="10" width="1" height="1" fill="#F3E9D0" />
  </svg>
);

export function FmCard() {
  return (
    <div className="fm-card">
      <div className="fm-stamp">NEW</div>

      <div className="fm-win">
        <div className="fm-chrome">
          <span /><span /><span />
        </div>
        <div className="fm-brand-label">FLOWMETRICS · EST. 2026</div>
        <div className="fm-brand-mark">FLOWMETRICS</div>
        <div className="fm-brand-tag">Every moment, measured.</div>
      </div>

      <div className="fm-win fm-focal">
        <div className="fm-chrome">
          <span /><span /><span />
        </div>
        <div className="fm-focal-art">
          <div className="fm-focal-dots" />
          <FmMonitorSvg />
        </div>
      </div>

      <div className="fm-win">
        <div className="fm-chrome">
          <span /><span /><span />
        </div>
        <div className="fm-section-title">Output velocity · breakdown</div>
        <div className="fm-bd-row"><div className="fm-bar b1" /><div className="fm-bd-label">Prompting</div></div>
        <div className="fm-bd-row"><div className="fm-bar b2" /><div className="fm-bd-label">Editing</div></div>
        <div className="fm-bd-row"><div className="fm-bar b3" /><div className="fm-bd-label">Publishing</div></div>
        <div className="fm-bd-row"><div className="fm-bar b4" /><div className="fm-bd-label">Reviewing</div></div>
        <div className="fm-bd-row"><div className="fm-bar b5" /><div className="fm-bd-label">Idle</div></div>
      </div>

      <div className="fm-win fm-rank">
        <div className="fm-rank-label">Your rank</div>
        <div className="fm-rank-value">
          6<small> / 11</small>
        </div>
      </div>
    </div>
  );
}
