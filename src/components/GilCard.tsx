/* Gillette ad card 2028. Razor SVG from renderGilRazor (HTML 4146-4178), G letter 4124-4144. */

import { PATTERN_G, PixelLogo } from './PixelLogo';

const GilRazorSvg = () => (
  <svg viewBox="0 0 24 40" preserveAspectRatio="xMidYMid meet">
    <rect x="3" y="6" width="18" height="3" fill="#C7DFE3" />
    <rect x="3" y="9" width="18" height="1" fill="#88BFC9" />
    <rect x="3" y="10" width="18" height="1" fill="#C7DFE3" />
    <rect x="3" y="11" width="18" height="1" fill="#88BFC9" />
    <rect x="3" y="12" width="18" height="1" fill="#C7DFE3" />
    <rect x="3" y="13" width="18" height="1" fill="#88BFC9" />
    <rect x="3" y="14" width="18" height="2" fill="#C7DFE3" />
    <rect x="3" y="6" width="18" height="1" fill="#2F6F7B" />
    <rect x="3" y="15" width="18" height="1" fill="#2F6F7B" />
    <rect x="9" y="16" width="6" height="2" fill="#88BFC9" />
    <rect x="10" y="18" width="4" height="2" fill="#C7DFE3" />
    <rect x="9" y="20" width="6" height="14" fill="#C7DFE3" />
    <rect x="9" y="22" width="6" height="1" fill="#88BFC9" />
    <rect x="9" y="24" width="6" height="1" fill="#88BFC9" />
    <rect x="9" y="26" width="6" height="1" fill="#88BFC9" />
    <rect x="9" y="28" width="6" height="1" fill="#88BFC9" />
    <rect x="9" y="30" width="6" height="1" fill="#88BFC9" />
    <rect x="9" y="34" width="6" height="2" fill="#88BFC9" />
  </svg>
);

export function GilCard() {
  return (
    <div className="gil-card">
      <div className="gil-stamp">EST. 1901</div>

      <div className="gil-win">
        <div className="gil-chrome">
          <span /><span /><span />
        </div>
        <div className="gil-brand-label">GILLETTE · EST. 1901</div>
        <div className="gil-brand-mark">GILLETTE</div>
        <div className="gil-brand-tag">The best a pixel can get.</div>
      </div>

      <div className="gil-win">
        <div className="gil-chrome">
          <span /><span /><span />
        </div>
        <PixelLogo pattern={PATTERN_G} gridClass="gil-letter" emptyClass="b" />
      </div>

      <div className="gil-win gil-focal">
        <div className="gil-chrome">
          <span /><span /><span />
        </div>
        <div className="gil-focal-art">
          <div className="gil-focal-dots" />
          <GilRazorSvg />
        </div>
      </div>
    </div>
  );
}
