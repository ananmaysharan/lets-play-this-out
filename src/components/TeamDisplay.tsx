'use client';

import { useGame } from '@/game/GameProvider';
import { type TeamMember } from '@/game/types';
import { AvatarSprite } from './AvatarSprite';

interface MemberDef {
  id: TeamMember;
  spriteId: string;
  name: string;
  role: string;
}

const TEAM: MemberDef[] = [
  { id: 'priya', spriteId: 'teamPriya', name: 'Priya', role: 'Jr. Associate' },
  { id: 'samarth', spriteId: 'teamSamarth', name: 'Samarth', role: 'Jr. Associate' },
  { id: 'marcus', spriteId: 'teamMarcus', name: 'Marcus', role: 'Associate' },
  { id: 'jade', spriteId: 'teamJade', name: 'Jade', role: 'Sr. Strategist' },
  { id: 'willow', spriteId: 'teamWillow', name: 'Willow', role: 'Sr. Associate' },
];

interface Props {
  compact?: boolean;
  /** When true, members not on state.team are rendered with .gone styling. Otherwise filtered out. */
  showLost?: boolean;
}

export function TeamDisplay({ compact = false, showLost = false }: Props) {
  const { state } = useGame();
  const members = TEAM.filter((m) => showLost || state.team[m.id]);
  return (
    <div className={`team-display ${compact ? 'team-display-compact' : ''}`}>
      {members.map((m) => {
        const gone = !state.team[m.id];
        return (
          <div key={m.id} className={`team-member ${gone ? 'gone' : ''}`}>
            <AvatarSprite id={m.spriteId} />
            <div className="team-name">{m.name}</div>
            <div className="team-role">{m.role}</div>
          </div>
        );
      })}
    </div>
  );
}
