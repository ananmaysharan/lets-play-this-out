'use client';

/**
 * Reads ?scene=<id> on mount, dispatches GO to that scene, and strips the
 * query param so reload doesn't re-trigger. Lets /debug deep-link into any
 * scene of the running game while preserving the player's existing save.
 */
import { useEffect } from 'react';
import { useGame } from '@/game/GameProvider';
import type { SceneId } from '@/game/types';
import { VALID_SCENE_IDS } from './sceneRegistry';

export function SceneJumpHandler() {
  const { go } = useGame();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const target = params.get('scene');
    if (!target || !VALID_SCENE_IDS.has(target)) return;

    go(target as SceneId);
    window.history.replaceState({}, '', '/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
