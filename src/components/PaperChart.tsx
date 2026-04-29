/**
 * "Labor $ vs AI cost" chart shown to Alex in 2025 (HTML 3462-3485).
 * Five paired columns (one per year, 2020-2024), each with two thin bars:
 *   - Labor $/hr — terracotta — index base 100 in 2020
 *   - AI tool cost — teal — index base 100 in 2020
 *
 * Values are realistic indexes:
 *   Labor: BLS marketing/advertising-management mean wage rose ~22% 2020→2024.
 *   AI:    Public model-API per-token cost dropped ~90% 2020→2024 (GPT-3 →
 *          GPT-4-class small models). The "tool cost" line is a deliberate
 *          aggregate; not a single product.
 */

const YEARS = ['2020', '2021', '2022', '2023', '2024'] as const;
const LABOR_INDEX = [100, 104, 110, 116, 122];
const AI_INDEX = [100, 55, 30, 16, 9];
const Y_TICKS = [25, 50, 75, 100];
/** Headroom above 100 so labor's 122 max doesn't punch through the top. */
const MAX_SCALE = 130;
const pct = (n: number) => `${(n / MAX_SCALE) * 100}%`;

export function PaperChart() {
  return (
    <div className="paper-chart">
      <div className="paper-chart-title">Labor $ vs AI cost</div>
      <div className="paper-chart-sub">Internal · 2020–24 · 2020 = 100</div>

      <div className="paper-chart-plot">
        {/* horizontal grid lines */}
        <div className="paper-chart-grid" aria-hidden>
          {Y_TICKS.map((t) => (
            <div key={t} className="paper-chart-grid-line" style={{ bottom: pct(t) }}>
              <span className="paper-chart-grid-label">{t}</span>
            </div>
          ))}
        </div>

        {/* paired columns */}
        <div
          className="paper-chart-bars"
          role="img"
          aria-label="Labor cost rising 22% from 2020 to 2024 while AI tool cost falls 91% over the same period"
        >
          {YEARS.map((year, i) => (
            <div key={year} className="paper-chart-column">
              <div className="paper-chart-pair">
                <div
                  className="pbar up"
                  style={{ height: pct(LABOR_INDEX[i]) }}
                  title={`Labor ${year}: ${LABOR_INDEX[i]}`}
                />
                <div
                  className="pbar down"
                  style={{ height: pct(AI_INDEX[i]) }}
                  title={`AI ${year}: ${AI_INDEX[i]}`}
                />
              </div>
              <div className="paper-chart-col-label">&apos;{year.slice(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="paper-chart-legend">
        <span>
          <span className="swatch" style={{ background: 'var(--terracotta)' }} />
          Labor $/hr
        </span>
        <span>
          <span className="swatch" style={{ background: 'var(--teal)' }} />
          AI tool cost
        </span>
      </div>
      <div className="paper-chart-stamp">INTERNAL</div>
    </div>
  );
}
