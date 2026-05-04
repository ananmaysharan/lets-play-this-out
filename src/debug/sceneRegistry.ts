/**
 * Scene registry for the /debug map. One source of truth for:
 *  - which scenes exist
 *  - human-readable titles (shown above each thumbnail)
 *  - canvas (x, y) layout coords
 *  - mock state overrides so each thumbnail renders accurately
 *  - edges (transitions) for the flowchart arrows
 */
import type { Edge, Node } from '@xyflow/react';
import type { GameState, SceneId } from '@/game/types';

export type SceneNodeData = {
  title: string;
  group:
    | 'setup'
    | '2025'
    | '2026'
    | '2027'
    | '2028'
    | '2029'
    | 'recap'
    | 'augmentation'
    | 'erosion'
    | 'shrinkage'
    | 'proworker'
    | 'appendix';
  mockState?: Partial<GameState>;
};

const COL = 420;
const ROW = 300;

// Year columns (0..6) + recap col (7) + ending cols (8..16) + appendix col (17)
const x = (col: number) => col * COL;
const y = (row: number) => row * ROW;

// Mock state presets shared across many scenes.
const namedPlayer: Partial<GameState> = { name: 'You', avatar: 1 };

const followupMock = (heading: string, body: string, next: SceneId): Partial<GameState> => ({
  ...namedPlayer,
  followup: { heading, body, next },
});

const augMock: Partial<GameState> = {
  ...namedPlayer,
  endingPath: 'augmentation',
  standing: 62,
  path: { augmentation: 8, shrinkage: 2, erosion: 1, proworker: 3 },
  aug2032Choice: 'A',
  aug2034Choice: 'B',
};

const erosionMock: Partial<GameState> = {
  ...namedPlayer,
  endingPath: 'erosion',
  standing: 28,
  path: { augmentation: 1, shrinkage: 3, erosion: 5, proworker: 0 },
};

const shrinkageMock: Partial<GameState> = {
  ...namedPlayer,
  endingPath: 'shrinkage',
  standing: 78,
  path: { augmentation: 2, shrinkage: 9, erosion: 1, proworker: 0 },
  team: { priya: false, samarth: false, marcus: false, jade: true, willow: false },
};

const proworkerMock: Partial<GameState> = {
  ...namedPlayer,
  endingPath: 'proworker',
  standing: 42,
  path: { augmentation: 3, shrinkage: 1, erosion: 1, proworker: 12 },
  proWorkerHeld: 'yes',
};

// Vertical "lanes" for the four endings, after the policy column.
const AUG_Y = -200;
const EROSION_Y = 600;
const SHRINK_Y = 1200;
const PROWORK_Y = 1800;

export const sceneNodes: Node<SceneNodeData>[] = [
  // ---------- SETUP (col 0) ----------
  { id: 'intro',     type: 'sceneThumb', position: { x: x(0), y: y(0) }, data: { title: 'Intro · Splash',          group: 'setup' } },
  { id: 'avatar',    type: 'sceneThumb', position: { x: x(0), y: y(1) }, data: { title: 'Avatar Select',           group: 'setup' } },
  { id: 'promotion', type: 'sceneThumb', position: { x: x(0), y: y(2) }, data: { title: 'Day One · Promotion',     group: 'setup', mockState: namedPlayer } },
  { id: 'teamIntro', type: 'sceneThumb', position: { x: x(0), y: y(3) }, data: { title: 'The Team',                group: 'setup', mockState: namedPlayer } },

  // ---------- 2025 (col 1) ----------
  { id: 'y2025news',     type: 'sceneThumb', position: { x: x(1), y: y(0) }, data: { title: '2025 · News (MIT)',                  group: '2025', mockState: namedPlayer } },
  { id: 'y2025ctx',      type: 'sceneThumb', position: { x: x(1), y: y(1) }, data: { title: '2025 · The Deck Drop',               group: '2025', mockState: namedPlayer } },
  { id: 'y2025q',        type: 'sceneThumb', position: { x: x(1), y: y(2) }, data: { title: '2025 · Q · Team Direction',          group: '2025', mockState: namedPlayer } },
  { id: 'y2025followup', type: 'sceneThumb', position: { x: x(1), y: y(3) }, data: { title: '2025 · Followup',                    group: '2025', mockState: followupMock('Follow-up', "Alex doesn't think this is solid enough. But you're new — it's not held against you. Yet.", 'y2026news') } },

  // ---------- 2026 (col 2) ----------
  { id: 'y2026news',     type: 'sceneThumb', position: { x: x(2), y: y(0) }, data: { title: '2026 · News (FlowMetrics)',          group: '2026', mockState: namedPlayer } },
  { id: 'y2026ctx',      type: 'sceneThumb', position: { x: x(2), y: y(1) }, data: { title: '2026 · FlowMetrics Memo',            group: '2026', mockState: namedPlayer } },
  { id: 'y2026q',        type: 'sceneThumb', position: { x: x(2), y: y(2) }, data: { title: '2026 · Q · Dashboard Response',      group: '2026', mockState: namedPlayer } },
  { id: 'y2026followup', type: 'sceneThumb', position: { x: x(2), y: y(3) }, data: { title: '2026 · Followup',                    group: '2026', mockState: followupMock('Follow-up', 'The team adjusts. Some days it feels like surveillance, others like progress.', 'y2027news') } },

  // ---------- 2027 main (col 3) ----------
  { id: 'y2027news',     type: 'sceneThumb', position: { x: x(3), y: y(0) }, data: { title: '2027 · News',                        group: '2027', mockState: namedPlayer } },
  { id: 'y2027ctx',      type: 'sceneThumb', position: { x: x(3), y: y(1) }, data: { title: '2027 · Headcount Review',            group: '2027', mockState: namedPlayer } },
  { id: 'y2027q',        type: 'sceneThumb', position: { x: x(3), y: y(2) }, data: { title: '2027 · Q · Augment / Cut / Field',   group: '2027', mockState: namedPlayer } },
  { id: 'y2027followup', type: 'sceneThumb', position: { x: x(3), y: y(3) }, data: { title: '2027 · Followup',                    group: '2027', mockState: followupMock('Follow-up', 'Alex makes a note. The team noticed too.', 'y2028ctx') } },

  // ---------- 2027 branch (col 4) ----------
  { id: 'y2027proworker',         type: 'sceneThumb', position: { x: x(4), y: y(2) }, data: { title: '2027 · Pro-Worker Confront', group: '2027', mockState: namedPlayer } },
  { id: 'y2027proworkerYes',      type: 'sceneThumb', position: { x: x(4), y: y(3) }, data: { title: '2027 · Hold or Back Down',   group: '2027', mockState: namedPlayer } },
  { id: 'y2027proworkerFollowup', type: 'sceneThumb', position: { x: x(4), y: y(4) }, data: { title: '2027 · Pro-Worker Followup', group: '2027', mockState: followupMock('Follow-up', 'You held position. Alex moves on, but the room got colder.', 'y2028ctx') } },

  // ---------- 2028 (col 5) ----------
  { id: 'y2028ctx',      type: 'sceneThumb', position: { x: x(5), y: y(0) }, data: { title: '2028 · Gillette Rescue',             group: '2028', mockState: namedPlayer } },
  { id: 'y2028q',        type: 'sceneThumb', position: { x: x(5), y: y(1) }, data: { title: '2028 · Q · Voice / Personal / Auto', group: '2028', mockState: namedPlayer } },
  { id: 'y2028followup', type: 'sceneThumb', position: { x: x(5), y: y(2) }, data: { title: '2028 · Followup',                    group: '2028', mockState: followupMock('Follow-up', 'Gillette stays. The agency holds together — for now.', 'y2029ctx') } },

  // ---------- 2029 (col 6) ----------
  { id: 'y2029ctx',      type: 'sceneThumb', position: { x: x(6), y: y(0) }, data: { title: '2029 · The Margin Conversation',     group: '2029', mockState: namedPlayer } },
  { id: 'y2029q',        type: 'sceneThumb', position: { x: x(6), y: y(1) }, data: { title: '2029 · Q · Director / Raise / Train', group: '2029', mockState: namedPlayer } },
  { id: 'y2029followup', type: 'sceneThumb', position: { x: x(6), y: y(2) }, data: { title: '2029 · Followup',                    group: '2029', mockState: followupMock('Follow-up', 'A choice with weight. The decade is almost done.', 'recap') } },

  // ---------- RECAP / POLICY (col 7) ----------
  { id: 'recap',     type: 'sceneThumb', position: { x: x(7), y: y(0) }, data: { title: '2030 · Recap',         group: 'recap', mockState: { ...namedPlayer, path: { augmentation: 6, shrinkage: 2, erosion: 1, proworker: 3 } } } },
  { id: 'policyCtx', type: 'sceneThumb', position: { x: x(7), y: y(1) }, data: { title: '2030 · Ballot Context', group: 'recap', mockState: namedPlayer } },
  { id: 'policy',    type: 'sceneThumb', position: { x: x(7), y: y(2) }, data: { title: '2030 · Ballot Vote',    group: 'recap', mockState: namedPlayer } },

  // ---------- AUGMENTATION ENDING (lane y = AUG_Y) ----------
  { id: 'end_augmentation_1',     type: 'sceneThumb', position: { x: x(8),  y: AUG_Y         }, data: { title: 'Augmentation · 2031',          group: 'augmentation', mockState: augMock } },
  { id: 'end_augmentation_2',     type: 'sceneThumb', position: { x: x(9),  y: AUG_Y         }, data: { title: 'Augmentation · 2032 Q',        group: 'augmentation', mockState: augMock } },
  { id: 'end_augmentation_3',     type: 'sceneThumb', position: { x: x(10), y: AUG_Y - 90    }, data: { title: 'Aug · 2032 (A · Review)',      group: 'augmentation', mockState: augMock } },
  { id: 'end_augmentation_3b',    type: 'sceneThumb', position: { x: x(10), y: AUG_Y + 110   }, data: { title: 'Aug · 2032 (B · Skip Review)', group: 'augmentation', mockState: { ...augMock, aug2032Choice: 'B' } } },
  { id: 'end_augmentation_4',     type: 'sceneThumb', position: { x: x(11), y: AUG_Y         }, data: { title: 'Augmentation · 2033 News',     group: 'augmentation', mockState: augMock } },
  { id: 'end_augmentation_4_ads', type: 'sceneThumb', position: { x: x(11.5), y: AUG_Y - 110 }, data: { title: 'Augmentation · 2033 Ads',      group: 'augmentation', mockState: augMock } },
  { id: 'end_augmentation_5',     type: 'sceneThumb', position: { x: x(12), y: AUG_Y         }, data: { title: 'Augmentation · 2033 Damage',   group: 'augmentation', mockState: augMock } },
  { id: 'end_augmentation_6',     type: 'sceneThumb', position: { x: x(13), y: AUG_Y         }, data: { title: 'Augmentation · 2034 Pivot Q',  group: 'augmentation', mockState: augMock } },
  { id: 'end_augmentation_7',     type: 'sceneThumb', position: { x: x(14), y: AUG_Y         }, data: { title: 'Augmentation · 2034 Working',  group: 'augmentation', mockState: augMock } },
  { id: 'end_augmentation_final', type: 'sceneThumb', position: { x: x(15), y: AUG_Y         }, data: { title: 'Augmentation · 2035 FINAL',    group: 'augmentation', mockState: augMock } },

  // ---------- EROSION ENDING (lane y = EROSION_Y) ----------
  { id: 'end_erosion_1',       type: 'sceneThumb', position: { x: x(8),  y: EROSION_Y       }, data: { title: 'Erosion · 2031',                group: 'erosion', mockState: erosionMock } },
  { id: 'end_erosion_2',       type: 'sceneThumb', position: { x: x(9),  y: EROSION_Y       }, data: { title: 'Erosion · 2032 News',           group: 'erosion', mockState: erosionMock } },
  { id: 'end_erosion_2_ads',   type: 'sceneThumb', position: { x: x(10), y: EROSION_Y       }, data: { title: 'Erosion · 2032 Ads',            group: 'erosion', mockState: erosionMock } },
  { id: 'end_erosion_2_q',     type: 'sceneThumb', position: { x: x(11), y: EROSION_Y       }, data: { title: 'Erosion · 2032 Q',              group: 'erosion', mockState: erosionMock } },
  { id: 'end_erosion_3',       type: 'sceneThumb', position: { x: x(12), y: EROSION_Y - 90  }, data: { title: 'Erosion · 2033 (A · Reviewer)', group: 'erosion', mockState: erosionMock } },
  { id: 'end_erosion_3b',      type: 'sceneThumb', position: { x: x(12), y: EROSION_Y + 110 }, data: { title: 'Erosion · 2033 (B · Solo)',     group: 'erosion', mockState: erosionMock } },
  { id: 'end_erosion_3c',      type: 'sceneThumb', position: { x: x(13), y: EROSION_Y       }, data: { title: 'Erosion · 2033 New Rhythm',     group: 'erosion', mockState: erosionMock } },
  { id: 'end_erosion_4',       type: 'sceneThumb', position: { x: x(14), y: EROSION_Y       }, data: { title: 'Erosion · 2034 Paycut Q',       group: 'erosion', mockState: erosionMock } },
  { id: 'end_erosion_lose',    type: 'sceneThumb', position: { x: x(15), y: EROSION_Y + 110 }, data: { title: 'Erosion · 2034 LOSE',           group: 'erosion', mockState: erosionMock } },
  { id: 'end_erosion_final',   type: 'sceneThumb', position: { x: x(15), y: EROSION_Y - 90  }, data: { title: 'Erosion · 2035 FINAL',          group: 'erosion', mockState: erosionMock } },

  // ---------- SHRINKAGE ENDING (lane y = SHRINK_Y) ----------
  { id: 'end_shrinkage_0',         type: 'sceneThumb', position: { x: x(8),  y: SHRINK_Y       }, data: { title: 'Shrinkage · 2031 News',         group: 'shrinkage', mockState: shrinkageMock } },
  { id: 'end_shrinkage_1',         type: 'sceneThumb', position: { x: x(9),  y: SHRINK_Y       }, data: { title: 'Shrinkage · 2031 Memo',         group: 'shrinkage', mockState: shrinkageMock } },
  { id: 'end_shrinkage_2',         type: 'sceneThumb', position: { x: x(10), y: SHRINK_Y       }, data: { title: 'Shrinkage · 2032',              group: 'shrinkage', mockState: shrinkageMock } },
  { id: 'end_shrinkage_3',         type: 'sceneThumb', position: { x: x(11), y: SHRINK_Y       }, data: { title: 'Shrinkage · 2033 Q',            group: 'shrinkage', mockState: shrinkageMock } },
  { id: 'end_shrinkage_notice',    type: 'sceneThumb', position: { x: x(12), y: SHRINK_Y       }, data: { title: 'Shrinkage · The Notice',        group: 'shrinkage', mockState: shrinkageMock } },
  { id: 'end_shrinkage_notice_a',  type: 'sceneThumb', position: { x: x(13), y: SHRINK_Y - 90  }, data: { title: 'Shrinkage · Notice A',          group: 'shrinkage', mockState: shrinkageMock } },
  { id: 'end_shrinkage_notice_b',  type: 'sceneThumb', position: { x: x(13), y: SHRINK_Y + 110 }, data: { title: 'Shrinkage · Notice B',          group: 'shrinkage', mockState: shrinkageMock } },
  { id: 'end_shrinkage_4',         type: 'sceneThumb', position: { x: x(14), y: SHRINK_Y       }, data: { title: 'Shrinkage · 2034',              group: 'shrinkage', mockState: shrinkageMock } },
  { id: 'end_shrinkage_final',     type: 'sceneThumb', position: { x: x(15), y: SHRINK_Y       }, data: { title: 'Shrinkage · 2035 FINAL',        group: 'shrinkage', mockState: shrinkageMock } },

  // ---------- PRO-WORKER ENDING (lane y = PROWORK_Y) ----------
  { id: 'end_proworker_1',     type: 'sceneThumb', position: { x: x(8),  y: PROWORK_Y }, data: { title: 'Pro-Worker · 2031 (1)',      group: 'proworker', mockState: proworkerMock } },
  { id: 'end_proworker_2',     type: 'sceneThumb', position: { x: x(9),  y: PROWORK_Y }, data: { title: 'Pro-Worker · 2031 (2)',      group: 'proworker', mockState: proworkerMock } },
  { id: 'end_proworker_3',     type: 'sceneThumb', position: { x: x(10), y: PROWORK_Y }, data: { title: 'Pro-Worker · 2032 (3)',      group: 'proworker', mockState: proworkerMock } },
  { id: 'end_proworker_4',     type: 'sceneThumb', position: { x: x(11), y: PROWORK_Y }, data: { title: 'Pro-Worker · 2032 (4)',      group: 'proworker', mockState: proworkerMock } },
  { id: 'end_proworker_5',     type: 'sceneThumb', position: { x: x(12), y: PROWORK_Y }, data: { title: 'Pro-Worker · 2033 (5)',      group: 'proworker', mockState: proworkerMock } },
  { id: 'end_proworker_6',     type: 'sceneThumb', position: { x: x(13), y: PROWORK_Y }, data: { title: 'Pro-Worker · 2033 (6)',      group: 'proworker', mockState: proworkerMock } },
  { id: 'end_proworker_7',     type: 'sceneThumb', position: { x: x(14), y: PROWORK_Y }, data: { title: 'Pro-Worker · 2034 (7)',      group: 'proworker', mockState: proworkerMock } },
  { id: 'end_proworker_final', type: 'sceneThumb', position: { x: x(15), y: PROWORK_Y }, data: { title: 'Pro-Worker · 2035 FINAL',    group: 'proworker', mockState: proworkerMock } },

  // ---------- APPENDIX (col 17) ----------
  { id: 'futures',  type: 'sceneThumb', position: { x: x(17), y: y(2) }, data: { title: 'Compare Futures (2035)', group: 'appendix' } },
  { id: 'policies', type: 'sceneThumb', position: { x: x(17), y: y(3) }, data: { title: 'Policies (2035)',        group: 'appendix' } },
];

const e = (source: SceneId, target: SceneId, opts?: { animated?: boolean }): Edge => ({
  id: `${source}__${target}`,
  source,
  target,
  animated: opts?.animated ?? false,
  type: 'smoothstep',
});

export const sceneEdges: Edge[] = [
  // setup → 2025
  e('intro', 'avatar'),
  e('avatar', 'promotion'),
  e('promotion', 'teamIntro'),
  e('teamIntro', 'y2025news'),

  // 2025
  e('y2025news', 'y2025ctx'),
  e('y2025ctx', 'y2025q'),
  e('y2025q', 'y2025followup'),
  e('y2025followup', 'y2026news'),

  // 2026
  e('y2026news', 'y2026ctx'),
  e('y2026ctx', 'y2026q'),
  e('y2026q', 'y2026followup'),
  e('y2026followup', 'y2027news'),

  // 2027
  e('y2027news', 'y2027ctx'),
  e('y2027ctx', 'y2027q'),
  e('y2027q', 'y2027followup'),
  e('y2027q', 'y2027proworker', { animated: true }), // C-choice branch
  e('y2027followup', 'y2028ctx'),
  e('y2027proworker', 'y2027proworkerYes'),
  e('y2027proworkerYes', 'y2027proworkerFollowup'),
  e('y2027proworkerFollowup', 'y2028ctx'),

  // 2028
  e('y2028ctx', 'y2028q'),
  e('y2028q', 'y2028followup'),
  e('y2028followup', 'y2029ctx'),

  // 2029
  e('y2029ctx', 'y2029q'),
  e('y2029q', 'y2029followup'),
  e('y2029followup', 'recap'),

  // recap → policyCtx → policy → 4 endings
  e('recap', 'policyCtx'),
  e('policyCtx', 'policy'),
  e('policy', 'end_augmentation_1', { animated: true }),
  e('policy', 'end_erosion_1',      { animated: true }),
  e('policy', 'end_shrinkage_0',    { animated: true }),
  e('policy', 'end_proworker_1',    { animated: true }),

  // augmentation
  e('end_augmentation_1', 'end_augmentation_2'),
  e('end_augmentation_2', 'end_augmentation_3'),
  e('end_augmentation_2', 'end_augmentation_3b'),
  e('end_augmentation_3', 'end_augmentation_4'),
  e('end_augmentation_3b', 'end_augmentation_4'),
  e('end_augmentation_4', 'end_augmentation_4_ads'),
  e('end_augmentation_4_ads', 'end_augmentation_5'),
  e('end_augmentation_5', 'end_augmentation_6'),
  e('end_augmentation_6', 'end_augmentation_7'),
  e('end_augmentation_7', 'end_augmentation_final'),

  // erosion
  e('end_erosion_1', 'end_erosion_2'),
  e('end_erosion_2', 'end_erosion_2_ads'),
  e('end_erosion_2_ads', 'end_erosion_2_q'),
  e('end_erosion_2_q', 'end_erosion_3'),
  e('end_erosion_2_q', 'end_erosion_3b'),
  e('end_erosion_3', 'end_erosion_3c'),
  e('end_erosion_3b', 'end_erosion_3c'),
  e('end_erosion_3c', 'end_erosion_4'),
  e('end_erosion_4', 'end_erosion_final'),
  e('end_erosion_4', 'end_erosion_lose'),

  // shrinkage
  e('end_shrinkage_0', 'end_shrinkage_1'),
  e('end_shrinkage_1', 'end_shrinkage_2'),
  e('end_shrinkage_2', 'end_shrinkage_3'),
  e('end_shrinkage_3', 'end_shrinkage_notice'),
  e('end_shrinkage_notice', 'end_shrinkage_notice_a'),
  e('end_shrinkage_notice', 'end_shrinkage_notice_b'),
  e('end_shrinkage_notice_a', 'end_shrinkage_4'),
  e('end_shrinkage_notice_b', 'end_shrinkage_4'),
  e('end_shrinkage_4', 'end_shrinkage_final'),

  // pro-worker
  e('end_proworker_1', 'end_proworker_2'),
  e('end_proworker_2', 'end_proworker_3'),
  e('end_proworker_3', 'end_proworker_4'),
  e('end_proworker_4', 'end_proworker_5'),
  e('end_proworker_5', 'end_proworker_6'),
  e('end_proworker_6', 'end_proworker_7'),
  e('end_proworker_7', 'end_proworker_final'),

  // any final → futures (appendix)
  e('end_augmentation_final', 'futures'),
  e('end_erosion_final',      'futures'),
  e('end_shrinkage_final',    'futures'),
  e('end_proworker_final',    'futures'),
  e('futures', 'policies'),
];

// Set used by the SceneJumpHandler to validate ?scene= params.
export const VALID_SCENE_IDS: ReadonlySet<string> = new Set(sceneNodes.map((n) => n.id));
