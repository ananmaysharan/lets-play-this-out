'use client';

import { useGame } from '@/game/GameProvider';
import { Ballot, type BallotOption } from '@/components/Ballot';
import { Hud } from '@/components/Hud';
import { Memo } from '@/components/Memo';
import { endingFlip } from '@/game/rng';
import type { PathKey, Vote } from '@/game/types';

const OPTIONS: BallotOption[] = [
  { id: 'for', letter: 'FOR', text: "Productivity gains should be shared. Redesign roles. Don't just cut." },
  { id: 'against', letter: 'AGAINST', text: "The market will create new jobs on its own. Don't slow us down." },
  { id: 'abstain', letter: 'ABSTAIN', text: "Voting isn't really your thing." },
];

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

    if (ending === 'shrinkage') go('end_shrinkage_0');
    else if (ending === 'augmentation') go('end_augmentation_1');
    else if (ending === 'erosion') go('end_erosion_1');
    else go('end_proworker_1');
  }

  return (
    <>
      <Hud tag="BALLOT DAY" year={2030} />
      <Memo headerColor="forest" headerLeft="NATIONAL BALLOT · 2030" headerRight="VOTE TODAY">
        <p>
          Outside of 2760 Inc. there&apos;s been a lot of foot traffic. A new policy is up for a vote this year and people
          at work are talking. It might really change things inside 2760 Inc.
        </p>
        <h2 style={{ fontSize: 20, marginTop: 14 }}>The AI Job Preservation &amp; Work Sharing Act</h2>
        <p>
          <strong>What it does:</strong> Companies that gain productivity through AI cannot simply pocket those gains or
          cut headcount. Instead they must choose at least one of: reduce working hours without cutting pay, fund worker
          retraining accounts, or redesign roles rather than eliminate them.
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
