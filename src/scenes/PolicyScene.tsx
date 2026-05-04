'use client';

import posthog from 'posthog-js';
import { useGame } from '@/game/GameProvider';
import { Ballot, type BallotOption } from '@/components/Ballot';
import { Btn } from '@/components/Btn';
import { Hud } from '@/components/Hud';
import { Memo } from '@/components/Memo';
import { endingFlip } from '@/game/rng';
import type { PathKey, Vote } from '@/game/types';

const OPTIONS: BallotOption[] = [
  { id: 'for', letter: 'FOR', text: '' },
  { id: 'against', letter: 'AGAINST', text: '' },
  { id: 'abstain', letter: 'ABSTAIN', text: '' },
];

export function PolicyCtxScene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="BALLOT DAY" year={2030} />
      <Memo headerColor="forest" headerLeft="NATIONAL BALLOT · 2030" headerRight="VOTE TODAY">
        <p>
          You&apos;ve been so locked into work that you have not noticed that
          outside of 2760 Inc. there has been a lot of change in the world!
        </p>
        <p>
          A new policy is up for a vote this year and people at work are
          talking. It might really change things inside 2760 Inc.
        </p>
        <h2 style={{ fontSize: 20, marginTop: 14 }}>The AI Job Preservation &amp; Work Sharing Act</h2>
        <p>
          <strong>What it does:</strong> Companies that gain productivity through AI cannot simply pocket those gains or
          cut headcount. Instead they must choose at least one of the following: reduce working hours without cutting
          pay, fund worker retraining accounts, or redesign roles rather than eliminate them.
        </p>
        <p>
          <strong>For it:</strong> Labor unions, worker advocacy groups, and a coalition of economists who argue
          productivity gains should be broadly shared.
        </p>
        <p>
          <strong>Against it:</strong> Most major tech companies, business lobbying groups, and some economists who
          argue it will slow AI adoption and hurt U.S. competitiveness.
        </p>
      </Memo>

      <Btn color="forest" className="continue-btn" onClick={() => go('policy')}>
        GO TO BALLOT
      </Btn>
    </>
  );
}

export function PolicyScene() {
  const { state, dispatch, go } = useGame();

  function submit(vote: string) {
    const v = vote as Vote;
    dispatch({ type: 'SET_POLICY_VOTE', vote: v });

    // Build a state snapshot the seeded flip can read deterministically.
    const stateForRng = { ...state, policyVote: v };

    const passed =
      v === 'for' ||
      (v === 'abstain' &&
        state.path.proworker + state.path.augmentation > state.path.shrinkage + state.path.erosion);

    let ending: PathKey;
    if (passed) {
      ending = state.path.proworker > state.path.augmentation ? 'proworker' : 'augmentation';
      if (endingFlip(stateForRng)) ending = ending === 'proworker' ? 'augmentation' : 'proworker';
    } else {
      ending = state.path.erosion > state.path.shrinkage ? 'erosion' : 'shrinkage';
      if (endingFlip(stateForRng)) ending = ending === 'erosion' ? 'shrinkage' : 'erosion';
    }
    dispatch({ type: 'SET_ENDING', ending });
    posthog.capture('policy_voted', { vote: v, resulting_ending: ending });

    if (ending === 'shrinkage') go('end_shrinkage_0');
    else if (ending === 'augmentation') go('end_augmentation_1');
    else if (ending === 'erosion') go('end_erosion_1');
    else go('end_proworker_1');
  }

  return (
    <>
      <Hud tag="BALLOT DAY" year={2030} />
      <Ballot
        eyebrow="Official Ballot · 2030"
        title="AI Job Preservation & Work Sharing Act"
        question="How do you vote?"
        options={OPTIONS}
        onSubmit={submit}
      />
    </>
  );
}
