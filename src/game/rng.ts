/**
 * Deterministic seeded RNG so the policy ballot's "wobble" is reproducible
 * given the same playthrough.
 *
 * Same player choices → same final ending. No Math.random() in game logic.
 */

import type { GameState } from './types';

/** Hash a string to a 32-bit unsigned int (xmur3). */
function xmur3(str: string): () => number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}

/** Mulberry32 PRNG seeded by an int. Returns [0, 1). */
function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededRandom(input: string): number {
  const hash = xmur3(input);
  const rng = mulberry32(hash());
  return rng();
}

/**
 * Deterministic version of the original `Math.random() < 0.15` ending wobble.
 * Same path counts + same vote → always same outcome.
 */
export function endingFlip(state: GameState): boolean {
  const seed = `${state.path.augmentation}|${state.path.shrinkage}|${state.path.erosion}|${state.path.proworker}|${state.policyVote ?? '-'}|${state.proWorkerHeld ?? '-'}`;
  return seededRandom(seed) < 0.15;
}
