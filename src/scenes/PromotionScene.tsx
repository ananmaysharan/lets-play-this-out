'use client';

import { useGame } from '@/game/GameProvider';
import { AvatarSprite } from '@/components/AvatarSprite';
import { Btn } from '@/components/Btn';
import { Hud } from '@/components/Hud';
import { Memo } from '@/components/Memo';
import { Stamp } from '@/components/Stamp';

export function PromotionScene() {
  const { state, go } = useGame();
  return (
    <>
      <Hud tag="DAY ONE" year={2025} />
      <Memo
        rotate="left"
        headerColor="mustard"
        headerLeft="2760 INC · OFFICIAL"
        headerRight="FROM: LEADERSHIP"
        style={{ position: 'relative' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          <AvatarSprite
            id={`avatar${state.avatar}`}
            style={{ width: 88, height: 114, imageRendering: 'pixelated' }}
          />
        </div>
        <h1 style={{ textAlign: 'center' }}>Congratulations, {state.name}!</h1>
        <Stamp color="green">PROMOTED</Stamp>
        <p>
          You just got promoted to <strong>Marketing Manager</strong> at <strong>2760 Inc.</strong>, one of the
          hottest marketing agencies in NYC.
        </p>
        <p>On your first day as manager, a few things to know about the world you&apos;re stepping into:</p>
        <p>
          <strong>1.</strong> The tools the agency uses are changing <em>fast!</em> Though almost everyone on the team
          is using AI. Nobody talks about it.
        </p>
        <p>
          <strong>2.</strong> The industry is watching nervously. Engagement rates across channels are dipping. The
          cost of producing content has cratered!
        </p>
        <p>But don&apos;t worry about all that right now. Let&apos;s meet your new team…</p>
      </Memo>
      <Btn color="terracotta" className="continue-btn" onClick={() => go('teamIntro')}>
        → MEET THE TEAM
      </Btn>
    </>
  );
}
