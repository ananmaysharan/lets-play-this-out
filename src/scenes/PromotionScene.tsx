'use client';

import { useGame } from '@/game/GameProvider';
import { AvatarSprite } from '@/components/AvatarSprite';
import { AvatarCanvas } from '@/components/avatar/AvatarCanvas';
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
        headerColor="mustard"
        headerLeft="2760 INC · OFFICIAL"
        headerRight="FROM: LEADERSHIP"
        style={{ position: 'relative' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          {state.avatarConfig ? (
            <div className="promotion-avatar-tile">
              <AvatarCanvas config={state.avatarConfig} size={256} />
            </div>
          ) : (
            <AvatarSprite
              id={`avatar${state.avatar}`}
              style={{ width: 88, height: 114, imageRendering: 'pixelated' }}
            />
          )}
        </div>
        <h1 style={{ textAlign: 'center' }}>Congratulations, {state.name}!</h1>
        <Stamp color="green">PROMOTED</Stamp>
        <p>
          You just got promoted to <strong>Marketing Manager</strong> at <strong>2760 Inc.</strong>, one of the
          hottest marketing agencies in NYC.
        </p>
        <p>On your first day as manager, a few things to know about the world you&apos;re stepping into:</p>
        <p>
          <strong>1.</strong> The tools the agency uses are changing <em>fast!</em> Even though almost everyone on the
          team is using AI, nobody talks about it.
        </p>
        <p>
          <strong>2.</strong> Outside of 2760 the industry is also changing rapidly! Engagement rates across tv and web
          searches are dipping, while the cost of producing content is rising.
        </p>
        <p>But don&apos;t worry about all that right now. Let&apos;s meet your new team…</p>
      </Memo>
      <Btn color="terracotta" className="continue-btn" onClick={() => go('teamIntro')}>
        MEET THE TEAM
      </Btn>
    </>
  );
}
