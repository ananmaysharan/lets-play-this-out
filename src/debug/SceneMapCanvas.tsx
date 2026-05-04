'use client';

import { useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { sceneNodes, sceneEdges, type SceneNodeData } from './sceneRegistry';
import { SceneThumbnailNode } from './SceneThumbnailNode';

const nodeTypes = { sceneThumb: SceneThumbnailNode };

export function SceneMapCanvas() {
  const initialNodes = useMemo<Node<SceneNodeData>[]>(() => sceneNodes, []);
  const router = useRouter();

  // React Flow intercepts pointer events on nodes for selection/drag, so
  // onClick handlers inside custom node components are unreliable. The
  // canonical pattern is to use onNodeClick at the ReactFlow level.
  const onNodeClick = useCallback(
    (_e: unknown, node: Node) => {
      router.push(`/?scene=${node.id}`);
    },
    [router]
  );

  return (
    <div className="dbg-canvas-root">
      <header className="dbg-header">
        <strong>Scene Map · /debug</strong>
        <span className="dbg-header-hint">scroll = zoom · drag = pan · click thumbnail = jump</span>
        <Link href="/" className="dbg-header-link">← back to game</Link>
      </header>
      <ReactFlowProvider>
        <ReactFlow
          nodes={initialNodes}
          edges={sceneEdges}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.05}
          maxZoom={2.5}
          proOptions={{ hideAttribution: true }}
          defaultEdgeOptions={{ style: { stroke: '#475569', strokeWidth: 2 } }}
          onNodeClick={onNodeClick}
        >
          <Background variant={BackgroundVariant.Dots} gap={32} size={1} color="#1f2937" />
          <Controls position="bottom-left" />
          <MiniMap
            position="bottom-right"
            pannable
            zoomable
            nodeColor={(n) => {
              const d = n.data as SceneNodeData;
              const map: Record<SceneNodeData['group'], string> = {
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
              return map[d.group] ?? '#888';
            }}
            maskColor="rgba(0,0,0,0.6)"
            style={{ background: '#0a0a0a' }}
          />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
