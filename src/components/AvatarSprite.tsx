'use client';

import type { CSSProperties } from 'react';

interface Props {
  /** Sprite id without the leading '#'. e.g. 'avatar1', 'bossAlex', 'teamPriya'. */
  id: string;
  /** Full SVG viewBox. Defaults to "0 0 34 44" for avatars; pass "0 0 16 16" for Alex. */
  viewBox?: string;
  className?: string;
  style?: CSSProperties;
}

export function AvatarSprite({ id, viewBox = '0 0 34 44', className, style }: Props) {
  return (
    <svg viewBox={viewBox} className={className} style={style}>
      <use href={`#${id}`} />
    </svg>
  );
}
