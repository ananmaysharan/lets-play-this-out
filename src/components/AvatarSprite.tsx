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

/** Character ids that resolve to a PNG portrait instead of the sprite sheet. */
const IMAGE_MAP: Record<string, string> = {
  teamPriya: '/team/priya.png',
  teamSamarth: '/team/samarth.png',
  teamMarcus: '/team/marcus.png',
  teamJade: '/team/jade.png',
  teamWillow: '/team/willow.png',
  bossAlex: '/team/alex.png',
  avatar1: '/characters/avatar_1.png',
  avatar2: '/characters/avatar_2.png',
  avatar3: '/characters/avatar_3.png',
  avatar4: '/characters/avatar_4.png',
  avatar5: '/characters/avatar_5.png',
  avatar6: '/characters/avatar_6.png',
  avatar7: '/characters/avatar_7.png',
  avatar8: '/characters/avatar_8.png',
};

export function AvatarSprite({ id, viewBox = '0 0 34 44', className, style }: Props) {
  const src = IMAGE_MAP[id];
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={id.replace(/^(team|boss)/, '')}
        className={className}
        style={{ width: '100%', height: 'auto', display: 'block', ...style }}
      />
    );
  }
  return (
    <svg viewBox={viewBox} className={className} style={style}>
      <use href={`#${id}`} />
    </svg>
  );
}
