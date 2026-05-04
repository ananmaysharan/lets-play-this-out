/* Pure reducer for the game state. */

import {
  createInitialState,
  type Effect,
  GAME_LENGTH,
  type GameState,
  type PathKey,
  type SceneId,
  type TeamMember,
  type Vote,
} from './types';

/** Scene → in-game year. Applied by the GO action so scenes don't have to
 *  dispatch SET_YEAR from a useEffect on mount. */
const SCENE_YEAR: Partial<Record<SceneId, number>> = {
  // intro / setup
  intro: 2025,
  avatar: 2025,
  promotion: 2025,
  teamIntro: 2025,
  // 2025
  y2025news: 2025, y2025ctx: 2025, y2025q: 2025, y2025followup: 2025,
  // 2026
  y2026news: 2026, y2026ctx: 2026, y2026q: 2026, y2026followup: 2026,
  // 2027 (incl pro-worker conditional branch)
  y2027news: 2027, y2027ctx: 2027, y2027q: 2027, y2027followup: 2027,
  y2027proworker: 2027, y2027proworkerYes: 2027, y2027proworkerFollowup: 2027,
  // 2028
  y2028ctx: 2028, y2028q: 2028, y2028followup: 2028,
  // 2029
  y2029ctx: 2029, y2029q: 2029, y2029followup: 2029,
  // recap + ballot
  recap: 2030, policyCtx: 2030, policy: 2030,
  // augmentation ending: 2031..2035
  end_augmentation_1: 2031,
  end_augmentation_2: 2032, end_augmentation_3: 2032, end_augmentation_3b: 2032,
  end_augmentation_4: 2033, end_augmentation_5: 2033,
  end_augmentation_6: 2034, end_augmentation_7: 2034,
  end_augmentation_final: 2035,
  // erosion
  end_erosion_1: 2031, end_erosion_2: 2032,
  end_erosion_2_ads: 2032, end_erosion_2_q: 2032,
  end_erosion_3: 2033, end_erosion_3b: 2033, end_erosion_3c: 2033,
  end_erosion_4: 2034, end_erosion_lose: 2034,
  end_erosion_final: 2035,
  // shrinkage
  end_shrinkage_0: 2031, end_shrinkage_1: 2031,
  end_shrinkage_2: 2032,
  end_shrinkage_3: 2033, end_shrinkage_notice: 2033,
  end_shrinkage_notice_a: 2033, end_shrinkage_notice_b: 2033,
  end_shrinkage_4: 2034,
  end_shrinkage_final: 2035,
  // pro-worker
  end_proworker_1: 2031, end_proworker_2: 2031,
  end_proworker_3: 2032, end_proworker_4: 2032,
  end_proworker_5: 2033, end_proworker_6: 2033,
  end_proworker_7: 2034,
  end_proworker_final: 2035,
  // appendix
  futures: 2035, policies: 2035,
};

export type Action =
  | { type: 'GO'; scene: SceneId }
  | { type: 'APPLY_EFFECTS'; effects: Effect[]; choice?: { year: number; id: string } }
  | { type: 'SET_NAME'; name: string }
  | { type: 'SET_AVATAR'; avatar: number }
  | { type: 'SET_YEAR'; year: number }
  | { type: 'SET_FOLLOWUP'; heading: string; body: string; next: SceneId }
  | { type: 'CLEAR_FOLLOWUP' }
  | { type: 'SET_PROWORKER_HELD'; held: 'yes' | 'no' }
  | { type: 'SET_POLICY_VOTE'; vote: Vote }
  | { type: 'SET_DIVIDEND_VOTE'; vote: Vote }
  | { type: 'SET_ENDING'; ending: PathKey }
  | { type: 'SET_AUG_CHOICE'; year: 2032 | 2034; choice: 'A' | 'B' }
  | { type: 'SET_VIEWING_FUTURE'; future: PathKey | null }
  | { type: 'SET_PREVIOUS_SCENE'; scene: SceneId | null }
  | { type: 'TEAM_LOSS'; member: TeamMember }
  | { type: 'APPLY_PROWORKER_BONUS' }
  | { type: 'RESET' }
  | { type: 'HYDRATE'; state: GameState };

export function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

export function applyEffects(s: GameState, effects: Effect[]): GameState {
  let next = { ...s, path: { ...s.path }, team: { ...s.team } };
  for (const e of effects) {
    if (e.path && typeof e.pathDelta === 'number') {
      next.path[e.path] = (next.path[e.path] ?? 0) + e.pathDelta;
    }
    if (typeof e.standingDelta === 'number') {
      next.standing = clamp(next.standing + e.standingDelta);
    }
    if (typeof e.sentimentDelta === 'number') {
      next.aiSentiment = clamp(next.aiSentiment + e.sentimentDelta);
    }
    if (e.teamLoss) {
      next.team[e.teamLoss] = false;
    }
    if (e.setProWorkerHeld) {
      next.proWorkerHeld = e.setProWorkerHeld;
    }
  }
  return next;
}

export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'GO': {
      const year = SCENE_YEAR[action.scene] ?? state.year;
      return {
        ...state,
        scene: action.scene,
        year,
        pagesSeen: Math.min(state.pagesSeen + 1, GAME_LENGTH),
      };
    }
    case 'APPLY_EFFECTS': {
      let next = applyEffects(state, action.effects);
      if (action.choice) {
        next = {
          ...next,
          history: [
            ...next.history,
            { year: action.choice.year, choice: action.choice.id, scene: state.scene },
          ],
        };
      }
      return next;
    }
    case 'SET_NAME':
      return { ...state, name: action.name };
    case 'SET_AVATAR':
      return { ...state, avatar: action.avatar };
    case 'SET_YEAR':
      return { ...state, year: action.year };
    case 'SET_FOLLOWUP':
      return {
        ...state,
        followup: { heading: action.heading, body: action.body, next: action.next },
      };
    case 'CLEAR_FOLLOWUP':
      return { ...state, followup: null };
    case 'SET_PROWORKER_HELD':
      return { ...state, proWorkerHeld: action.held };
    case 'SET_POLICY_VOTE':
      return { ...state, policyVote: action.vote };
    case 'SET_DIVIDEND_VOTE':
      return { ...state, aiDividendVote: action.vote };
    case 'SET_ENDING':
      return { ...state, endingPath: action.ending };
    case 'SET_AUG_CHOICE':
      return action.year === 2032
        ? { ...state, aug2032Choice: action.choice }
        : { ...state, aug2034Choice: action.choice };
    case 'SET_VIEWING_FUTURE':
      return { ...state, viewingFuture: action.future };
    case 'SET_PREVIOUS_SCENE':
      return { ...state, previousScene: action.scene };
    case 'TEAM_LOSS':
      return {
        ...state,
        team: { ...state.team, [action.member]: false },
      };
    case 'APPLY_PROWORKER_BONUS':
      if (state.proworkerBonusApplied) return state;
      return {
        ...state,
        standing: clamp(state.standing + 8),
        aiSentiment: clamp(state.aiSentiment - 12),
        proworkerBonusApplied: true,
      };
    case 'RESET':
      return createInitialState();
    case 'HYDRATE':
      return action.state;
    default:
      return state;
  }
}

export function getLeadingPath(state: GameState): PathKey {
  const entries = Object.entries(state.path) as [PathKey, number][];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}
