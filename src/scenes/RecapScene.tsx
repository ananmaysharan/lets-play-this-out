"use client";

import { useGame } from "@/game/GameProvider";
import { Btn } from "@/components/Btn";
import { Hud } from "@/components/Hud";
import { Stamp } from "@/components/Stamp";
import { getLeadingPath } from "@/game/state";
import type { PathKey } from "@/game/types";

interface CopyEntry {
  label: string;
  title: string;
  body: string;
  stamp: string;
  stampColor?: "green" | "terracotta" | "black";
}

const RECAP_COPY: Record<PathKey, CopyEntry> = {
  augmentation: {
    label: "HOLDING ON",
    title: "Not bad, {name}.",
    body: "You've steered your team into roles of oversight and judgment. The humans are tired, but still in the loop. You've kept your job while the work shifts.",
    stamp: "UNDER REVIEW",
  },
  shrinkage: {
    label: "PROMOTED",
    title: "Look at you, {name}.",
    body: "You played this brilliantly. Your early bet on AI adoption, your velocity numbers, and your instinct for when to push paid off. The view from the corner office just got a lot bigger.",
    stamp: "PROMOTED",
    stampColor: "green",
  },
  erosion: {
    label: "LIMBO",
    title: "{name}, you're working harder than ever.",
    body: "The up-and-comers, and the AI agents, do parts of your job better than you. You're fast and measurable, but you're not sure what your job is anymore.",
    stamp: "UNDER REVIEW",
  },
  proworker: {
    label: "UNDER REVIEW",
    title: "{name}, things are precarious.",
    body: "Your choices have been principled, but the business doesn't always reward principles. You're still at 2760 Inc., but there's a calendar invite from Alex in your inbox with no subject line. Your team is nervous. You are too. The industry is reshaping itself around economics you can't argue with.",
    stamp: "UNDER REVIEW",
  },
};

export function RecapScene() {
  const { state, go } = useGame();
  const key = getLeadingPath(state);
  const copy = RECAP_COPY[key];
  const stampColor = copy.stampColor ?? "terracotta";
  return (
    <>
      <Hud tag="RECAP" year={2030} />
      <div
        className="memo memo-rotate-left"
        style={{ position: "relative" }}
      >
        <div className="memo-header">
          <span>2760 INC · INTERNAL</span>
        </div>
        <div className="memo-body">
          <Stamp color={stampColor}>{copy.stamp}</Stamp>
          <div className="ending-label" style={{ marginBottom: 8 }}>
            {copy.label}
          </div>
          <h1 style={{ fontSize: 28 }}>
            {copy.title.replace("{name}", state.name)}
          </h1>
          <p>{copy.body}</p>
        </div>
      </div>
      <p className="center muted" style={{ fontSize: 13, margin: "20px 0" }}>
        But this might all be about to change…
      </p>
      <Btn
        color="terracotta"
        className="continue-btn"
        onClick={() => go("policy")}
      >
        THE BALLOT
      </Btn>
    </>
  );
}
