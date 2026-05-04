'use client';

/**
 * MockGameProvider — supplies a frozen, no-op `useGame()` context for use in
 * the debug scene map's thumbnails. Scenes render normally but cannot
 * navigate, dispatch, or write to localStorage.
 */
import { useMemo, type ReactNode } from 'react';
import { GameContext } from '@/game/GameProvider';
import { createInitialState, type GameState } from '@/game/types';
import { ThumbnailContext } from './ThumbnailContext';

const noop = () => {};

export function MockGameProvider({
  state,
  children,
}: {
  state?: Partial<GameState>;
  children: ReactNode;
}) {
  const value = useMemo(
    () => ({
      state: mergeState(state),
      dispatch: noop,
      go: noop,
      applyEffects: noop,
      notify: noop,
      notifications: [],
      hasSave: false,
      resume: noop,
      reset: noop,
    }),
    [state]
  );
  return (
    <ThumbnailContext.Provider value={true}>
      <GameContext.Provider value={value}>{children}</GameContext.Provider>
    </ThumbnailContext.Provider>
  );
}

function mergeState(overrides?: Partial<GameState>): GameState {
  const base = createInitialState();
  if (!overrides) return base;
  return {
    ...base,
    ...overrides,
    path: { ...base.path, ...(overrides.path ?? {}) },
    team: { ...base.team, ...(overrides.team ?? {}) },
  };
}
