/* FlowMetrics 2031 warning card. Used as the side image on the Job Erosion 2031 scene. */

export function FmWarningCard() {
  return (
    <div className="fmw-card">
      {/* WARNING stamp tucked into the top-right corner */}
      <div className="fmw-stamp">WARNING</div>

      <div className="fmw-frame">
        {/* Panel 1 — headline */}
        <div className="fmw-panel">
          <div className="fmw-dots">
            <span /><span /><span />
          </div>
          <div className="fmw-eyebrow">FLOWMETRICS · WARNING</div>
          <div className="fmw-headline">
            LOW PERFORMING<br />TEAM
          </div>
          <div className="fmw-subhead">Consider termination.</div>
        </div>

        {/* Panel 2 — benchmark bars */}
        <div className="fmw-panel">
          <div className="fmw-dots">
            <span /><span /><span />
          </div>
          <div className="fmw-eyebrow" style={{ marginBottom: 14 }}>
            BENCHMARK · AGENT 203
          </div>

          <div className="fmw-bench-row">
            <div className="fmw-bench-label">AGENT 203</div>
            <div className="fmw-bench-bar-wrap">
              <div className="fmw-bench-bar fmw-bar-strong" style={{ width: '88%' }} />
            </div>
            <div className="fmw-bench-pct">+92%</div>
          </div>
          <div className="fmw-bench-row">
            <div className="fmw-bench-label">YOU</div>
            <div className="fmw-bench-bar-wrap">
              <div className="fmw-bench-bar fmw-bar-weak" style={{ width: '22%' }} />
            </div>
            <div className="fmw-bench-pct">−41%</div>
          </div>

          <div className="fmw-bench-note">203 outperforming on every axis.</div>
        </div>

        {/* Bottom rank strip */}
        <div className="fmw-rank">
          <div className="fmw-rank-label">YOUR RANK</div>
          <div className="fmw-rank-value">
            10<small>/11</small>
          </div>
        </div>
      </div>
    </div>
  );
}
