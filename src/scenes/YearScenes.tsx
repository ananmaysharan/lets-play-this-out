"use client";

import posthog from "posthog-js";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useGame } from "@/game/GameProvider";
import { useShuffledOnce } from "@/game/useShuffledOnce";
import { useTypewriter } from "@/game/useTypewriter";
import { AlexDialogue, LockedContinueBtn } from "@/components/Dialogue";
import { Btn, ChoiceBtn } from "@/components/Btn";
import { Confetti } from "@/components/Confetti";
import { Hud } from "@/components/Hud";
import { Memo } from "@/components/Memo";
import { NewsTakeover } from "@/components/NewsTakeover";
import { SceneNewsIntro } from "@/components/SceneNewsIntro";
import {
  PATTERN_A,
  PATTERN_M,
  PATTERN_T_NYT,
  PATTERN_T_WIDE,
  PATTERN_W,
} from "@/components/PixelLogo";
import { PaperChart } from "@/components/PaperChart";
import { FmCard } from "@/components/FmCard";
import { GilCard } from "@/components/GilCard";
import { useIsThumbnail } from "@/debug/ThumbnailContext";

/* ====================================================================
 * 2025
 * ==================================================================== */

export function Y2025NewsScene() {
  const { go } = useGame();
  return (
    <NewsTakeover
      year={2025}
      pattern={PATTERN_M}
      body={
        <>
          <strong>MIT Work of the Future Lab: </strong> AI is now economically
          viable to automate 11.7% of U.S. jobs — but that doesn&apos;t mean
          companies will.
        </>
      }
      onDismiss={() => go("y2025ctx")}
    />
  );
}

export function Y2025CtxScene() {
  const { state, go } = useGame();
  const [unlocked, setUnlocked] = useState(false);
  useEffect(() => {
    setUnlocked(false);
  }, []);
  const text =
    `Congrats on the promotion, ${state.name}! Excited to be working with you.\n\n` +
    `I know your team is already using some of this AI stuff. Get ahead of it. Set some direction.`;

  return (
    <>
      <Hud tag="THE DECK DROP" year={2025} />
      <Memo
        headerColor="mustard"
        headerLeft="CONFERENCE ROOM B"
        headerRight="9:47 AM"
      >
        <p>
          It&apos;s your first meeting as manager. Alex closes the door and
          drops a deck on the table.
        </p>
      </Memo>
      <div className="scene-with-chart">
        <AlexDialogue text={text} onDone={() => setUnlocked(true)} />
        <PaperChart />
      </div>
      <LockedContinueBtn unlocked={unlocked} onClick={() => go("y2025q")} />
    </>
  );
}

export function Y2025QScene() {
  const { dispatch, applyEffects, go } = useGame();
  function pick(c: "A" | "B" | "C") {
    posthog.capture("decision_made", { year: 2025, decision_id: c, scene: "y2025q" });
    if (c === "A") {
      applyEffects(
        [
          {
            path: "augmentation",
            pathDelta: 1,
            standingDelta: -3,
            sentimentDelta: 0,
          },
        ],
        { year: 2025, id: "A" },
      );
      dispatch({
        type: "SET_FOLLOWUP",
        heading: `Follow-up`,
        body: `Alex asks if this is what you call "getting ahead of something". She's not impressed. But you're still new to being a manager, so it's not held against you yet…`,
        next: "y2026news",
      });
    } else if (c === "B") {
      applyEffects(
        [
          {
            path: "shrinkage",
            pathDelta: 2,
            standingDelta: 10,
            sentimentDelta: 8,
            notification: "STANDING ↑ AI CLIMATE ↑",
          },
        ],
        { year: 2025, id: "B" },
      );
      dispatch({
        type: "SET_FOLLOWUP",
        heading: `Follow-up`,
        body: `Your team's Q2 output is top-notch. Strong numbers your first year? That's how you get noticed. You're on Alex's radar as a leader who gets it.`,
        next: "y2026news",
      });
    } else {
      applyEffects(
        [
          {
            path: "proworker",
            pathDelta: 2,
            standingDelta: -10,
            sentimentDelta: -5,
            notification: "STANDING ↓ AI CLIMATE ↓",
          },
        ],
        { year: 2025, id: "C" },
      );
      dispatch({
        type: "SET_FOLLOWUP",
        heading: `Follow-up`,
        body: `You tell Alex the team can use AI tools, but raise concerns about creativity and client data. She listens, but you're on thin ice — and it's only been a little while since you started this job.`,
        next: "y2026news",
      });
    }
    go("y2025followup");
  }
  const choices = useShuffledOnce([
    {
      id: "A" as const,
      color: "teal" as const,
      title: "BUSINESS AS USUAL",
      description:
        "Each person uses AI as they see fit — drafts, summaries, notes — but everyone is still responsible for their own output.",
    },
    {
      id: "B" as const,
      color: "mustard" as const,
      title: "TAKE INITIATIVE",
      description:
        "Push the team to use AI to speed up output across the board. You could use some early impact on your first year on the job.",
    },
    {
      id: "C" as const,
      color: "forest" as const,
      title: "PUMP THE BRAKES",
      description:
        "Tell your team to be cautious of using AI especially when client-sensitive data is involved. You don't outlaw it, but you're skeptical.",
    },
  ]);
  return (
    <>
      <Hud tag="DECISION 01" year={2025} />
      <Memo headerLeft="Q: TEAM DIRECTION" headerRight="DUE: FRIDAY">
        <h2 style={{ fontSize: 18 }}>
          Alex wants your team&apos;s direction on AI by the end of the week.
          What do you tell her?
        </h2>
      </Memo>
      <div className="btn-stack">
        {choices.map((c) => (
          <ChoiceBtn
            key={c.id}
            color={c.color}
            title={c.title}
            description={c.description}
            onClick={() => pick(c.id)}
          />
        ))}
      </div>
    </>
  );
}

/* ====================================================================
 * 2026
 * ==================================================================== */

export function Y2026NewsScene() {
  const { go } = useGame();
  return (
    <NewsTakeover
      year={2026}
      pattern={PATTERN_T_NYT}
      body={
        <>
          <strong>New York Times: </strong> JP Morgan&apos;s new tech monitors
          employees&apos; keystrokes and meetings. The bank says it&apos;s for
          their wellbeing.
        </>
      }
      onDismiss={() => go("y2026ctx")}
    />
  );
}

export function Y2026CtxScene() {
  const { go } = useGame();
  const [unlocked, setUnlocked] = useState(false);
  const text =
    `Running lean and moving fast. That's what this year looks like.\n\n` +
    `Use FlowMetrics. Watch your team closely to see who's pulling their weight and who's not.\n\n` +
    `Your team's 6th out of 11 right now. You might want to fix that before the Q3 review.`;
  return (
    <>
      <Hud tag="YEAR 2 · FLOWMETRICS" year={2026} />
      <Memo
        headerColor="orange"
        headerLeft="MANAGERS-ONLY MEETING"
        headerRight="8:12 AM"
      >
        <p>
          2760 Inc. is adopting a new tool called <strong>FlowMetrics</strong>{" "}
          today! It tracks how much time each person spends using AI tools and
          the volume of content employees &amp; teams produce.
        </p>
      </Memo>
      <div className="scene-with-chart">
        <AlexDialogue text={text} onDone={() => setUnlocked(true)} />
        <FmCard />
      </div>
      <LockedContinueBtn unlocked={unlocked} onClick={() => go("y2026q")} />
    </>
  );
}

export function Y2026QScene() {
  const { dispatch, applyEffects, go } = useGame();
  function pick(c: "A" | "B" | "B2" | "C") {
    posthog.capture("decision_made", { year: 2026, decision_id: c, scene: "y2026q" });
    if (c === "A") {
      applyEffects(
        [
          {
            path: "proworker",
            pathDelta: 1,
            standingDelta: -2,
            sentimentDelta: -2,
          },
          { path: "augmentation", pathDelta: 1 },
        ],
        { year: 2026, id: "A" },
      );
      dispatch({
        type: "SET_FOLLOWUP",
        heading: `Follow-up · Added Context`,
        body: `Your FlowMetric rank hasn't improved, but you show Alex strong client feedback numbers in defense of what you call "high-quality slow work." She's impressed you stayed late, but frustrated you're not prioritizing the FlowMetrics data. These extra hours are definitely not going to get you a bonus!`,
        next: "y2027news",
      });
    } else if (c === "B") {
      applyEffects(
        [
          {
            path: "shrinkage",
            pathDelta: 2,
            standingDelta: 8,
            sentimentDelta: 5,
            notification: "STANDING ↑",
          },
          { path: "erosion", pathDelta: 1 },
        ],
        { year: 2026, id: "B" },
      );
      dispatch({
        type: "SET_FOLLOWUP",
        heading: `Follow-up · Lean Into the Dashboard`,
        body: `Priya, your most junior employee, builds AI templates for campaign assets that let your team hit the goal. Some workflows are now almost AI from start to end. Your team jumps to #2. Alex notices. Another promotion feels within reach.`,
        next: "y2027news",
      });
    } else if (c === "B2") {
      applyEffects(
        [
          {
            path: "erosion",
            pathDelta: 3,
            standingDelta: 10,
            sentimentDelta: 8,
            notification: "STANDING ↑↑ AI CLIMATE ↑",
          },
        ],
        { year: 2026, id: "B2" },
      );
      dispatch({
        type: "SET_FOLLOWUP",
        heading: `Follow-up · Bonuses Tied to Velocity`,
        body: `Alex is impressed by your initiative. You're no longer just a manager who follows direction, you're one who sets it.`,
        next: "y2027news",
      });
    } else {
      applyEffects(
        [
          {
            path: "proworker",
            pathDelta: 3,
            standingDelta: -8,
            sentimentDelta: -6,
            notification: "STANDING ↓ AI CLIMATE ↓",
          },
        ],
        { year: 2026, id: "C" },
      );
      dispatch({
        type: "SET_FOLLOWUP",
        heading: `Follow-up · Push Back on the Metric`,
        body: `Alex pushes back hard. You win a partial concession: FlowMetrics won't be used in performance reviews — for now. But watch out! You've spent some political capital and your team has now fallen to #9 in FlowMetrics rankings.`,
        next: "y2027news",
      });
    }
    go("y2026followup");
  }
  const choices = useShuffledOnce([
    {
      id: "A" as const,
      color: "teal" as const,
      title: "ADD CONTEXT",
      description:
        "Tell your team efficiency matters, but good marketing requires judgment. Pull late nights gathering qualitative client feedback manually to show Alex the impact of your work.",
    },
    {
      id: "B" as const,
      color: "mustard" as const,
      title: "LEAN INTO THE DASHBOARD",
      description:
        "Set output velocity as a North Star metric. Team goal: top 3 rank by Q3.",
    },
    {
      id: "B2" as const,
      color: "orange" as const,
      title: "TAKE INITIATIVE",
      description:
        "Go to Alex and propose tying Q4 bonuses to individual output velocity scores. You know what keeps your team motivated.",
    },
    {
      id: "C" as const,
      color: "forest" as const,
      title: "PUSH BACK ON THE METRIC",
      description:
        "Request a meeting with Alex and HR. Argue FlowMetrics is a dangerous metric for creative work.",
    },
  ]);
  return (
    <>
      <Hud tag="DECISION 02" year={2026} />
      <Memo headerLeft="Q: FLOWMETRICS RESPONSE" headerRight="">
        <h2 style={{ fontSize: 18 }}>
          The FlowMetrics leaderboard is live. What do you do?
        </h2>
      </Memo>
      <div className="btn-stack">
        {choices.map((c) => (
          <ChoiceBtn
            key={c.id}
            color={c.color}
            title={c.title}
            description={c.description}
            onClick={() => pick(c.id)}
          />
        ))}
      </div>
    </>
  );
}

/* ====================================================================
 * 2027
 * ==================================================================== */

export function Y2027NewsScene() {
  const { go } = useGame();
  return (
    <NewsTakeover
      year={2027}
      pattern={PATTERN_A}
      body={
        <>
          <strong>The Atlantic: </strong> &quot;Jobless Growth: The Economy Is
          Fine. Your Industry Isn&apos;t.&quot; GDP is up. Hiring is flat. AI
          infrastructure investment is driving growth that doesn&apos;t create
          jobs, and junior knowledge workers are the first to feel it.
        </>
      }
      onDismiss={() => go("y2027ctx")}
    />
  );
}

export function Y2027CtxScene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="JOBLESS GROWTH" year={2027} />
      <Memo
        headerColor="terracotta"
        headerLeft="ALL-HANDS"
        headerRight=""
      >
        <p>
          The economy has cooled. Two clients have paused contracts. At the
          company all-hands, the CEO says the quiet part out loud:
        </p>
        <div className="quote-block">
          &quot;Agentic AI tools are now capable of producing junior-level work
          at a fraction of the cost. We&apos;ll be reviewing headcount across
          all teams.&quot;
        </div>
        <p>
          Every member of your team comes to your desk separately that
          afternoon. Different faces, same question:{" "}
          <em>&quot;Should I be worried?&quot;</em>
        </p>
        <div className="email-preview">
          <div className="email-header">
            FROM: Alex &nbsp; · &nbsp; 4:47 PM &nbsp; · &nbsp; NO SUBJECT
          </div>
          Review your team&apos;s headcount. Come to me with a recommendation by
          the end of next week.
        </div>
      </Memo>
      <Btn
        color="terracotta"
        className="continue-btn"
        onClick={() => go("y2027q")}
      >
        YOUR RECOMMENDATION
      </Btn>
    </>
  );
}

export function Y2027QScene() {
  const { dispatch, applyEffects, go } = useGame();
  function pick(c: "A" | "B" | "C") {
    posthog.capture("decision_made", { year: 2027, decision_id: c, scene: "y2027q" });
    if (c === "A") {
      applyEffects([{ path: "augmentation", pathDelta: 3, standingDelta: 2 }], {
        year: 2027,
        id: "A",
      });
      dispatch({
        type: "SET_FOLLOWUP",
        heading: `Follow-up · Humans in the Loop`,
        body: `Junior staff are now acting as AI output editors that keep the work trustworthy. Alex is satisfied with your AI usage, but says headcount will be reviewed again next quarter.`,
        next: "y2028ctx",
      });
      go("y2027followup");
    } else if (c === "B") {
      applyEffects(
        [
          {
            path: "shrinkage",
            pathDelta: 3,
            standingDelta: 8,
            sentimentDelta: 5,
            notification: "STANDING ↑",
          },
          { teamLoss: "samarth" },
        ],
        { year: 2027, id: "B" },
      );
      dispatch({
        type: "SET_FOLLOWUP",
        heading: `Follow-up · The Tough Call`,
        body: `Your Q4 numbers look excellent. Alex is happy with your work and your team is on track to be one of the top performers this year. However, some of the other members of the team were sad to lose Samarth…`,
        next: "y2028ctx",
      });
      go("y2027followup");
    } else {
      applyEffects(
        [
          {
            path: "proworker",
            pathDelta: 4,
            standingDelta: -12,
            sentimentDelta: -4,
            notification: "STANDING ↓↓ AI CLIMATE ↓",
          },
        ],
        { year: 2027, id: "C" },
      );
      dispatch({
        type: "SET_FOLLOWUP",
        heading: `Follow-up · Into the Field`,
        body: `Your juniors come back with real conversations, real places, and real human insight that no model can scrape. It's good stuff. But your standing is on thin ice, and you might be next out the door…`,
        next: "y2027proworker",
      });
      go("y2027followup");
    }
  }
  const choices = useShuffledOnce([
    {
      id: "A" as const,
      color: "teal" as const,
      title: "KEEP HUMANS IN THE LOOP",
      description:
        "AI output needs managing. Someone has to catch errors, maintain brand voice, keep the quality bar from quietly dropping.",
    },
    {
      id: "B" as const,
      color: "orange" as const,
      title: "MAKE THE TOUGH CALL",
      description:
        "Your least effective junior, Samarth, has terrible FlowMetrics scores. An agentic tool can already cover ~75% of his work.",
    },
    {
      id: "C" as const,
      color: "forest" as const,
      title: "SEND THEM INTO THE FIELD",
      description:
        "Refuse to cut anyone. Instead, redesign the junior roles entirely and send them out daily as on-the-ground cultural correspondents.",
    },
  ]);
  return (
    <>
      <Hud tag="DECISION 03" year={2027} />
      <Memo headerLeft="Q: HEADCOUNT REVIEW" headerRight="DUE: NEXT WEEK">
        <h2 style={{ fontSize: 18 }}>What&apos;s your recommendation?</h2>
        <p style={{ fontSize: 12 }} className="muted">
          Remember to account for your standing.
        </p>
      </Memo>
      <div className="btn-stack">
        {choices.map((c) => (
          <ChoiceBtn
            key={c.id}
            color={c.color}
            title={c.title}
            description={c.description}
            onClick={() => pick(c.id)}
          />
        ))}
      </div>
    </>
  );
}

export function Y2027ProworkerScene() {
  const { dispatch, applyEffects, go } = useGame();
  const [questionVisible, setQuestionVisible] = useState(false);
  const text = `Every other agency is cutting costs. We can't afford to be romantic about this. Samarth's FlowMetrics scores are the worst on your team…`;

  function decide(held: "yes" | "no") {
    posthog.capture("proworker_stance_chosen", { choice: held });
    dispatch({ type: "SET_PROWORKER_HELD", held });
    if (held === "yes") {
      applyEffects([
        {
          path: "proworker",
          pathDelta: 2,
          standingDelta: -8,
          sentimentDelta: -3,
          notification: "STANDING ↓ AI CLIMATE ↓",
        },
      ]);
      go("y2027proworkerYes");
    } else {
      applyEffects([
        {
          path: "proworker",
          pathDelta: -1,
          standingDelta: 4,
          sentimentDelta: 3,
        },
      ]);
      dispatch({
        type: "SET_FOLLOWUP",
        heading: `Follow-up · Backing Down`,
        body: `You'll keep your job for another day… but watch out — you're still on thin ice!`,
        next: "y2028ctx",
      });
      go("y2027proworkerFollowup");
    }
  }

  const choices = useShuffledOnce([
    {
      id: "yes" as const,
      color: "forest" as const,
      title: "YES — STAND YOUR GROUND",
      description: "This is how you got your start in this industry…",
    },
    {
      id: "no" as const,
      color: "orange" as const,
      title: "NO — BACK DOWN",
      description:
        "No way! The job market is terrible, you can't risk losing this one.",
    },
  ]);
  return (
    <>
      <Hud tag="ALEX'S OFFICE" year={2027} />
      <Memo
        headerColor="terracotta"
        headerLeft="INTERNAL"
        headerRight="DO NOT FORWARD"
      >
        <p>Alex thinks you&apos;re being naive.</p>
      </Memo>
      <div style={{ marginTop: 24 }}>
        <AlexDialogue
          text={text}
          charDelayMs={18}
          onDone={() => setQuestionVisible(true)}
        >
          <div
            style={{
              opacity: questionVisible ? 1 : 0,
              transition: "opacity 0.4s ease",
              pointerEvents: questionVisible ? "auto" : "none",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div className="proworker-question-card">
              <h2 style={{ fontSize: 18, margin: 0 }}>Do you hold your position?</h2>
            </div>
            {choices.map((c) => (
              <ChoiceBtn
                key={c.id}
                color={c.color}
                title={c.title}
                description={c.description}
                onClick={() => decide(c.id)}
              />
            ))}
          </div>
        </AlexDialogue>
      </div>
    </>
  );
}

export function Y2027ProworkerYesScene() {
  const { go } = useGame();
  return <BlackScene onContinue={() => go("y2028ctx")} />;
}

/* Cinematic black-screen typewriter (HTML 4015-4063).
 * Phases: l1-typing → 1100ms hold → divider mounts → 500ms hold → l2-typing → 400ms → ready.
 * Reuses useTypewriter for both lines so timing/punctuation pauses match the rest of the game.
 */
const LINE1 = "Alex wants to let you go!";
const LINE2 = `Luckily, your clients come to your defense. They rave about the human touch your team has! You'll keep your job for now…`;

function BlackScene({ onContinue }: { onContinue: () => void }) {
  const isThumbnail = useIsThumbnail();
  const [mounted, setMounted] = useState(false);
  const { visible: vis1, done: done1 } = useTypewriter(LINE1, 28);
  // line2 typewriter only starts once we hit the 'l2' phase
  const [showLine2, setShowLine2] = useState(false);
  const [showDivider, setShowDivider] = useState(false);
  const [ready, setReady] = useState(false);
  const { visible: vis2, done: done2 } = useTypewriter(
    showLine2 ? LINE2 : "",
    20,
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1100ms after line1 finishes → divider; another 500ms → start line2
  useEffect(() => {
    if (!done1) return;
    const t1 = setTimeout(() => setShowDivider(true), 1100);
    const t2 = setTimeout(() => setShowLine2(true), 1100 + 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [done1]);

  // 400ms after line2 finishes → ready
  useEffect(() => {
    if (!done2 || !showLine2) return;
    const t = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(t);
  }, [done2, showLine2]);

  const overlay = (
    <div className={`black-scene ${isThumbnail ? "is-thumbnail" : ""}`}>
      <div className="black-scene-stack">
        <div className={`black-line ${!done1 ? "typing" : ""}`}>{vis1}</div>
        {showDivider ? <div className="black-scene-divider" /> : null}
        {showLine2 ? (
          <div className={`black-line ${!done2 ? "typing" : ""}`}>{vis2}</div>
        ) : null}
      </div>
      <button
        type="button"
        className={`black-scene-continue ${ready ? "ready" : ""}`}
        onClick={onContinue}
        disabled={!ready}
      >
        CONTINUE
      </button>
    </div>
  );

  // In thumbnail mode (debug map), render inline so the overlay stays inside
  // the thumbnail's .dbg-frame instead of escaping via portal.
  if (isThumbnail) return overlay;

  // Portal to <body> so the position:fixed overlay isn't trapped by .page's
  // transform (animation: fadeIn ... both keeps transform applied, which
  // makes .page the containing block for fixed-position descendants).
  if (!mounted || typeof document === "undefined") return null;
  return createPortal(overlay, document.body);
}

/* ====================================================================
 * 2028
 * ==================================================================== */

export function Y2028CtxScene() {
  const { go } = useGame();
  return (
    <SceneNewsIntro
      year={2028}
      pattern={PATTERN_W}
      title="Breaking News"
      body={
        <>
          <strong>Wired:</strong> The Ad That Knew Too Much — how agentic AI is
          personalizing marketing, and why consumers are starting to notice.
        </>
      }
    >
      <Hud tag="CLIENT CRISIS" year={2028} />

      <div className="scene-with-chart">
        <div>
          <Memo headerLeft="INBOUND CALL · GILLETTE" headerRight="URGENT">
            <p>
              It is your fourth year as Marketing Manager. The numbers look
              fine. But then your biggest client, Gillette, calls.
            </p>
            <p>Three months of flat engagement. Their comments are dead.</p>
            <div className="speech">
              <span className="speech-attrib">Gillette CMO</span>
              &quot;The content is reaching people, it&apos;s just not landing
              with anyone.&quot;
            </div>
            <p>
              He asks what your team can do to fix it.{" "}
              <strong>You can&apos;t afford to lose this client.</strong>
            </p>
          </Memo>
        </div>
        <GilCard />
      </div>

      <Btn
        color="terracotta"
        className="continue-btn"
        onClick={() => go("y2028q")}
      >
        YOUR PLAN
      </Btn>
    </SceneNewsIntro>
  );
}

export function Y2028QScene() {
  const { dispatch, applyEffects, go } = useGame();
  function pick(c: "A" | "B" | "C") {
    posthog.capture("decision_made", { year: 2028, decision_id: c, scene: "y2028q" });
    if (c === "A") {
      applyEffects([{ path: "augmentation", pathDelta: 4, standingDelta: 3 }], {
        year: 2028,
        id: "A",
      });
      dispatch({
        type: "SET_FOLLOWUP",
        heading: `Follow-up · Automate Smarter`,
        body: `You pitch it to Gillette as the best of both worlds. Jade steps into the new role and the new ads show an increase in performance. However, Jade now has a lot on her plate and starts to develop dark circles under her eyes…`,
        next: "y2029ctx",
      });
    } else if (c === "B") {
      applyEffects(
        [
          {
            path: "erosion",
            pathDelta: 3,
            standingDelta: 8,
            sentimentDelta: 8,
            notification: "STANDING ↑↑ · AI CLIMATE ↑",
          },
          { path: "shrinkage", pathDelta: 2 },
        ],
        { year: 2028, id: "B" },
      );
      dispatch({
        type: "SET_FOLLOWUP",
        heading: `Follow-up · Get More Personal`,
        body: `The ads are working. Personalization is paying off. Your standing at the agency is better than ever. What could go wrong?`,
        next: "y2029ctx",
      });
    } else {
      applyEffects(
        [
          {
            path: "proworker",
            pathDelta: 4,
            standingDelta: -3,
            sentimentDelta: -3,
          },
        ],
        { year: 2028, id: "C" },
      );
      dispatch({
        type: "SET_FOLLOWUP",
        heading: `Follow-up · Lean Into the Human Voice`,
        body: `Gillette is nervous, this goes against everything their competitors are doing. You tell them that's the point. Only time will tell!`,
        next: "y2029ctx",
      });
    }
    go("y2028followup");
  }
  const choices = useShuffledOnce([
    {
      id: "A" as const,
      color: "teal" as const,
      title: "AUTOMATE SMARTER",
      description: `You build a dual workflow: every member on your team has an AI "twin" that is available to answer questions at all times. Your team members are still responsible for managing the relationships, but the Gillette team can leverage your team's expertise at any time, for the same cost. You assign your employee Jade to manage the Gillette AI integration.`,
    },
    {
      id: "B" as const,
      color: "orange" as const,
      title: "GET MORE PERSONAL",
      description:
        "You pitch Gillette on a fully agentic AI system trained specifically on their audience data. Real-time personalization at a scale no human team can match.",
    },
    {
      id: "C" as const,
      color: "forest" as const,
      title: "LEAN INTO THE HUMAN VOICE",
      description:
        "You tell Gillette to stop competing on volume and win on voice instead. You start doing IRL activations in barbershops across the country. Strip back the cadence. Real stories. Real language. Real humans.",
    },
  ]);
  return (
    <>
      <Hud tag="DECISION 04" year={2028} />
      <Memo headerLeft="Q: GILLETTE RESCUE" headerRight="">
        <h2 style={{ fontSize: 18 }}>What&apos;s your plan?</h2>
      </Memo>
      <div className="btn-stack">
        {choices.map((c) => (
          <ChoiceBtn
            key={c.id}
            color={c.color}
            title={c.title}
            description={c.description}
            onClick={() => pick(c.id)}
          />
        ))}
      </div>
    </>
  );
}

/* ====================================================================
 * 2029
 * ==================================================================== */

export function Y2029CtxScene() {
  const { go } = useGame();
  return (
    <SceneNewsIntro
      year={2029}
      pattern={PATTERN_M}
      title="Breaking News"
      body={
        <>
          <strong>HBR:</strong> The hollowing of the marketing career ladder —
          when AI handles junior work, who learns to do senior work?
        </>
      }
    >
      <Confetti />
      <Hud tag="BEST YEAR YET" year={2029} />
      <Memo
        headerColor="mustard"
        headerLeft="ALL-HANDS · RECORD YEAR"
        headerRight=""
      >
        <p>
          The agency just had its best financial year since 2021. And
          that&apos;s saying a lot, quite a few agencies didn&apos;t make it
          this far.
        </p>
        <p>
          Alex calls a team-lead meeting to share the results. There&apos;s
          champagne.
        </p>
        <p>
          On the walk back to your desk you do a quiet calculation. Output per
          person is up around <strong>40%</strong> since 2025. But where is this
          money going?
        </p>
        <div className="email-preview">
          <div className="email-header">FROM: Alex</div>
          Let&apos;s talk about where we go from here.
        </div>
      </Memo>
      <Btn
        color="terracotta"
        className="continue-btn"
        onClick={() => go("y2029q")}
      >
        YOUR PITCH
      </Btn>
    </SceneNewsIntro>
  );
}

export function Y2029QScene() {
  const { dispatch, applyEffects, go } = useGame();
  function pick(c: "A" | "B" | "C") {
    posthog.capture("decision_made", { year: 2029, decision_id: c, scene: "y2029q" });
    if (c === "A") {
      applyEffects(
        [
          {
            path: "augmentation",
            pathDelta: 3,
            standingDelta: -2,
            sentimentDelta: -2,
          },
        ],
        { year: 2029, id: "A" },
      );
      dispatch({
        type: "SET_FOLLOWUP",
        heading: `Follow-up · Director of Human-AI Synergy`,
        body: `Alex approves it. The new hire changes the dynamic immediately. Jade exhales for the first time in a year. But it means you and Alex are not seeing any of the benefits… you worry Alex might not be thrilled!`,
        next: "recap",
      });
    } else if (c === "B") {
      applyEffects(
        [
          {
            path: "shrinkage",
            pathDelta: 4,
            standingDelta: 8,
            sentimentDelta: 5,
            notification: "STANDING ↑↑",
          },
        ],
        { year: 2029, id: "B" },
      );
      dispatch({ type: "TEAM_LOSS", member: "jade" });
      dispatch({
        type: "SET_FOLLOWUP",
        heading: `Follow-up · Manager Raise`,
        body: `Your raise came at a cost. One junior role must get absorbed into the automated pipeline to offset the salary bump, and Jade is laid off. You're orchestrating agents more than managing people now. The lean setup works, but you're a different kind of manager than you were in 2025.`,
        next: "recap",
      });
    } else {
      applyEffects(
        [
          {
            path: "proworker",
            pathDelta: 3,
            standingDelta: -6,
            sentimentDelta: -3,
            notification: "STANDING ↓",
          },
        ],
        { year: 2029, id: "C" },
      );
      dispatch({ type: "TEAM_LOSS", member: "marcus" });
      dispatch({ type: "TEAM_LOSS", member: "priya" });
      dispatch({
        type: "SET_FOLLOWUP",
        heading: `Follow-up · Pay for Retraining`,
        body: `Marcus and Priya leave for 6 months of retraining! However, you might be the next one out the door at this rate. Alex is not thrilled the money did not go to managerial level raises.`,
        next: "recap",
      });
    }
    go("y2029followup");
  }
  const choices = useShuffledOnce([
    {
      id: "A" as const,
      color: "teal" as const,
      title: "BRING ON A DIRECTOR OF HUMAN-AI SYNERGY",
      description:
        "Jade stepped into the AI Content Strategist role in 2028, and has been burning out quietly. You propose hiring someone for the role…",
    },
    {
      id: "B" as const,
      color: "mustard" as const,
      title: "TAKE A MANAGER RAISE",
      description:
        "Alex offers you a personal promotion. She says the margins support it. You say yes.",
    },
    {
      id: "C" as const,
      color: "forest" as const,
      title: "PAY FOR RETRAINING",
      description:
        "Your team is doing great, but it's clear you don't need this many hands anymore. You can use the money to help one or two of your junior staff retrain in new career paths.",
    },
  ]);
  return (
    <>
      <Hud tag="DECISION 05" year={2029} />
      <Memo
        headerLeft="Q: THE MARGIN CONVERSATION"
        headerRight="ROOM IN THE BUDGET"
      >
        <h2 style={{ fontSize: 18 }}>
          Alex says there&apos;s room in the margins. What do you push for?
        </h2>
      </Memo>
      <div className="btn-stack">
        {choices.map((c) => (
          <ChoiceBtn
            key={c.id}
            color={c.color}
            title={c.title}
            description={c.description}
            onClick={() => pick(c.id)}
          />
        ))}
      </div>
    </>
  );
}

/* ====================================================================
 * Followup scene — renders the structured state.followup
 * ==================================================================== */

export function FollowupScene() {
  const { state, dispatch, go } = useGame();
  const f = state.followup;

  function onContinue() {
    if (!f) {
      go("intro");
      return;
    }
    const nextScene = f.next;
    dispatch({ type: "CLEAR_FOLLOWUP" });
    go(nextScene);
  }

  const heading = f?.heading ?? "Follow-up";
  const body = f?.body ?? "(Missing follow-up content — returning home.)";

  return (
    <>
      <Hud />
      <div className="followup">
        <strong>{heading}</strong>
        {body}
      </div>
      <Btn color="terracotta" className="continue-btn" onClick={onContinue}>
        CONTINUE
      </Btn>
    </>
  );
}
