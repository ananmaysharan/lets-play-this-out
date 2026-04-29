import type { CSSProperties, ReactNode } from 'react';

interface Props {
  title: ReactNode;
  year: ReactNode;
  /** SVG/JSX content for the photo area. */
  children: ReactNode;
  style?: CSSProperties;
}

export function Polaroid({ title, year, children, style }: Props) {
  return (
    <div className="polaroid-card" style={style}>
      <div className="polaroid-caption">
        <div className="pc-title">{title}</div>
        <div className="pc-year">{year}</div>
      </div>
      {children}
    </div>
  );
}

/** The 2034 Brooklyn Gillette pop-up illustration (HTML 5527-5587). */
export function BrooklynPolaroidArt() {
  return (
    <svg
      className="polaroid-art"
      viewBox="0 0 100 96"
      preserveAspectRatio="xMidYMid meet"
      style={{ aspectRatio: '1.05/1' }}
    >
      <rect x="0" y="0" width="100" height="58" fill="#E8DCC0" />
      <rect x="0" y="22" width="100" height="36" fill="#D4C8AA" />
      <rect x="0" y="22" width="22" height="3" fill="#9A2A20" />
      <rect x="0" y="25" width="22" height="2" fill="#FDF8EC" />
      <rect x="0" y="27" width="22" height="3" fill="#9A2A20" />
      <rect x="2" y="34" width="18" height="20" fill="#3F4E5A" />
      <rect x="3" y="35" width="16" height="2" fill="#5A7080" />
      <rect x="3" y="40" width="16" height="2" fill="#5A7080" />
      <rect x="78" y="22" width="22" height="36" fill="#A8987A" />
      <rect x="80" y="24" width="1" height="34" fill="#897A60" />
      <rect x="84" y="24" width="1" height="34" fill="#897A60" />
      <rect x="88" y="24" width="1" height="34" fill="#897A60" />
      <rect x="92" y="24" width="1" height="34" fill="#897A60" />
      <rect x="96" y="24" width="1" height="34" fill="#897A60" />
      <rect x="22" y="22" width="56" height="36" fill="#C8BCA0" />
      <rect x="22" y="24" width="56" height="6" fill="#3D6FAA" />
      <rect x="34" y="26" width="14" height="1" fill="#FDF8EC" />
      <rect x="34" y="28" width="14" height="1" fill="#FDF8EC" />
      <rect x="50" y="26" width="14" height="1" fill="#FDF8EC" />
      <rect x="50" y="28" width="14" height="1" fill="#FDF8EC" />
      <rect x="22" y="30" width="2" height="30" fill="#5A5448" />
      <rect x="38" y="30" width="2" height="30" fill="#5A5448" />
      <rect x="50" y="30" width="2" height="30" fill="#5A5448" />
      <rect x="60" y="30" width="2" height="30" fill="#5A5448" />
      <rect x="76" y="30" width="2" height="30" fill="#5A5448" />
      <rect x="24" y="30" width="14" height="28" fill="#7A8A98" />
      <rect x="40" y="30" width="10" height="28" fill="#7A8A98" />
      <rect x="52" y="30" width="8" height="28" fill="#8B9BA8" />
      <rect x="62" y="30" width="14" height="28" fill="#7A8A98" />
      <rect x="25" y="34" width="12" height="1" fill="#5A6878" />
      <rect x="25" y="42" width="12" height="1" fill="#5A6878" />
      <rect x="25" y="50" width="12" height="1" fill="#5A6878" />
      <rect x="63" y="34" width="2" height="14" fill="#C44D37" />
      <rect x="66" y="32" width="2" height="16" fill="#3D94A3" />
      <rect x="69" y="34" width="2" height="14" fill="#C9A93A" />
      <rect x="72" y="36" width="2" height="12" fill="#FDF8EC" />
      <rect x="42" y="36" width="6" height="6" fill="#E08340" />
      <rect x="43" y="37" width="4" height="4" fill="#FDF8EC" />
      <rect x="44" y="38" width="2" height="2" fill="#1A1A1A" />
      <circle cx="46" cy="46" r="3" fill="#C44D37" />
      <text x="46" y="48" textAnchor="middle" fontFamily="Archivo Black" fontSize="4" fill="#FDF8EC">L</text>
      <rect x="53" y="38" width="5" height="5" fill="#C9A93A" />
      <rect x="54" y="39" width="1" height="1" fill="#1A1A1A" />
      <rect x="56" y="39" width="1" height="1" fill="#1A1A1A" />
      <rect x="55" y="40" width="1" height="2" fill="#1A1A1A" />
      <rect x="54" y="41" width="1" height="1" fill="#1A1A1A" />
      <rect x="56" y="41" width="1" height="1" fill="#1A1A1A" />
      <rect x="76" y="50" width="3" height="20" fill="#5A3C24" />
      <rect x="78" y="48" width="2" height="22" fill="#7A5230" />
      <rect x="64" y="34" width="20" height="14" fill="#8FAB68" />
      <rect x="58" y="40" width="22" height="12" fill="#8FAB68" />
      <rect x="68" y="28" width="16" height="10" fill="#A6BD78" />
      <rect x="60" y="36" width="2" height="6" fill="#6F8C50" />
      <rect x="80" y="32" width="3" height="8" fill="#6F8C50" />
      <rect x="66" y="32" width="6" height="2" fill="#B8CB8E" />
      <rect x="74" y="38" width="4" height="2" fill="#B8CB8E" />
      <rect x="0" y="58" width="100" height="32" fill="#9A8E76" />
      <rect x="0" y="78" width="100" height="1" fill="#7A6E58" />
      <rect x="20" y="58" width="1" height="32" fill="#7A6E58" />
      <rect x="50" y="58" width="1" height="32" fill="#7A6E58" />
      <rect x="80" y="58" width="1" height="32" fill="#7A6E58" />
      <rect x="0" y="90" width="100" height="2" fill="#5A4F3A" />
      <rect x="0" y="92" width="100" height="4" fill="#3F3528" />
      <rect x="56" y="68" width="14" height="2" fill="#7BD957" />
      <rect x="62" y="64" width="2" height="6" fill="#7BD957" />
      <rect x="56" y="64" width="2" height="4" fill="#7BD957" />
      <rect x="65" y="66" width="6" height="2" fill="#7BD957" />
      <circle cx="56" cy="80" r="6" fill="none" stroke="#1A1A1A" strokeWidth="2" />
      <circle cx="56" cy="80" r="3" fill="none" stroke="#5A5A52" strokeWidth="0.5" />
      <circle cx="74" cy="80" r="6" fill="none" stroke="#1A1A1A" strokeWidth="2" />
      <circle cx="74" cy="80" r="3" fill="none" stroke="#5A5A52" strokeWidth="0.5" />
      <circle cx="56" cy="80" r="1" fill="#1A1A1A" />
      <circle cx="74" cy="80" r="1" fill="#1A1A1A" />
      <rect x="64" y="62" width="1" height="6" fill="#1A1A1A" />
      <rect x="62" y="60" width="5" height="2" fill="#1A1A1A" />
      <rect x="56" y="60" width="1" height="4" fill="#1A1A1A" />
      <rect x="54" y="59" width="5" height="1" fill="#1A1A1A" />
      <rect x="86" y="78" width="14" height="8" fill="#3D6FAA" />
      <rect x="86" y="78" width="14" height="1" fill="#5A8AC4" />
      <rect x="88" y="74" width="2" height="2" fill="#E8C150" />
      <rect x="92" y="73" width="2" height="3" fill="#E8C150" />
      <rect x="96" y="74" width="2" height="2" fill="#E8C150" />
      <rect x="88" y="76" width="1" height="3" fill="#4E6B3F" />
      <rect x="93" y="76" width="1" height="3" fill="#4E6B3F" />
      <rect x="96" y="76" width="1" height="3" fill="#4E6B3F" />
      <rect x="89" y="77" width="2" height="1" fill="#4E6B3F" />
      <rect x="94" y="77" width="2" height="1" fill="#4E6B3F" />
    </svg>
  );
}
