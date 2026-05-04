'use client';

import posthog from 'posthog-js';
import { useMemo, useState } from 'react';
import { useGame } from '@/game/GameProvider';
import {
  BALLOT_2030,
  BRANCH_DECISIONS,
  buildPlayerPath,
  buildSamplePath,
  type DecisionChoice,
  MAIN_DECISIONS,
  type YearDecision,
} from '@/game/decisionGraph';
import type { PathKey, SceneId } from '@/game/types';
import { Btn } from '@/components/Btn';

interface PathMeta {
  id: PathKey;
  label: string;
  color: string;
  textOnActive: 'paper' | 'ink';
}

const PATHS: PathMeta[] = [
  { id: 'augmentation', label: 'AUGMENTATION',        color: 'var(--teal-dark)',  textOnActive: 'paper' },
  { id: 'erosion',      label: 'JOB EROSION',         color: 'var(--terracotta)', textOnActive: 'paper' },
  { id: 'shrinkage',    label: 'SELECTIVE SHRINKAGE', color: 'var(--mustard)',    textOnActive: 'ink'   },
  { id: 'proworker',    label: 'PRO-WORKER REDESIGN', color: 'var(--forest)',     textOnActive: 'paper' },
];

// SVG layout constants
const LEFT_PAD = 200;          // Width reserved for year labels on the left
const TREE_W = 720;            // Width of the choice-circle area
const TOTAL_W = LEFT_PAD + TREE_W;
const ROW_H = 90;
const PAD_TOP = 56;
const PAD_BOTTOM = 36;
const NODE_R = 16;
const NODE_R_FADE = 12;

/** Always positional A/B/C/D… (not the data id). Single-choice rows render
 *  as an arrow placeholder. */
function positionalLetter(_c: DecisionChoice, i: number, all: DecisionChoice[]): string {
  if (all.length === 1) return '→';
  return String.fromCharCode(65 + i);
}

/** X coordinate for choice i in a row of n choices. Even spacing across
 *  the central 80% of the choice area, regardless of count. */
function xFor(i: number, n: number): number {
  const margin = TREE_W * 0.14;
  const usable = TREE_W - 2 * margin;
  if (n === 1) return LEFT_PAD + TREE_W / 2;
  return LEFT_PAD + margin + (usable * i) / (n - 1);
}

function yFor(rowIdx: number): number {
  return PAD_TOP + rowIdx * ROW_H + ROW_H / 2;
}

interface HoverState {
  year: number;
  choiceId: string;
  /** SVG-local x and y for tooltip placement. */
  x: number;
  y: number;
}

export function FuturesDiagram() {
  const { state, go, reset } = useGame();
  const [active, setActive] = useState<PathKey>(
    state.viewingFuture ?? state.endingPath ?? 'augmentation',
  );
  const [hover, setHover] = useState<HoverState | null>(null);

  const isPlayerPath = active === state.endingPath;
  const accent = PATHS.find((p) => p.id === active)!.color;
  const activeLabel = PATHS.find((p) => p.id === active)!.label;

  /** Tree rows: 5 main + ballot stay constant; the post-2030 branch tail
   *  comes from the active future's branch decisions plus a synthesised
   *  2035 outcome row. */
  const treeRows: YearDecision[] = useMemo(
    () => [
      ...MAIN_DECISIONS,
      BALLOT_2030,
      ...BRANCH_DECISIONS[active],
      buildOutcomeRow(active, activeLabel),
    ],
    [active, activeLabel],
  );

  const treeH = PAD_TOP + treeRows.length * ROW_H + PAD_BOTTOM;

  /** Map year → chosen choice id for the active future. */
  const chosenByYear = useMemo(() => {
    const rows = isPlayerPath ? buildPlayerPath(state) : buildSamplePath(active);
    const map = new Map<number, string>();
    for (const row of rows) {
      if (row.choice) map.set(row.year, row.choice.id);
    }
    // Synthesised outcome row's only choice is always "chosen".
    map.set(2035, 'outcome');
    return map;
  }, [active, isPlayerPath, state]);

  const backScene: SceneId =
    state.previousScene ??
    (state.endingPath ? (`end_${state.endingPath}_final` as SceneId) : 'intro');
  const backLabel = state.endingPath ? '← BACK TO ENDING' : '← BACK';

  // Build all the connector segments, separated into chosen vs faded so
  // we can paint them in two ordered passes (faded under chosen).
  type Segment = { d: string; key: string; chosen: boolean };
  const segments: Segment[] = [];
  for (let ri = 0; ri < treeRows.length - 1; ri++) {
    const row = treeRows[ri];
    const next = treeRows[ri + 1];
    const chosenId = chosenByYear.get(row.year);
    const chosenIdx = row.choices.findIndex((c) => c.id === chosenId);
    if (chosenIdx < 0) continue;
    const startX = xFor(chosenIdx, row.choices.length);
    const startY = yFor(ri);
    const nextChosenId = chosenByYear.get(next.year);
    const midY = (startY + yFor(ri + 1)) / 2;
    next.choices.forEach((c, ci) => {
      const endX = xFor(ci, next.choices.length);
      const endY = yFor(ri + 1);
      // Elbow path: down → across → down
      const d = `M ${startX} ${startY + NODE_R} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY - NODE_R}`;
      segments.push({
        d,
        key: `${row.year}-${chosenIdx}-${ci}`,
        chosen: c.id === nextChosenId,
      });
    });
  }
  // Sort: faded first (rendered first = behind), chosen last (on top).
  segments.sort((a, b) => Number(a.chosen) - Number(b.chosen));

  return (
    <div className={`futures-diagram${isPlayerPath ? '' : ' is-alt-path'}`}>
      <div className="futures-toolbar">
        <button
          type="button"
          className="futures-back"
          onClick={() => go(backScene)}
        >
          {backLabel}
        </button>

        <nav className="path-pill-row" aria-label="Choose a future to view">
          {PATHS.map((p) => {
            const isActive = active === p.id;
            const isPlayers = state.endingPath === p.id;
            return (
              <button
                key={p.id}
                type="button"
                className={`path-pill${isActive ? ' active' : ''}`}
                data-text-on-active={p.textOnActive}
                style={{ ['--accent' as string]: p.color }}
                onClick={() => {
                  setActive(p.id);
                  posthog.capture('futures_tab_clicked', {
                    future: p.id,
                    was_players_ending: isPlayers,
                  });
                }}
              >
                {p.label}
                {isPlayers && <span className="path-pill-badge">YOURS</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <div
        className="futures-card"
        style={{ ['--futures-accent' as string]: accent }}
      >
        <div
          className="futures-svg-wrap"
          style={{ width: TOTAL_W, height: treeH }}
        >
          <svg
            className="futures-svg"
            viewBox={`0 0 ${TOTAL_W} ${treeH}`}
            width={TOTAL_W}
            height={treeH}
            role="img"
            aria-label="Decision tree visualizing the chosen path"
          >
            {/* Year + decision labels rendered inside the SVG so the
                whole diagram is one centerable unit. */}
            <g className="futures-year-labels">
              {treeRows.map((row, ri) => (
                <g key={`label-${row.year}-${ri}`} transform={`translate(${LEFT_PAD - 22} ${yFor(ri)})`}>
                  <text
                    x={0}
                    y={-8}
                    textAnchor="end"
                    className="futures-year-num"
                  >
                    {row.year}
                  </text>
                  <text
                    x={0}
                    y={12}
                    textAnchor="end"
                    className="futures-year-decision"
                  >
                    {row.decisionLabel.toUpperCase()}
                  </text>
                </g>
              ))}
            </g>

            {/* Edges first (faded under chosen) */}
            <g className="futures-edges">
              {segments.map((s) => (
                <path
                  key={s.key}
                  d={s.d}
                  className={`futures-edge${s.chosen ? ' is-chosen' : ''}`}
                />
              ))}
            </g>

            {/* Nodes */}
            <g className="futures-nodes">
              {treeRows.map((row, ri) =>
                row.choices.map((choice, ci) => {
                  const cx = xFor(ci, row.choices.length);
                  const cy = yFor(ri);
                  const isChosen = chosenByYear.get(row.year) === choice.id;
                  const r = isChosen ? NODE_R : NODE_R_FADE;
                  const letter = positionalLetter(choice, ci, row.choices);
                  return (
                    <g
                      key={`${row.year}-${choice.id}`}
                      className={`futures-node${isChosen ? ' is-chosen' : ''}`}
                      onMouseEnter={() =>
                        setHover({ year: row.year, choiceId: choice.id, x: cx, y: cy })
                      }
                      onMouseMove={() =>
                        setHover((h) => (h ? { ...h, x: cx, y: cy } : h))
                      }
                      onMouseLeave={() => setHover(null)}
                      onFocus={() =>
                        setHover({ year: row.year, choiceId: choice.id, x: cx, y: cy })
                      }
                      onBlur={() => setHover(null)}
                      tabIndex={0}
                    >
                      {/* Generous transparent hit-target */}
                      <circle cx={cx} cy={cy} r={NODE_R + 8} fill="transparent" />
                      <circle
                        cx={cx}
                        cy={cy}
                        r={r}
                        className={`futures-node-circle${isChosen ? ' is-chosen' : ''}`}
                      />
                      {letter && (
                        <text
                          x={cx}
                          y={cy - r - 8}
                          textAnchor="middle"
                          className={`futures-node-letter${isChosen ? ' is-chosen' : ''}`}
                        >
                          {letter}
                        </text>
                      )}
                    </g>
                  );
                }),
              )}
            </g>
          </svg>

          {hover && (
            <HoverTooltip
              year={hover.year}
              choiceId={hover.choiceId}
              treeRows={treeRows}
              x={hover.x}
              y={hover.y}
              treeH={treeH}
            />
          )}
        </div>
      </div>

      <Btn color="terracotta" className="futures-replay" onClick={reset}>
        ↻ PLAY AGAIN
      </Btn>
    </div>
  );
}

/** Synthesised "2035 · Outcome" row that sits at the bottom of every tree. */
function buildOutcomeRow(_active: PathKey, label: string): YearDecision {
  return {
    year: 2035,
    sceneId: 'futures',
    decisionLabel: 'Outcome',
    promptShort: `You arrived in the ${label} future.`,
    choices: [
      {
        id: 'outcome',
        title: label,
        summary: 'The future you reached at the end of the decade.',
        description: '',
        color: 'teal',
        primaryPath: _active,
        effects: [],
        next: 'futures',
      },
    ],
  };
}

const TOOLTIP_W = 280;
const TOOLTIP_GAP = 18;

function HoverTooltip({
  year,
  choiceId,
  treeRows,
  x,
  y,
  treeH,
}: {
  year: number;
  choiceId: string;
  treeRows: YearDecision[];
  x: number;
  y: number;
  treeH: number;
}) {
  const decision = treeRows.find((r) => r.year === year);
  if (!decision) return null;
  const choice = decision.choices.find((c) => c.id === choiceId);
  if (!choice) return null;
  // Place tooltip to the right of the node when there's room, else to the left.
  const placeRight = x + NODE_R + TOOLTIP_GAP + TOOLTIP_W < TOTAL_W;
  const left = placeRight
    ? x + NODE_R + TOOLTIP_GAP
    : x - NODE_R - TOOLTIP_GAP - TOOLTIP_W;
  const top = Math.max(8, Math.min(y - 40, treeH - 160));
  return (
    <div
      className="futures-tooltip"
      style={{ left, top, width: TOOLTIP_W }}
      role="tooltip"
    >
      <div className="futures-tooltip-year">
        {year} · {decision.decisionLabel}
      </div>
      <div className="futures-tooltip-question">{decision.promptShort}</div>
      <div className="futures-tooltip-choice">
        <strong>{choice.title}</strong>
        {(choice.summary || choice.description) && (
          <p>{choice.summary ?? choice.description}</p>
        )}
      </div>
    </div>
  );
}
