'use client';

/**
 * Set to true inside scene thumbnails on the /debug map. Components that
 * normally use a full-screen portal/overlay (e.g. NewsTakeover) check this
 * flag and render inline instead, so they stay inside the thumbnail frame
 * rather than covering the whole page.
 */
import { createContext, useContext } from 'react';

export const ThumbnailContext = createContext(false);

export function useIsThumbnail(): boolean {
  return useContext(ThumbnailContext);
}
