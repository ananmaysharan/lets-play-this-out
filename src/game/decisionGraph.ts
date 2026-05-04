/**
 * Single source of truth for the game's choice graph.
 *
 * - MAIN_DECISIONS: years 2025–2029, the path-determining decisions.
 *   Each choice carries the same `effects` array that `YxxxxQScene` used
 *   to dispatch inline, plus the followup heading/body and the routing
 *   `next` scene. Year scenes import from here so visualization (the
 *   futures diagram) and gameplay never drift.
 *
 * - BALLOT_2030: the policy ballot. Choices are `for | against | abstain`.
 *
 * - BRANCH_DECISIONS: per-ending year-by-year breakdown for 2031–2034.
 *   Used only for the futures diagram (the ending scenes themselves
 *   keep their own UX). Most years are linear (single "continue" step);
 *   real branch points (Aug 2032/2034, Erosion 2032/2034, Pro-worker
 *   2032 dividend ballot) list their actual options.
 */

import type {
  Effect,
  GameState,
  HistoryEntry,
  PathKey,
  SceneId,
  Vote,
} from './types';

export type ChoiceColor =
  | 'teal'
  | 'mustard'
  | 'terracotta'
  | 'forest'
  | 'orange'
  | 'pink';

export interface DecisionChoice {
  id: string;
  title: string;
  description: string;
  /** ≤80-char one-line summary used in the futures diagram side panel.
   *  e.g. "Push the team to use AI". Falls back to title if absent. */
  summary?: string;
  color: ChoiceColor;
  /** Which ending this choice nudges most. Used by buildSamplePath. */
  primaryPath: PathKey;
  /** Game-mechanical effects (path/standing/sentiment/teamLoss). */
  effects: Effect[];
  /** Followup heading/body shown by FollowupScene. */
  followupHeading?: string;
  followupBody?: string;
  /** Where to go after the followup. Some choices route to a side branch. */
  next: SceneId;
}

export interface YearDecision {
  year: number;
  sceneId: SceneId;
  decisionLabel: string;
  promptShort: string;
  choices: DecisionChoice[];
}

/* ---------------------------------------------------------------- 2025 */

const Y2025: YearDecision = {
  year: 2025,
  sceneId: 'y2025q',
  decisionLabel: 'Team Direction',
  promptShort: 'What do you tell Alex about your team’s AI direction?',
  choices: [
    {
      id: 'A',
      title: 'BUSINESS AS USUAL',
      summary: 'Let the team use AI as they see fit',
      description:
        'Each person uses AI as they see fit — drafts, summaries, notes — but everyone is still responsible for their own output.',
      color: 'teal',
      primaryPath: 'augmentation',
      effects: [
        { path: 'augmentation', pathDelta: 1, standingDelta: -3, sentimentDelta: 0 },
      ],
      followupHeading: 'Follow-up',
      followupBody:
        'Alex asks if this is what you call "getting ahead of something". She’s not impressed. But you’re still new to being a manager, so it’s not held against you yet…',
      next: 'y2026news',
    },
    {
      id: 'B',
      title: 'TAKE INITIATIVE',
      summary: 'Push the team to use AI',
      description:
        'Push the team to use AI to speed up output across the board. You could use some early impact on your first year on the job.',
      color: 'mustard',
      primaryPath: 'shrinkage',
      effects: [
        {
          path: 'shrinkage',
          pathDelta: 2,
          standingDelta: 10,
          sentimentDelta: 8,
          notification: 'STANDING ↑ AI CLIMATE ↑',
        },
      ],
      followupHeading: 'Follow-up',
      followupBody:
        "Your team’s Q2 output is top-notch. Strong numbers your first year? That’s how you get noticed. You’re on Alex’s radar as a leader who gets it.",
      next: 'y2026news',
    },
    {
      id: 'C',
      title: 'PUMP THE BRAKES',
      summary: 'Hold the team back from AI',
      description:
        "Tell your team to be cautious of using AI especially when client-sensitive data is involved. You don't outlaw it, but you're skeptical.",
      color: 'forest',
      primaryPath: 'proworker',
      effects: [
        {
          path: 'proworker',
          pathDelta: 2,
          standingDelta: -10,
          sentimentDelta: -5,
          notification: 'STANDING ↓ AI CLIMATE ↓',
        },
      ],
      followupHeading: 'Follow-up',
      followupBody:
        "You tell Alex the team can use AI tools, but raise concerns about creativity and client data. She listens, but you’re on thin ice — and it’s only been a little while since you started this job.",
      next: 'y2026news',
    },
  ],
};

/* ---------------------------------------------------------------- 2026 */

const Y2026: YearDecision = {
  year: 2026,
  sceneId: 'y2026q',
  decisionLabel: 'FlowMetrics Response',
  promptShort: 'The FlowMetrics leaderboard is live. What do you do?',
  choices: [
    {
      id: 'A',
      title: 'ADD CONTEXT',
      summary: 'Defend the metric with qualitative client work',
      description:
        'Tell your team efficiency matters, but good marketing requires judgment. Pull late nights gathering qualitative client feedback manually to show Alex the impact of your work.',
      color: 'teal',
      primaryPath: 'proworker',
      effects: [
        { path: 'proworker', pathDelta: 1, standingDelta: -2, sentimentDelta: -2 },
        { path: 'augmentation', pathDelta: 1 },
      ],
      followupHeading: 'Follow-up · Added Context',
      followupBody:
        'Your FlowMetric rank hasn’t improved, but you show Alex strong client feedback numbers in defense of what you call "high-quality slow work." She’s impressed you stayed late, but frustrated you’re not prioritizing the FlowMetrics data. These extra hours are definitely not going to get you a bonus!',
      next: 'y2027news',
    },
    {
      id: 'B',
      title: 'LEAN INTO THE DASHBOARD',
      summary: 'Set output velocity as a North Star metric',
      description:
        'Set output velocity as a North Star metric. Team goal: top 3 rank by Q3.',
      color: 'mustard',
      primaryPath: 'shrinkage',
      effects: [
        {
          path: 'shrinkage',
          pathDelta: 2,
          standingDelta: 8,
          sentimentDelta: 5,
          notification: 'STANDING ↑',
        },
        { path: 'erosion', pathDelta: 1 },
      ],
      followupHeading: 'Follow-up · Lean Into the Dashboard',
      followupBody:
        'Priya, your most junior employee, builds AI templates for campaign assets that let your team hit the goal. Some workflows are now almost AI from start to end. Your team jumps to #2. Alex notices. Another promotion feels within reach.',
      next: 'y2027news',
    },
    {
      id: 'B2',
      title: 'TAKE INITIATIVE',
      summary: 'Tie Q4 bonuses to output velocity',
      description:
        'Go to Alex and propose tying Q4 bonuses to individual output velocity scores. You know what keeps your team motivated.',
      color: 'orange',
      primaryPath: 'erosion',
      effects: [
        {
          path: 'erosion',
          pathDelta: 3,
          standingDelta: 10,
          sentimentDelta: 8,
          notification: 'STANDING ↑↑ AI CLIMATE ↑',
        },
      ],
      followupHeading: 'Follow-up · Bonuses Tied to Velocity',
      followupBody:
        'Alex is impressed by your initiative. You’re no longer just a manager who follows direction, you’re one who sets it.',
      next: 'y2027news',
    },
    {
      id: 'C',
      title: 'PUSH BACK ON THE METRIC',
      summary: 'Argue FlowMetrics is dangerous for creative work',
      description:
        'Request a meeting with Alex and HR. Argue FlowMetrics is a dangerous metric for creative work.',
      color: 'forest',
      primaryPath: 'proworker',
      effects: [
        {
          path: 'proworker',
          pathDelta: 3,
          standingDelta: -8,
          sentimentDelta: -6,
          notification: 'STANDING ↓ AI CLIMATE ↓',
        },
      ],
      followupHeading: 'Follow-up · Push Back on the Metric',
      followupBody:
        "Alex pushes back hard. You win a partial concession: FlowMetrics won’t be used in performance reviews — for now. But watch out! You’ve spent some political capital and your team has now fallen to #9 in FlowMetrics rankings.",
      next: 'y2027news',
    },
  ],
};

/* ---------------------------------------------------------------- 2027 */

const Y2027: YearDecision = {
  year: 2027,
  sceneId: 'y2027q',
  decisionLabel: 'Headcount Review',
  promptShort: 'What’s your recommendation on headcount?',
  choices: [
    {
      id: 'A',
      title: 'KEEP HUMANS IN THE LOOP',
      summary: 'Keep juniors as AI editors',
      description:
        'AI output needs managing. Someone has to catch errors, maintain brand voice, keep the quality bar from quietly dropping.',
      color: 'teal',
      primaryPath: 'augmentation',
      effects: [{ path: 'augmentation', pathDelta: 3, standingDelta: 2 }],
      followupHeading: 'Follow-up · Humans in the Loop',
      followupBody:
        'Junior staff are now acting as AI output editors that keep the work trustworthy. Alex is satisfied with your AI usage, but says headcount will be reviewed again next quarter.',
      next: 'y2028ctx',
    },
    {
      id: 'B',
      title: 'MAKE THE TOUGH CALL',
      summary: 'Fire Samarth',
      description:
        'Your least effective junior, Samarth, has terrible FlowMetrics scores. An agentic tool can already cover ~75% of his work.',
      color: 'orange',
      primaryPath: 'shrinkage',
      effects: [
        {
          path: 'shrinkage',
          pathDelta: 3,
          standingDelta: 8,
          sentimentDelta: 5,
          notification: 'STANDING ↑',
        },
        { teamLoss: 'samarth' },
      ],
      followupHeading: 'Follow-up · The Tough Call',
      followupBody:
        'Your Q4 numbers look excellent. Alex is happy with your work and your team is on track to be one of the top performers this year. However, some of the other members of the team were sad to lose Samarth…',
      next: 'y2028ctx',
    },
    {
      id: 'C',
      title: 'SEND THEM INTO THE FIELD',
      summary: 'Redesign juniors as field correspondents',
      description:
        'Refuse to cut anyone. Instead, redesign the junior roles entirely and send them out daily as on-the-ground cultural correspondents.',
      color: 'forest',
      primaryPath: 'proworker',
      effects: [
        {
          path: 'proworker',
          pathDelta: 4,
          standingDelta: -12,
          sentimentDelta: -4,
          notification: 'STANDING ↓↓ AI CLIMATE ↓',
        },
      ],
      followupHeading: 'Follow-up · Into the Field',
      followupBody:
        "Your juniors come back with real conversations, real places, and real human insight that no model can scrape. It’s good stuff. But your standing is on thin ice, and you might be next out the door…",
      // The C-choice routes the followup’s "next" to the proworker side-branch.
      next: 'y2027proworker',
    },
  ],
};

/* ---------------------------------------------------------------- 2028 */

const Y2028: YearDecision = {
  year: 2028,
  sceneId: 'y2028q',
  decisionLabel: 'Gillette Rescue',
  promptShort: 'Your biggest client is fading. What’s your plan?',
  choices: [
    {
      id: 'A',
      title: 'AUTOMATE SMARTER',
      summary: 'Give every team member an AI "twin"',
      description:
        'You build a dual workflow: every member on your team has an AI "twin" that is available to answer questions at all times. Your team members are still responsible for managing the relationships, but the Gillette team can leverage your team’s expertise at any time, for the same cost. You assign your employee Jade to manage the Gillette AI integration.',
      color: 'teal',
      primaryPath: 'augmentation',
      effects: [{ path: 'augmentation', pathDelta: 4, standingDelta: 3 }],
      followupHeading: 'Follow-up · Automate Smarter',
      followupBody:
        'You pitch it to Gillette as the best of both worlds. Jade steps into the new role and the new ads show an increase in performance. However, Jade now has a lot on her plate and starts to develop dark circles under her eyes…',
      next: 'y2029ctx',
    },
    {
      id: 'B',
      title: 'GET MORE PERSONAL',
      summary: 'Pitch a fully agentic personalization system',
      description:
        'You pitch Gillette on a fully agentic AI system trained specifically on their audience data. Real-time personalization at a scale no human team can match.',
      color: 'orange',
      primaryPath: 'erosion',
      effects: [
        {
          path: 'erosion',
          pathDelta: 3,
          standingDelta: 8,
          sentimentDelta: 8,
          notification: 'STANDING ↑↑ · AI CLIMATE ↑',
        },
        { path: 'shrinkage', pathDelta: 2 },
      ],
      followupHeading: 'Follow-up · Get More Personal',
      followupBody:
        'The ads are working. Personalization is paying off. Your standing at the agency is better than ever. What could go wrong?',
      next: 'y2029ctx',
    },
    {
      id: 'C',
      title: 'LEAN INTO THE HUMAN VOICE',
      summary: 'Lean into the human voice',
      description:
        'You tell Gillette to stop competing on volume and win on voice instead. You start doing IRL activations in barbershops across the country. Strip back the cadence. Real stories. Real language. Real humans.',
      color: 'forest',
      primaryPath: 'proworker',
      effects: [
        { path: 'proworker', pathDelta: 4, standingDelta: -3, sentimentDelta: -3 },
      ],
      followupHeading: 'Follow-up · Lean Into the Human Voice',
      followupBody:
        "Gillette is nervous, this goes against everything their competitors are doing. You tell them that’s the point. Only time will tell!",
      next: 'y2029ctx',
    },
  ],
};

/* ---------------------------------------------------------------- 2029 */

const Y2029: YearDecision = {
  year: 2029,
  sceneId: 'y2029q',
  decisionLabel: 'The Margin Conversation',
  promptShort: 'Alex says there’s room in the margins. What do you push for?',
  choices: [
    {
      id: 'A',
      title: 'BRING ON A DIRECTOR OF HUMAN-AI SYNERGY',
      summary: 'Hire a director to relieve Jade',
      description:
        'Jade stepped into the AI Content Strategist role in 2028, and has been burning out quietly. You propose hiring someone for the role…',
      color: 'teal',
      primaryPath: 'augmentation',
      effects: [
        { path: 'augmentation', pathDelta: 3, standingDelta: -2, sentimentDelta: -2 },
      ],
      followupHeading: 'Follow-up · Director of Human-AI Synergy',
      followupBody:
        'Alex approves it. The new hire changes the dynamic immediately. Jade exhales for the first time in a year. But it means you and Alex are not seeing any of the benefits… you worry Alex might not be thrilled!',
      next: 'recap',
    },
    {
      id: 'B',
      title: 'TAKE A MANAGER RAISE',
      summary: 'Take a manager raise',
      description:
        'Alex offers you a personal promotion. She says the margins support it. You say yes.',
      color: 'mustard',
      primaryPath: 'shrinkage',
      effects: [
        {
          path: 'shrinkage',
          pathDelta: 4,
          standingDelta: 8,
          sentimentDelta: 5,
          notification: 'STANDING ↑↑',
        },
        { teamLoss: 'jade' },
      ],
      followupHeading: 'Follow-up · Manager Raise',
      followupBody:
        "Your raise came at a cost. One junior role must get absorbed into the automated pipeline to offset the salary bump, and Jade is laid off. You’re orchestrating agents more than managing people now. The lean setup works, but you’re a different kind of manager than you were in 2025.",
      next: 'recap',
    },
    {
      id: 'C',
      title: 'PAY FOR RETRAINING',
      summary: 'Pay to retrain Marcus and Priya',
      description:
        "Your team is doing great, but it’s clear you don’t need this many hands anymore. You can use the money to help one or two of your junior staff retrain in new career paths.",
      color: 'forest',
      primaryPath: 'proworker',
      effects: [
        {
          path: 'proworker',
          pathDelta: 3,
          standingDelta: -6,
          sentimentDelta: -3,
          notification: 'STANDING ↓',
        },
        { teamLoss: 'marcus' },
        { teamLoss: 'priya' },
      ],
      followupHeading: 'Follow-up · Pay for Retraining',
      followupBody:
        'Marcus and Priya leave for 6 months of retraining! However, you might be the next one out the door at this rate. Alex is not thrilled the money did not go to managerial level raises.',
      next: 'recap',
    },
  ],
};

export const MAIN_DECISIONS: YearDecision[] = [Y2025, Y2026, Y2027, Y2028, Y2029];

/* ---------------------------------------------------------------- 2030 ballot */

export const BALLOT_2030: YearDecision = {
  year: 2030,
  sceneId: 'policy',
  decisionLabel: 'AI Job Preservation Act',
  promptShort: 'How do you vote?',
  choices: [
    {
      id: 'for',
      title: 'FOR',
      summary: 'For the AI Job Preservation bill',
      description: 'Pass the AI Job Preservation & Work Sharing Act.',
      color: 'forest',
      primaryPath: 'proworker',
      effects: [],
      next: 'end_proworker_1',
    },
    {
      id: 'against',
      title: 'AGAINST',
      summary: 'Against the bill',
      description: 'Reject the bill. Let companies set their own pace.',
      color: 'terracotta',
      primaryPath: 'shrinkage',
      effects: [],
      next: 'end_shrinkage_0',
    },
    {
      id: 'abstain',
      title: 'ABSTAIN',
      summary: 'Abstain from voting',
      description: 'Sit this one out.',
      color: 'mustard',
      primaryPath: 'augmentation',
      effects: [],
      next: 'end_augmentation_1',
    },
  ],
};

/* ---------------------------------------------------------------- branch decisions */

const AUGMENTATION_BRANCH: YearDecision[] = [
  {
    year: 2031,
    sceneId: 'end_augmentation_1',
    decisionLabel: 'Policy Passed',
    promptShort: 'Policy passed in a weaker form than advocates wanted.',
    choices: [
      {
        id: '→',
        title: 'CONTINUE',
        description: 'Alex asks how AI gains will be reinvested in your team.',
        color: 'teal',
        primaryPath: 'augmentation',
        effects: [],
        next: 'end_augmentation_2',
      },
    ],
  },
  {
    year: 2032,
    sceneId: 'end_augmentation_2',
    decisionLabel: 'Human Reviewing?',
    promptShort: 'Should every personalized campaign get human review?',
    choices: [
      {
        id: 'A',
        title: 'YES',
        description: 'Have someone on your team review every output.',
        color: 'teal',
        primaryPath: 'augmentation',
        effects: [],
        next: 'end_augmentation_3',
      },
      {
        id: 'B',
        title: 'NO',
        description: 'Send them out as soon as they are generated.',
        color: 'orange',
        primaryPath: 'erosion',
        effects: [],
        next: 'end_augmentation_3b',
      },
    ],
  },
  {
    year: 2033,
    sceneId: 'end_augmentation_5',
    decisionLabel: 'Gillette in Crisis Mode',
    promptShort: 'Some AI ads crossed the line. Backlash is heavy.',
    choices: [
      {
        id: '→',
        title: 'CONTINUE',
        description: 'Divide review tasks across the team.',
        color: 'teal',
        primaryPath: 'augmentation',
        effects: [],
        next: 'end_augmentation_6',
      },
    ],
  },
  {
    year: 2034,
    sceneId: 'end_augmentation_6',
    decisionLabel: 'Client Pressure',
    promptShort: 'How do you differentiate from endless AI content?',
    choices: [
      {
        id: 'A',
        title: 'INVEST IN HUMAN-LED VISUAL DIRECTION',
        description: 'Lean into craft and hand illustration. Make the human origin visible.',
        color: 'forest',
        primaryPath: 'proworker',
        effects: [],
        next: 'end_augmentation_7',
      },
      {
        id: 'B',
        title: 'IMPLEMENT A "HUMAN-VETTED" CERTIFICATION',
        description: 'Maintain AI speed but add a human moral compass and taste filter.',
        color: 'teal',
        primaryPath: 'augmentation',
        effects: [],
        next: 'end_augmentation_7',
      },
    ],
  },
];

const EROSION_BRANCH: YearDecision[] = [
  {
    year: 2031,
    sceneId: 'end_erosion_1',
    decisionLabel: 'Policy Failed',
    promptShort: 'Your team is cut. You keep your job; agents do the rest.',
    choices: [
      {
        id: '→',
        title: 'CONTINUE',
        description: 'You’re the last human in the workflow.',
        color: 'terracotta',
        primaryPath: 'erosion',
        effects: [],
        next: 'end_erosion_2',
      },
    ],
  },
  {
    year: 2032,
    sceneId: 'end_erosion_2_q',
    decisionLabel: 'Targeting Scandal',
    promptShort: 'How do you handle AI campaign risk review as a solo team member?',
    choices: [
      {
        id: 'A',
        title: 'HIRE A LOW-COST REVIEWER',
        description: 'Bring in a contractor to scan campaigns for obvious issues.',
        color: 'orange',
        primaryPath: 'erosion',
        effects: [],
        next: 'end_erosion_3',
      },
      {
        id: 'B',
        title: 'ABSORB THE WORK YOURSELF',
        description: 'No new hire. Just one more tab open all day.',
        color: 'terracotta',
        primaryPath: 'erosion',
        effects: [],
        next: 'end_erosion_3b',
      },
    ],
  },
  {
    year: 2033,
    sceneId: 'end_erosion_3c',
    decisionLabel: 'New Rhythm',
    promptShort: 'Approve, reject, escalate, explain. Repeat.',
    choices: [
      {
        id: '→',
        title: 'CONTINUE',
        description: 'The craft is parceled into micro-tasks.',
        color: 'terracotta',
        primaryPath: 'erosion',
        effects: [],
        next: 'end_erosion_4',
      },
    ],
  },
  {
    year: 2034,
    sceneId: 'end_erosion_4',
    decisionLabel: 'Paycut Proposal',
    promptShort: 'Do you accept the pay reduction?',
    choices: [
      {
        id: 'yes',
        title: 'YES',
        description: 'Stay on at lower pay.',
        color: 'mustard',
        primaryPath: 'erosion',
        effects: [],
        next: 'end_erosion_final',
      },
      {
        id: 'no',
        title: 'NO',
        description: 'Refuse the cut. Walk away.',
        color: 'terracotta',
        primaryPath: 'erosion',
        effects: [],
        next: 'end_erosion_lose',
      },
    ],
  },
];

const SHRINKAGE_BRANCH: YearDecision[] = [
  {
    year: 2031,
    sceneId: 'end_shrinkage_1',
    decisionLabel: 'Restructure',
    promptShort: 'You get a "promotion" — the team is reduced to you and the agents.',
    choices: [
      {
        id: '→',
        title: 'CONTINUE',
        description: 'On paper, a promotion. In practice, you’re the last human.',
        color: 'mustard',
        primaryPath: 'shrinkage',
        effects: [],
        next: 'end_shrinkage_2',
      },
    ],
  },
  {
    year: 2032,
    sceneId: 'end_shrinkage_2',
    decisionLabel: 'The Email',
    promptShort: 'Gillette transitions in-house. The email is automated.',
    choices: [
      {
        id: '→',
        title: 'CONTINUE',
        description: 'Your biggest client just left.',
        color: 'mustard',
        primaryPath: 'shrinkage',
        effects: [],
        next: 'end_shrinkage_3',
      },
    ],
  },
  {
    year: 2033,
    sceneId: 'end_shrinkage_3',
    decisionLabel: 'Not Enough Work',
    promptShort: 'There isn’t enough work to justify the headcount anymore.',
    choices: [
      {
        id: '→',
        title: 'CONTINUE',
        description: 'See the decision.',
        color: 'mustard',
        primaryPath: 'shrinkage',
        effects: [],
        next: 'end_shrinkage_notice_a',
      },
    ],
  },
  {
    year: 2034,
    sceneId: 'end_shrinkage_4',
    decisionLabel: 'The Job Market',
    promptShort: 'You retrain into infrastructure work.',
    choices: [
      {
        id: '→',
        title: 'CONTINUE',
        description: 'No openings left for someone like you.',
        color: 'mustard',
        primaryPath: 'shrinkage',
        effects: [],
        next: 'end_shrinkage_final',
      },
    ],
  },
];

const PROWORKER_BRANCH: YearDecision[] = [
  {
    year: 2031,
    sceneId: 'end_proworker_2',
    decisionLabel: 'Redesign',
    promptShort: 'AI gains must be shared. You redesign roles around human capabilities.',
    choices: [
      {
        id: '→',
        title: 'CONTINUE',
        description: 'Calendar shifts to a four-day week with field time.',
        color: 'forest',
        primaryPath: 'proworker',
        effects: [],
        next: 'end_proworker_3',
      },
    ],
  },
  {
    year: 2032,
    sceneId: 'end_proworker_4',
    decisionLabel: 'AI Dividend Act',
    promptShort: 'How do you vote on UBI funded by AI profits?',
    choices: [
      {
        id: 'yes',
        title: 'YES',
        description: 'Tax AI profits, fund UBI for everyone.',
        color: 'forest',
        primaryPath: 'proworker',
        effects: [],
        next: 'end_proworker_5',
      },
      {
        id: 'no',
        title: 'NO',
        description: 'Reject it — too much, too fast.',
        color: 'terracotta',
        primaryPath: 'proworker',
        effects: [],
        next: 'end_proworker_5',
      },
      {
        id: 'abstain',
        title: 'ABSTAIN',
        description: 'Step back. The policy feels too messy to choose either way.',
        color: 'mustard',
        primaryPath: 'proworker',
        effects: [],
        next: 'end_proworker_5',
      },
    ],
  },
  {
    year: 2033,
    sceneId: 'end_proworker_6',
    decisionLabel: 'Dividend Passes',
    promptShort: 'UBI passes narrowly. Backlash is immediate.',
    choices: [
      {
        id: '→',
        title: 'CONTINUE',
        description: 'Workers have more breathing room. Employers complain.',
        color: 'forest',
        primaryPath: 'proworker',
        effects: [],
        next: 'end_proworker_7',
      },
    ],
  },
  {
    year: 2034,
    sceneId: 'end_proworker_7',
    decisionLabel: 'Year 10 · Fieldwork',
    promptShort: 'Half the four-day week is now in the field.',
    choices: [
      {
        id: '→',
        title: 'CONTINUE',
        description: 'Your team of five made it through.',
        color: 'forest',
        primaryPath: 'proworker',
        effects: [],
        next: 'end_proworker_final',
      },
    ],
  },
];

export const BRANCH_DECISIONS: Record<PathKey, YearDecision[]> = {
  augmentation: AUGMENTATION_BRANCH,
  erosion: EROSION_BRANCH,
  shrinkage: SHRINKAGE_BRANCH,
  proworker: PROWORKER_BRANCH,
};

/* ---------------------------------------------------------------- helpers */

export function getMainDecision(year: number): YearDecision | undefined {
  return MAIN_DECISIONS.find((d) => d.year === year);
}

/** Pick the choice in `decision.choices` whose `primaryPath` matches `target`,
 *  preferring the one with the largest path delta. Falls back to the first
 *  choice if no choice maps to the target path (e.g. years where the target
 *  ending isn’t reachable from a single choice). */
function pickBestChoice(decision: YearDecision, target: PathKey): DecisionChoice {
  const matches = decision.choices.filter((c) => c.primaryPath === target);
  if (matches.length === 0) return decision.choices[0];
  return matches.reduce((best, c) => {
    const cDelta = c.effects.find((e) => e.path === target)?.pathDelta ?? 0;
    const bestDelta = best.effects.find((e) => e.path === target)?.pathDelta ?? 0;
    return cDelta > bestDelta ? c : best;
  }, matches[0]);
}

const BALLOT_VOTE_FOR_PATH: Record<PathKey, string> = {
  augmentation: 'for',
  proworker: 'for',
  shrinkage: 'against',
  erosion: 'against',
};

export interface TimelineRow {
  year: number;
  decisionLabel: string;
  decision: YearDecision;
  /** Selected choice for this row (or null if unknown). */
  choice: DecisionChoice | null;
}

/** A computed exemplar path that would lead to `target`. Used for the 3
 *  futures the player did NOT land on. */
export function buildSamplePath(target: PathKey): TimelineRow[] {
  const rows: TimelineRow[] = MAIN_DECISIONS.map((d) => ({
    year: d.year,
    decisionLabel: d.decisionLabel,
    decision: d,
    choice: pickBestChoice(d, target),
  }));
  rows.push({
    year: 2030,
    decisionLabel: BALLOT_2030.decisionLabel,
    decision: BALLOT_2030,
    choice:
      BALLOT_2030.choices.find((c) => c.id === BALLOT_VOTE_FOR_PATH[target]) ??
      BALLOT_2030.choices[0],
  });
  for (const branchYear of BRANCH_DECISIONS[target]) {
    rows.push({
      year: branchYear.year,
      decisionLabel: branchYear.decisionLabel,
      decision: branchYear,
      // Sample path picks the first listed branch choice deterministically.
      choice: branchYear.choices[0],
    });
  }
  return rows;
}

function lookupHistory(history: HistoryEntry[], year: number): string | undefined {
  // The latest entry for that year wins (covers replays via Resume).
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].year === year) return history[i].choice;
  }
  return undefined;
}

/** The player’s actual path for THEIR ending. Falls back to sample
 *  picks for any year not present in `history` (e.g. historical save data
 *  written before branch-history tracking was added). */
export function buildPlayerPath(state: GameState): TimelineRow[] {
  const target = state.endingPath ?? 'augmentation';
  const sample = buildSamplePath(target);
  return sample.map((row) => {
    const playerChoiceId = playerChoiceForYear(state, row.year, target);
    if (!playerChoiceId) return row;
    const found = row.decision.choices.find((c) => c.id === playerChoiceId);
    return found ? { ...row, choice: found } : row;
  });
}

function playerChoiceForYear(
  state: GameState,
  year: number,
  target: PathKey,
): string | undefined {
  // 2025–2029: read history.
  if (year >= 2025 && year <= 2029) return lookupHistory(state.history, year);
  // 2030 ballot: stored explicitly.
  if (year === 2030) return state.policyVote ?? undefined;
  // Branch years per ending.
  if (target === 'augmentation') {
    if (year === 2032) return state.aug2032Choice ?? undefined;
    if (year === 2034) return state.aug2034Choice ?? undefined;
  }
  if (target === 'proworker' && year === 2032) {
    return state.aiDividendVote ?? undefined;
  }
  // erosion & shrinkage branch decisions land in history via applyEffects([], {...}).
  return lookupHistory(state.history, year);
}

/** Convert a Vote to the matching DecisionChoice id used by BALLOT_2030. */
export function voteToChoiceId(v: Vote): string {
  return v;
}
