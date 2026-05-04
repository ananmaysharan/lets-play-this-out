'use client';

import { useEffect, useRef, useState } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { SCENES } from '@/game/Game';
import type { SceneId } from '@/game/types';
import { MockGameProvider } from './MockGameProvider';
import type { SceneNodeData } from './sceneRegistry';

const FRAME_W = 360; // visible thumbnail width
const FRAME_H = 220; // visible thumbnail height
const CONTENT_W = 1600; // assumed scene content width before scaling
const SCALE = FRAME_W / CONTENT_W; // ~0.225

const GROUP_ACCENT: Record<SceneNodeData['group'], string> = {
  setup: '#6b7280',
  '2025': '#0d9488',
  '2026': '#0ea5e9',
  '2027': '#a855f7',
  '2028': '#f97316',
  '2029': '#eab308',
  recap: '#dc2626',
  augmentation: '#2563eb',
  erosion: '#9ca3af',
  shrinkage: '#16a34a',
  proworker: '#db2777',
  appendix: '#475569',
};

export function SceneThumbnailNode({ id, data }: NodeProps) {
  const sceneId = id as SceneId;
  const Scene = SCENES[sceneId];
  const nodeData = data as SceneNodeData;
  const accent = GROUP_ACCENT[nodeData.group];

  // Lazy mount the scene only when the card scrolls into view, so we don't
  // pay the cost of mounting all ~60 scenes simultaneously on page load.
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            return;
          }
        }
      },
      { rootMargin: '300px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [visible]);

  // Click navigation is handled by ReactFlow's onNodeClick at the canvas
  // level — see SceneMapCanvas. React Flow intercepts pointer events on
  // nodes, so onClick handlers inside the node body don't fire reliably.
  return (
    <div
      ref={ref}
      className="dbg-card"
      style={{ borderTop: `4px solid ${accent}` }}
    >
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <div className="dbg-title">
        <span className="dbg-title-text">{nodeData.title}</span>
        <span className="dbg-title-id">{sceneId}</span>
      </div>
      <div className="dbg-frame" style={{ width: FRAME_W, height: FRAME_H }}>
        {visible && Scene ? (
          <div
            className="dbg-scale"
            style={{
              width: CONTENT_W,
              transform: `scale(${SCALE})`,
              transformOrigin: 'top left',
            }}
          >
            <MockGameProvider state={nodeData.mockState}>
              <Scene />
            </MockGameProvider>
          </div>
        ) : (
          <div className="dbg-placeholder" />
        )}
      </div>
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
    </div>
  );
}
