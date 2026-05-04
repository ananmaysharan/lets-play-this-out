/* localStorage save/resume + forward-compatible migration. */

import { createInitialState, type GameState } from './types';

const KEY = 'lets-play-this-out:save:v1';
const VERSION = 2;

interface SaveBlobV1 {
  v: 1;
  state: GameState & { followupHtml?: string | null; followupNext?: string | null };
  savedAt: number;
}

interface SaveBlobV2 {
  v: 2;
  state: GameState;
  savedAt: number;
}

type AnyBlob = SaveBlobV1 | SaveBlobV2;

/** Forward-compatible migration: each step accepts the previous version's blob. */
function migrate(blob: unknown): GameState | null {
  if (!blob || typeof blob !== 'object') return null;
  const b = blob as { v?: unknown; state?: unknown };
  if (typeof b.v !== 'number' || !b.state || typeof b.state !== 'object') return null;

  if (b.v === 1) {
    // v1 used followupHtml + followupNext; v2 uses structured followup.
    const s = b.state as Record<string, unknown>;
    const followup =
      typeof s.followupHtml === 'string' && typeof s.followupNext === 'string'
        ? parseV1Followup(s.followupHtml, s.followupNext as string)
        : null;
    const base = createInitialState();
    const merged: GameState = {
      ...base,
      ...(s as Partial<GameState>),
      path: { ...base.path, ...(s.path as Record<string, number> | undefined) },
      team: { ...base.team, ...(s.team as Record<string, boolean> | undefined) },
      followup,
      proworkerBonusApplied: Boolean(s.proworkerBonusApplied ?? false),
    };
    return merged;
  }

  if (b.v === 2) {
    const s = b.state as Partial<GameState>;
    const base = createInitialState();
    return {
      ...base,
      ...s,
      path: { ...base.path, ...(s.path ?? {}) },
      team: { ...base.team, ...(s.team ?? {}) },
    };
  }

  return null;
}

function parseV1Followup(html: string, next: string): GameState['followup'] {
  let heading = 'Follow-up';
  let body = html;
  const m = html.match(/^<HEAD>([\s\S]*?)<\/HEAD>([\s\S]*)$/);
  if (m) {
    heading = m[1];
    body = m[2];
  }
  return { heading, body, next: next as GameState['scene'] };
}

export function loadSave(): GameState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const blob = JSON.parse(raw) as AnyBlob;
    return migrate(blob);
  } catch {
    return null;
  }
}

export function writeSave(state: GameState) {
  if (typeof window === 'undefined') return;
  try {
    const blob: SaveBlobV2 = { v: VERSION, state, savedAt: Date.now() };
    window.localStorage.setItem(KEY, JSON.stringify(blob));
  } catch {
    // ignore (quota, private mode, etc.)
  }
}

export function clearSave() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

export function hasSave(): boolean {
  if (typeof window === 'undefined') return false;
  return !!window.localStorage.getItem(KEY);
}
