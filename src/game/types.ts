/* Game state and effect types. */

export type SceneId =
  | 'intro'
  | 'avatar'
  | 'promotion'
  | 'teamIntro'
  | 'y2025news'
  | 'y2025ctx'
  | 'y2025q'
  | 'y2025followup'
  | 'y2026news'
  | 'y2026ctx'
  | 'y2026q'
  | 'y2026followup'
  | 'y2027news'
  | 'y2027ctx'
  | 'y2027q'
  | 'y2027followup'
  | 'y2027proworker'
  | 'y2027proworkerYes'
  | 'y2027proworkerFollowup'
  | 'y2028ctx'
  | 'y2028q'
  | 'y2028followup'
  | 'y2029ctx'
  | 'y2029q'
  | 'y2029followup'
  | 'recap'
  | 'policyCtx'
  | 'policy'
  | 'end_augmentation_1'
  | 'end_augmentation_2'
  | 'end_augmentation_3'
  | 'end_augmentation_3b'
  | 'end_augmentation_4'
  | 'end_augmentation_4_ads'
  | 'end_augmentation_5'
  | 'end_augmentation_6'
  | 'end_augmentation_7'
  | 'end_augmentation_final'
  | 'end_erosion_1'
  | 'end_erosion_2'
  | 'end_erosion_2_ads'
  | 'end_erosion_2_q'
  | 'end_erosion_3'
  | 'end_erosion_3b'
  | 'end_erosion_3c'
  | 'end_erosion_4'
  | 'end_erosion_lose'
  | 'end_erosion_final'
  | 'end_shrinkage_0'
  | 'end_shrinkage_1'
  | 'end_shrinkage_2'
  | 'end_shrinkage_3'
  | 'end_shrinkage_notice'
  | 'end_shrinkage_notice_a'
  | 'end_shrinkage_notice_b'
  | 'end_shrinkage_4'
  | 'end_shrinkage_final'
  | 'end_proworker_1'
  | 'end_proworker_2'
  | 'end_proworker_3'
  | 'end_proworker_4'
  | 'end_proworker_5'
  | 'end_proworker_6'
  | 'end_proworker_7'
  | 'end_proworker_final'
  | 'futures'
  | 'policies';

export type PathKey = 'augmentation' | 'shrinkage' | 'erosion' | 'proworker';

export type TeamMember = 'priya' | 'samarth' | 'marcus' | 'jade' | 'willow';

export type Vote = 'for' | 'against' | 'abstain' | 'yes' | 'no';

export interface Effect {
  path?: PathKey;
  pathDelta?: number;
  standingDelta?: number;
  notification?: string;
  teamLoss?: TeamMember;
  setProWorkerHeld?: 'yes' | 'no';
}

export interface HistoryEntry {
  year: number;
  choice: string;
  scene?: SceneId;
}

export interface AvatarConfig {
  skin: number;
  hair: number;
  hairColor: number;
  shirt: number;
  age: number;
}

export interface GameState {
  scene: SceneId;
  name: string;
  avatar: number; // legacy 1..8 (still used in some scenes as a fallback)
  /** Custom-built pixel avatar from the AvatarScene customizer. When present,
   *  scenes should render this instead of the legacy `avatar` png. */
  avatarConfig: AvatarConfig | null;
  standing: number; // 0..100
  year: number;
  path: Record<PathKey, number>;
  history: HistoryEntry[];
  endingPath: PathKey | null;
  team: Record<TeamMember, boolean>;
  proWorkerHeld: 'yes' | 'no' | null;
  policyVote: Vote | null;
  aiDividendVote: Vote | null;
  pagesSeen: number;
  // small per-ending branch trackers
  aug2032Choice: 'A' | 'B' | null;
  aug2034Choice: 'A' | 'B' | null;
  followup: { heading: string; body: string; next: SceneId } | null;
  /** Transient: which future tab to pre-select when the user navigates to
   *  the futures diagram from the ending carousel "see how they got here"
   *  button. Null falls back to endingPath. */
  viewingFuture: PathKey | null;
  /** Transient: the scene the user was on before navigating to the futures
   *  or policies appendix screens, so the "back" button can return there. */
  previousScene: SceneId | null;
  /** Set once when the pro-worker 2031 bonus is applied; prevents re-application after Resume. */
  proworkerBonusApplied: boolean;
  /** Per-game-run UUID. Used to group analytics events for one play-through; regenerated on RESET. */
  gameId: string;
}

export const GAME_LENGTH = 18;

function newGameId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `g_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function createInitialState(): GameState {
  return {
    scene: 'intro',
    name: '',
    avatar: 1,
    avatarConfig: null,
    standing: 50,
    year: 2025,
    path: { augmentation: 0, shrinkage: 0, erosion: 0, proworker: 0 },
    history: [],
    endingPath: null,
    team: { priya: true, samarth: true, marcus: true, jade: true, willow: true },
    proWorkerHeld: null,
    policyVote: null,
    aiDividendVote: null,
    pagesSeen: 0,
    aug2032Choice: null,
    aug2034Choice: null,
    followup: null,
    viewingFuture: null,
    previousScene: null,
    proworkerBonusApplied: false,
    gameId: newGameId(),
  };
}
