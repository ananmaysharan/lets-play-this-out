import { useState } from 'react';

function shuffle<T>(input: T[]): T[] {
  const a = [...input];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Returns the items in a random order, fixed for the lifetime of the component.
 * Re-renders never re-shuffle. A fresh mount (e.g. navigating away and back) gets a new order.
 *
 * Safe in this codebase because choice scenes never render during SSR — the app always
 * server-renders the intro scene with initial state and only navigates client-side.
 */
export function useShuffledOnce<T>(items: T[]): T[] {
  const [shuffled] = useState(() => shuffle(items));
  return shuffled;
}
