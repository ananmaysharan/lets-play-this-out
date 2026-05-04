'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import posthog from 'posthog-js';
import { type Action, reducer } from './state';
import { createInitialState, type GameState, type SceneId, type Effect } from './types';
import { clearSave, loadSave, writeSave } from './persistence';

type NotificationItem = { id: number; text: string };

interface GameContextValue {
  state: GameState;
  dispatch: (a: Action) => void;
  go: (scene: SceneId) => void;
  applyEffects: (effects: Effect[], choice?: { year: number; id: string }) => void;
  notify: (text: string) => void;
  notifications: NotificationItem[];
  hasSave: boolean;
  resume: () => void;
  reset: () => void;
}

export const GameContext = createContext<GameContextValue | null>(null);

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside <GameProvider>');
  return ctx;
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  const [savedExists, setSavedExists] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const notifIdRef = useRef(0);

  // On mount, check whether a save exists (don't auto-resume — show button on intro).
  useEffect(() => {
    setSavedExists(!!loadSave());
    setHydrated(true);
  }, []);

  // Persist on every state change (after first hydration).
  useEffect(() => {
    if (!hydrated) return;
    if (state.scene === 'intro' && state.pagesSeen === 0) return;
    writeSave(state);
  }, [state, hydrated]);

  // Register the per-run gameId as a PostHog super-property so every captured
  // event for this play-through is grouped under the same id. Re-runs on
  // RESET (new uuid) and on resume (uuid loaded from the saved state).
  useEffect(() => {
    if (!state.gameId) return;
    posthog.register({ gameId: state.gameId });
  }, [state.gameId]);

  const go = useCallback((scene: SceneId) => {
    dispatch({ type: 'GO', scene });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const notify = useCallback((text: string) => {
    const id = ++notifIdRef.current;
    setNotifications((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3200);
  }, []);

  const applyEffectsImpl = useCallback(
    (effects: Effect[], choice?: { year: number; id: string }) => {
      dispatch({ type: 'APPLY_EFFECTS', effects, choice });
      for (const e of effects) {
        if (e.notification) notify(e.notification);
      }
    },
    [notify]
  );

  const resume = useCallback(() => {
    const saved = loadSave();
    if (!saved) return;
    setNotifications([]);
    dispatch({ type: 'HYDRATE', state: saved });
  }, []);

  const reset = useCallback(() => {
    clearSave();
    setSavedExists(false);
    setNotifications([]);
    dispatch({ type: 'RESET' });
  }, []);

  const value = useMemo<GameContextValue>(
    () => ({
      state,
      dispatch,
      go,
      applyEffects: applyEffectsImpl,
      notify,
      notifications,
      hasSave: savedExists,
      resume,
      reset,
    }),
    [state, go, applyEffectsImpl, notify, notifications, savedExists, resume, reset]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
