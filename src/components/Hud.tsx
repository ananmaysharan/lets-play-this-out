"use client";

import { Smiley, SmileyMeh } from "@phosphor-icons/react";
import { useGame } from "@/game/GameProvider";
import { AvatarSprite } from "@/components/AvatarSprite";
import type { SceneId, TeamMember } from "@/game/types";

interface Props {
  tag?: string;
  /** Override the displayed year (defaults to state.year). */
  year?: number;
  /** Hide the standing/team metrics row. */
  showMetrics?: boolean;
}

const ICON_PROPS = {
  size: 22,
  weight: "regular" as const,
  color: "var(--ink)",
};

const PRE_TEAM_SCENES: ReadonlySet<SceneId> = new Set<SceneId>([
  "intro",
  "avatar",
  "promotion",
  "teamIntro",
]);

interface RosterMember {
  id: TeamMember;
  spriteId: string;
  name: string;
  role: string;
}

const ROSTER: RosterMember[] = [
  { id: "priya", spriteId: "teamPriya", name: "Priya", role: "Jr. Associate" },
  { id: "samarth", spriteId: "teamSamarth", name: "Samarth", role: "Jr. Associate" },
  { id: "marcus", spriteId: "teamMarcus", name: "Marcus", role: "Associate" },
  { id: "jade", spriteId: "teamJade", name: "Jade", role: "Sr. Strategist" },
  { id: "willow", spriteId: "teamWillow", name: "Willow", role: "Sr. Associate" },
];

function HudTeamRoster() {
  const { state } = useGame();
  return (
    <div className="hud-team-roster" aria-label="Team roster">
      {ROSTER.map((m) => {
        const gone = !state.team[m.id];
        return (
          <div
            key={m.id}
            className={`hud-team-pip${gone ? " gone" : ""}`}
            tabIndex={0}
          >
            <div className="hud-team-pip-img">
              <AvatarSprite id={m.spriteId} />
            </div>
            <div className="hud-team-pip-name">{m.name}</div>
            <div className="hud-team-pip-tooltip" role="tooltip">
              {gone ? `${m.role} · Let go` : m.role}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Hud({ tag = "", year, showMetrics = true }: Props) {
  const { state } = useGame();
  const y = year ?? state.year;
  const yearPct = Math.max(0, Math.min(100, ((y - 2025) / 10) * 100));

  const standingColor =
    state.standing < 25
      ? "var(--terracotta)"
      : state.standing < 65
        ? "var(--mustard)"
        : "var(--forest)";

  const timelineCls =
    `hud-timeline ${y <= 2025 ? "at-start" : ""} ${y >= 2035 ? "at-end" : ""}`.trim();

  const teamIntroduced = !PRE_TEAM_SCENES.has(state.scene);
  const metricsRowCls = `hud-metrics-row${teamIntroduced ? "" : " solo"}`;

  return (
    <div className="hud">
      <div className={timelineCls}>
        <span className="timeline-start">2025</span>
        <div className="timeline-track">
          <div className="timeline-marker" style={{ left: `${yearPct}%` }}>
            {y}
          </div>
        </div>
        <span className="timeline-end">2035</span>
        {tag ? <span className="timeline-tag">{tag}</span> : null}
      </div>

      {showMetrics ? (
        <div className={metricsRowCls}>
          <div className="hud-metric">
            <div className="hud-metric-label">
              <span>Company Standing</span>
              <span className="hud-metric-pct">{state.standing}%</span>
            </div>
            <div className="hud-metric-bar-row">
              <SmileyMeh {...ICON_PROPS} />
              <div className="hud-bar-track">
                <div
                  className="hud-bar-fill"
                  style={{
                    width: `${state.standing}%`,
                    background: standingColor,
                  }}
                />
              </div>
              <Smiley {...ICON_PROPS} />
            </div>
          </div>
          {teamIntroduced ? <HudTeamRoster /> : null}
        </div>
      ) : null}
    </div>
  );
}
