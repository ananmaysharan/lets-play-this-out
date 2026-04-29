'use client';

import type { ComponentType } from 'react';
import { useGame } from './GameProvider';
import type { SceneId } from './types';

import { Notifications } from '@/components/Notifications';
import { ProgressBar } from '@/components/ProgressBar';
import { SpriteSheet } from '@/components/SpriteSheet';

import { IntroScene } from '@/scenes/IntroScene';
import { AvatarScene } from '@/scenes/AvatarScene';
import { PromotionScene } from '@/scenes/PromotionScene';
import { TeamIntroScene } from '@/scenes/TeamIntroScene';
import {
  FollowupScene,
  Y2025CtxScene,
  Y2025NewsScene,
  Y2025QScene,
  Y2026CtxScene,
  Y2026NewsScene,
  Y2026QScene,
  Y2027CtxScene,
  Y2027NewsScene,
  Y2027ProworkerScene,
  Y2027ProworkerYesScene,
  Y2027QScene,
  Y2028CtxScene,
  Y2028QScene,
  Y2029CtxScene,
  Y2029QScene,
} from '@/scenes/YearScenes';
import { RecapScene } from '@/scenes/RecapScene';
import { PolicyScene } from '@/scenes/PolicyScene';
import { FuturesScene, PoliciesScene } from '@/scenes/AppendixScenes';

import {
  EndAugmentation1Scene,
  EndAugmentation2Scene,
  EndAugmentation3Scene,
  EndAugmentation3bScene,
  EndAugmentation4Scene,
  EndAugmentation5Scene,
  EndAugmentation6Scene,
  EndAugmentation7Scene,
  EndAugmentationFinalScene,
} from '@/scenes/endings/AugmentationEnding';
import {
  EndErosion1Scene,
  EndErosion2Scene,
  EndErosion3Scene,
  EndErosion3bScene,
  EndErosion4Scene,
  EndErosionFinalScene,
  EndErosionLoseScene,
} from '@/scenes/endings/ErosionEnding';
import {
  EndShrinkage0Scene,
  EndShrinkage1Scene,
  EndShrinkage2Scene,
  EndShrinkage3Scene,
  EndShrinkage4Scene,
  EndShrinkageFinalScene,
  EndShrinkageNoticeAScene,
  EndShrinkageNoticeBScene,
  EndShrinkageNoticeScene,
} from '@/scenes/endings/ShrinkageEnding';
import {
  EndProworker1Scene,
  EndProworker2Scene,
  EndProworker3Scene,
  EndProworker4Scene,
  EndProworker5Scene,
  EndProworker6Scene,
  EndProworker7Scene,
  EndProworkerFinalScene,
} from '@/scenes/endings/ProworkerEnding';

const SCENES: Record<SceneId, ComponentType> = {
  intro: IntroScene,
  avatar: AvatarScene,
  promotion: PromotionScene,
  teamIntro: TeamIntroScene,

  y2025news: Y2025NewsScene,
  y2025ctx: Y2025CtxScene,
  y2025q: Y2025QScene,
  y2025followup: FollowupScene,

  y2026news: Y2026NewsScene,
  y2026ctx: Y2026CtxScene,
  y2026q: Y2026QScene,
  y2026followup: FollowupScene,

  y2027news: Y2027NewsScene,
  y2027ctx: Y2027CtxScene,
  y2027q: Y2027QScene,
  y2027followup: FollowupScene,
  y2027proworker: Y2027ProworkerScene,
  y2027proworkerYes: Y2027ProworkerYesScene,
  y2027proworkerFollowup: FollowupScene,

  y2028ctx: Y2028CtxScene,
  y2028q: Y2028QScene,
  y2028followup: FollowupScene,

  y2029ctx: Y2029CtxScene,
  y2029q: Y2029QScene,
  y2029followup: FollowupScene,

  recap: RecapScene,
  policy: PolicyScene,

  end_augmentation_1: EndAugmentation1Scene,
  end_augmentation_2: EndAugmentation2Scene,
  end_augmentation_3: EndAugmentation3Scene,
  end_augmentation_3b: EndAugmentation3bScene,
  end_augmentation_4: EndAugmentation4Scene,
  end_augmentation_5: EndAugmentation5Scene,
  end_augmentation_6: EndAugmentation6Scene,
  end_augmentation_7: EndAugmentation7Scene,
  end_augmentation_final: EndAugmentationFinalScene,

  end_erosion_1: EndErosion1Scene,
  end_erosion_2: EndErosion2Scene,
  end_erosion_3: EndErosion3Scene,
  end_erosion_3b: EndErosion3bScene,
  end_erosion_4: EndErosion4Scene,
  end_erosion_lose: EndErosionLoseScene,
  end_erosion_final: EndErosionFinalScene,

  end_shrinkage_0: EndShrinkage0Scene,
  end_shrinkage_1: EndShrinkage1Scene,
  end_shrinkage_2: EndShrinkage2Scene,
  end_shrinkage_3: EndShrinkage3Scene,
  end_shrinkage_notice: EndShrinkageNoticeScene,
  end_shrinkage_notice_a: EndShrinkageNoticeAScene,
  end_shrinkage_notice_b: EndShrinkageNoticeBScene,
  end_shrinkage_4: EndShrinkage4Scene,
  end_shrinkage_final: EndShrinkageFinalScene,

  end_proworker_1: EndProworker1Scene,
  end_proworker_2: EndProworker2Scene,
  end_proworker_3: EndProworker3Scene,
  end_proworker_4: EndProworker4Scene,
  end_proworker_5: EndProworker5Scene,
  end_proworker_6: EndProworker6Scene,
  end_proworker_7: EndProworker7Scene,
  end_proworker_final: EndProworkerFinalScene,

  futures: FuturesScene,
  policies: PoliciesScene,
};

export function Game() {
  const { state } = useGame();
  const Scene = SCENES[state.scene];
  return (
    <>
      <SpriteSheet />
      <ProgressBar />
      <main id="app">
        <div className="page active" key={state.scene}>
          {Scene ? <Scene /> : <p style={{ padding: 40 }}>Page not found: {state.scene}</p>}
        </div>
      </main>
      <Notifications />
    </>
  );
}
