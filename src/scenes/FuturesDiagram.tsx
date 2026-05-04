'use client';

import posthog from 'posthog-js';
import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import type {
  CustomNodeElementProps,
  PathClassFunction,
  RawNodeDatum,
} from 'react-d3-tree';
import { useGame } from '@/game/GameProvider';
import {
  buildPlayerPath,
  buildSamplePath,
  type DecisionChoice,
  type TimelineRow,
  type YearDecision,
} from '@/game/decisionGraph';
import type { PathKey } from '@/game/types';
import { Btn } from '@/components/Btn';
import { Hud } from '@/components/Hud';

// Tree imports d3 internals that touch `window` — render only on client.
const Tree = dynamic(() => import('react-d3-tree').then((m) => m.Tree), {
  ssr: false,
});

interface PathMeta {
  id: PathKey;
  label: string;
  color: string;
}

const PATHS: PathMeta[] = [
  { id: 'erosion',      label: 'JOB EROSION',         color: 'var(--terracotta)' },
  { id: 'shrinkage',    label: 'SELECTIVE SHRINKAGE', color: 'var(--mustard)' },
  { id: 'augmentation', label: 'AUGMENTATION',        color: 'var(--teal-dark)' },
  { id: 'proworker',    label: 'PRO-WORKER',          color: 'var(--forest)' },
];

const NODE_RADIUS = 14;
const DEPTH_FACTOR = 100;
const TREE_WIDTH = 360;

interface NodeAttrs extends Record<string, string | number | boolean> {
  letter: string;
  year: number;
  chosen: boolean;
  isRoot: boolean;
  /** Label like "A", "B" → letter; for ballot, positional A/B/C overrides id. */
  positionalLetter: string;
}

/** Build the nested tree d3 needs from the linear timeline rows.
 *  Each row contributes one level: all of that year's choices appear as
 *  siblings at that depth, but only the chosen one carries `children`
 *  forward to the next level. */
function buildTreeData(rows: TimelineRow[]): RawNodeDatum {
  const root: RawNodeDatum = {
    name: 'start',
    attributes: {
      letter: '',
      year: 0,
      chosen: true,
      isRoot: true,
      positionalLetter: '',
    } satisfies NodeAttrs,
  };

  let attachAt: RawNodeDatum = root;
  for (const row of rows) {
    const choices = row.decision.choices;
    // Determine "positional letter" — A/B/C/D by index, even if id is "for".
    const children: RawNodeDatum[] = choices.map((c, i) => {
      const positional = positionalLetter(c, i, choices);
      const isChosen = row.choice?.id === c.id;
      return {
        name: `${row.year}-${c.id}`,
        attributes: {
          letter: c.id,
          positionalLetter: positional,
          year: row.year,
          chosen: isChosen,
          isRoot: false,
        } satisfies NodeAttrs,
      };
    });
    attachAt.children = children;
    const nextParent = children.find(
      (c) => (c.attributes as NodeAttrs).chosen,
    );
    if (!nextParent) break;
    attachAt = nextParent;
  }
  return root;
}

function positionalLetter(
  choice: DecisionChoice,
  index: number,
  all: DecisionChoice[],
): string {
  // Single-choice "continue" steps render as a small dot, no letter.
  if (all.length === 1) return '';
  // Use existing letter id when it's already a single uppercase letter.
  if (/^[A-Z][A-Z0-9]?$/.test(choice.id)) return choice.id;
  // Otherwise (yes/no/for/against/abstain), assign A/B/C by position.
  return String.fromCharCode(65 + index);
}

export function FuturesDiagram() {
  const { state, reset } = useGame();
  const [active, setActive] = useState<PathKey>(state.endingPath ?? 'augmentation');

  const isPlayerPath = active === state.endingPath;
  const rows: TimelineRow[] = useMemo(
    () => (isPlayerPath ? buildPlayerPath(state) : buildSamplePath(active)),
    [isPlayerPath, state, active],
  );
  const treeData = useMemo(() => buildTreeData(rows), [rows]);
  const accent = PATHS.find((p) => p.id === active)!.color;

  const renderNode = useMemo(
    () => makeRenderNode(accent, isPlayerPath),
    [accent, isPlayerPath],
  );
  const pathClassFn: PathClassFunction = (link) => {
    const target = link.target.data.attributes as unknown as NodeAttrs;
    return target.chosen ? 'futures-link futures-link-chosen' : 'futures-link';
  };

  // Tree height = depthFactor * (1 root + N rows). +60 for padding.
  const treeHeight = DEPTH_FACTOR * (rows.length + 1) + 60;

  return (
    <div className={`futures-diagram${isPlayerPath ? '' : ' is-alt-path'}`}>
      <Hud tag="COMPARE FUTURES" year={2035} />

      <div className="futures-header">
        <div className="futures-eyebrow">
          {isPlayerPath ? 'YOUR PATH' : 'A PATH THAT COULD LEAD HERE'}
        </div>
        <h1 className="futures-title" style={{ color: accent }}>
          {PATHS.find((p) => p.id === active)!.label}
        </h1>
      </div>

      <div className="futures-grid">
        <div
          className="futures-tree-wrap"
          style={{
            width: TREE_WIDTH,
            height: treeHeight,
            ['--futures-accent' as string]: accent,
          }}
        >
          <Tree
            data={treeData}
            orientation="vertical"
            pathFunc="elbow"
            translate={{ x: TREE_WIDTH / 2, y: 30 }}
            depthFactor={DEPTH_FACTOR}
            separation={{ siblings: 1, nonSiblings: 1.2 }}
            nodeSize={{ x: 64, y: DEPTH_FACTOR }}
            zoomable={false}
            draggable={false}
            collapsible={false}
            renderCustomNodeElement={renderNode}
            pathClassFunc={pathClassFn}
            rootNodeClassName="futures-node-root"
            branchNodeClassName="futures-node-branch"
            leafNodeClassName="futures-node-leaf"
          />
        </div>

        <ol className="futures-side-list" style={{ minHeight: treeHeight }}>
          {/* Spacer matching the root node height in the tree. */}
          <li className="futures-side-spacer" style={{ height: DEPTH_FACTOR }} />
          {rows.map((row) => (
            <SideRow
              key={`${row.year}-${row.decision.sceneId}`}
              row={row}
              isPlayerPath={isPlayerPath}
            />
          ))}
        </ol>
      </div>

      <nav className="futures-tabs" aria-label="Compare other futures">
        {PATHS.map((p) => {
          const isActive = active === p.id;
          const isPlayers = state.endingPath === p.id;
          return (
            <button
              key={p.id}
              type="button"
              className={`futures-tab${isActive ? ' is-active' : ''}`}
              style={
                isActive
                  ? { background: p.color, color: 'var(--paper)', borderColor: 'var(--ink)' }
                  : undefined
              }
              onClick={() => {
                setActive(p.id);
                posthog.capture('futures_tab_clicked', {
                  future: p.id,
                  was_players_ending: isPlayers,
                });
              }}
            >
              <span className="futures-tab-label">{p.label}</span>
              {isPlayers && <span className="futures-tab-badge">YOUR PATH</span>}
            </button>
          );
        })}
      </nav>

      <Btn color="terracotta" className="futures-replay" onClick={reset}>
        ↻ PLAY AGAIN
      </Btn>
    </div>
  );
}

/** react-d3-tree custom node renderer: outlined circle + letter text below. */
function makeRenderNode(accent: string, _isPlayerPath: boolean) {
  return function RenderNode(props: CustomNodeElementProps) {
    const attrs = (props.nodeDatum.attributes ?? {}) as unknown as NodeAttrs;
    const isChosen = attrs.chosen === true;
    const isRoot = attrs.isRoot === true;
    const letter = attrs.positionalLetter || '';
    const r = isRoot ? 10 : NODE_RADIUS;

    const fill = isChosen ? accent : 'var(--paper)';
    const stroke = isChosen ? accent : 'var(--ink-soft)';
    const strokeWidth = isChosen ? 2 : 1.5;

    return (
      <g>
        <circle
          r={r}
          cx={0}
          cy={0}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
        {letter && (
          <text
            x={0}
            y={r + 14}
            textAnchor="middle"
            fontFamily="var(--ff-mono)"
            fontSize={11}
            fontWeight={700}
            fill="var(--ink-soft)"
            style={{ pointerEvents: 'none' }}
          >
            {letter}
          </text>
        )}
      </g>
    );
  };
}

function SideRow({
  row,
  isPlayerPath,
}: {
  row: TimelineRow;
  isPlayerPath: boolean;
}) {
  const choice = row.choice;
  const isLinear = row.decision.choices.length === 1;
  const positional = choice
    ? positionalLetter(choice, row.decision.choices.indexOf(choice), row.decision.choices)
    : '';
  const summary = choice?.summary || choice?.description || choice?.title || '';
  const verb = isPlayerPath ? 'You chose' : 'Choose';

  return (
    <li className="futures-side-row" style={{ height: DEPTH_FACTOR }}>
      <div className="futures-side-year">{row.year}</div>
      <div className="futures-side-decision">{row.decision.decisionLabel}</div>
      {choice && (
        <div className="futures-side-choice">
          {isLinear ? (
            <span>{summary}</span>
          ) : (
            <>
              {verb} <strong>{positional}</strong> — {summary}
            </>
          )}
        </div>
      )}
    </li>
  );
}
