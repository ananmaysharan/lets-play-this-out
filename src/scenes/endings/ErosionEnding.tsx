"use client";

import posthog from "posthog-js";
import { useState } from "react";
import { useGame } from "@/game/GameProvider";
import { useShuffledOnce } from "@/game/useShuffledOnce";
import { Btn, ChoiceBtn } from "@/components/Btn";
import { AlexDialogue } from "@/components/Dialogue";
import { FmWarningCard } from "@/components/FmWarningCard";
import { Hud } from "@/components/Hud";
import { InflammatoryAds } from "@/components/InflammatoryAds";
import { Memo } from "@/components/Memo";
import { NewsTakeover } from "@/components/NewsTakeover";
import { PATTERN_A, PATTERN_W } from "@/components/PixelLogo";
import { SceneNewsIntro } from "@/components/SceneNewsIntro";
import { EndingActions } from "../EndingActions";

export function EndErosion1Scene() {
  const { go } = useGame();
  return (
    <SceneNewsIntro
      year={2031}
      pattern={PATTERN_W}
      title="Breaking News"
      body={
        <>
          <strong>WSJ:</strong> AI productivity tools become standard in
          white-collar performance reviews.
        </>
      }
    >
      <Hud tag="JOB EROSION" year={2031} />
      <div className="scene-with-chart">
        <Memo
          headerColor="terracotta"
          headerLeft="POLICY FAILED"
          headerRight=""
        >
          <p>
            The policy failed. FlowMetrics is now tied to quarterly reviews and
            your team&apos;s numbers have plateaued.
          </p>
          <p>
            Alex calls you in. She pulls up a dashboard you recognize: your own
            output velocity, plotted against the rest of the agency.
          </p>
          <p>
            She makes the decision to cut your team entirely. You can keep your
            job, but the agents will handle the work of all of your juniors.
          </p>
        </Memo>
        <FmWarningCard />
      </div>
      <Btn
        color="terracotta"
        className="continue-btn"
        onClick={() => go("end_erosion_2")}
      >
        2032
      </Btn>
    </SceneNewsIntro>
  );
}

export function EndErosion2Scene() {
  const { go } = useGame();
  return (
    <NewsTakeover
      year={2032}
      pattern={PATTERN_A}
      title="Breaking News"
      body={
        <>
          <strong>Ad Age:</strong> Gillette AI campaign sparks backlash after
          consumers say ads felt &quot;creepily personal.&quot;
        </>
      }
      onDismiss={() => go("end_erosion_2_ads")}
    />
  );
}

export function EndErosion2AdsScene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="GILLETTE BACKLASH" year={2032} />
      <Memo headerLeft="THE ADS" headerRight="GOING VIRAL">
        <p>
          The targeting model had been identifying what it flagged internally as
          &quot;high-conversion emotional states.&quot; Nobody had time to look
          closely at what that meant in practice. Now the ads are everywhere.
        </p>
      </Memo>
      <InflammatoryAds />
      <Btn
        color="terracotta"
        className="continue-btn"
        onClick={() => go("end_erosion_2_q")}
      >
        CONTINUE
      </Btn>
    </>
  );
}

export function EndErosion2QScene() {
  const { go } = useGame();
  const [unlocked, setUnlocked] = useState(false);

  const choices = useShuffledOnce([
    {
      id: "A" as const,
      color: "orange" as const,
      title: "HIRE A LOW-COST REVIEWER",
      description:
        "Bring in a contractor with no marketing background to scan campaigns for obvious issues before launch.",
      next: "end_erosion_3" as const,
    },
    {
      id: "B" as const,
      color: "terracotta" as const,
      title: "ABSORB THE WORK YOURSELF",
      description:
        "No new hire, no new process. Just one more tab open all day. Your FlowMetrics can't afford another dip.",
      next: "end_erosion_3b" as const,
    },
  ]);

  const text = `"We need eyes on this stuff again. Figure it out today."`;

  return (
    <>
      <Hud tag="TARGETING SCANDAL" year={2032} />
      <Memo headerColor="terracotta" headerLeft="TARGETING SCANDAL" headerRight="">
        <p>
          Gillette is furious. The campaigns were performing. Then overnight
          they became a PR problem.
        </p>
      </Memo>

      <AlexDialogue text={text} onDone={() => setUnlocked(true)}>
        <div
          style={{
            opacity: unlocked ? 1 : 0,
            transition: "opacity 0.4s ease",
            pointerEvents: unlocked ? "auto" : "none",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div className="proworker-question-card">
            <h2 style={{ fontSize: 18, margin: 0 }}>
              How do you handle AI campaign risk review as a solo team member?
            </h2>
          </div>
          {choices.map((c) => (
            <ChoiceBtn
              key={c.id}
              color={c.color}
              title={c.title}
              description={c.description}
              onClick={() => { posthog.capture("decision_made", { year: 2032, decision_id: c.id, scene: "end_erosion_2_q" }); go(c.next); }}
            />
          ))}
        </div>
      </AlexDialogue>
    </>
  );
}

export function EndErosion3Scene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="APPROVE · REJECT · REPEAT" year={2033} />
      <Memo headerLeft="THE RHYTHM" headerRight="ALL DAY">
        <p>
          It helps a little. The reviewer catches targeting choices that cross a
          line hard for the agentic system to define.
        </p>
        <p>
          Your FlowMetrics score dips, since this is work you could have
          absorbed yourself. Alex notices the inefficiency.
        </p>
      </Memo>
      <Btn
        color="terracotta"
        className="continue-btn"
        onClick={() => go("end_erosion_3c")}
      >
        CONTINUE
      </Btn>
    </>
  );
}

export function EndErosion3bScene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="ALL ON YOU" year={2033} />
      <Memo
        headerColor="terracotta"
        headerLeft="ONE MORE TAB"
        headerRight="ALL DAY"
      >
        <p>
          The work of reviewing what the agents produce is now up to you.
          According to FlowMetrics, you&apos;re more productive than ever, but
          you have never felt less like a marketer.
        </p>
      </Memo>
      <Btn
        color="terracotta"
        className="continue-btn"
        onClick={() => go("end_erosion_3c")}
      >
        CONTINUE
      </Btn>
    </>
  );
}

export function EndErosion3cScene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="NEW RHYTHM" year={2033} />
      <Memo headerColor="terracotta" headerLeft="THE NEW RHYTHM" headerRight="">
        <p>
          Every campaign is now personalized at scale. Your agency stays
          relevant by keeping a human in the review loop, a position the firm
          leans into after a run of industry scandals. Your workday settles
          into a steady rhythm:
        </p>
        <p style={{ textAlign: "center" }}>
          <strong>
            <em>approve, reject, escalate, explain.</em>
          </strong>
          <br />
          <strong>
            <em>approve, reject, escalate, explain.</em>
          </strong>
        </p>
        <p>
          The craft you trained for has been parceled into micro-tasks you can
          move through in a few minutes each.
        </p>
      </Memo>
      <Btn
        color="terracotta"
        className="continue-btn"
        onClick={() => go("end_erosion_4")}
      >
        2034
      </Btn>
    </>
  );
}

export function EndErosion4Scene() {
  const { go } = useGame();
  const [unlocked, setUnlocked] = useState(false);

  const choices = useShuffledOnce([
    {
      id: "yes" as const,
      color: "mustard" as const,
      title: "YES",
      next: "end_erosion_final" as const,
    },
    {
      id: "no" as const,
      color: "terracotta" as const,
      title: "NO",
      next: "end_erosion_lose" as const,
    },
  ]);

  const text =
    `"You've been a manager at 2760 Inc. for 9 years now, we value your loyalty. But the job has changed…"\n\n` +
    `"You can keep your job, but you'll take a pay reduction. I just can't justify keeping you otherwise."`;

  return (
    <>
      <Hud tag="THE ASK" year={2034} />
      <div className="alert">FLOWMETRIC SCORE IN CRITICAL ZONE</div>
      <Memo
        headerColor="terracotta"
        headerLeft="ALEX · PAYCUT PROPOSAL"
        headerRight=""
      >
        <p>Alex calls you into her office.</p>
        <p>
          The skills you were originally hired for are no longer part of the
          job. According to FlowMetrics, output velocity is higher from people
          paid a tenth of your salary. The role continues to exist. Most of
          what gave it substance does not.
        </p>
      </Memo>

      <AlexDialogue text={text} onDone={() => setUnlocked(true)}>
        <div
          style={{
            opacity: unlocked ? 1 : 0,
            transition: "opacity 0.4s ease",
            pointerEvents: unlocked ? "auto" : "none",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div className="proworker-question-card">
            <h2 style={{ fontSize: 18, margin: 0 }}>
              Do you accept the pay reduction?
            </h2>
          </div>
          {choices.map((c) => (
            <ChoiceBtn
              key={c.id}
              color={c.color}
              title={c.title}
              onClick={() => { posthog.capture("ending_reached", { ending_path: "erosion", accepted_pay_cut: c.id === "yes" }); go(c.next); }}
            />
          ))}
        </div>
      </AlexDialogue>
    </>
  );
}

export function EndErosionLoseScene() {
  return (
    <div className="ending-screen">
      <div className="ending-label">2034 · GAME ENDED EARLY</div>
      <h1 className="ending-title" style={{ color: "var(--terracotta)" }}>
        YOU DIDN&apos;T
        <br />
        MAKE IT
        <br />
        TO 2035.
      </h1>
      <p className="ending-body">
        <strong>Game over.</strong> You enter a freelance market that has been
        thinned out steadily across the past decade. Let&apos;s walk back
        through what happened.
      </p>
      <EndingActions />
    </div>
  );
}

export function EndErosionFinalScene() {
  return (
    <div className="ending-screen">
      <div className="ending-label">JOB EROSION · 2035</div>
      <h1 className="ending-title" style={{ color: "var(--terracotta)" }}>
        YOUR JOB
        <br />
        IS DECLINING.
      </h1>
      <p className="ending-body">
        You&apos;ve reached a future that researchers call{" "}
        <strong>Job Erosion</strong>.
      </p>
      <p className="ending-body">
        Your job did not disappear, but the quality and pay degraded. The work
        has become faster and more measurable, but less creative and less
        autonomous.
      </p>
      <p className="ending-body">
        You arrived here through a mix of structural pressures and your choices.
        But this future is far from guaranteed. People, including you, have
        agency to change how AI is used and governed.
      </p>
      <EndingActions />
    </div>
  );
}
