"use client";

import posthog from "posthog-js";
import { useState } from "react";
import { useGame } from "@/game/GameProvider";
import { useShuffledOnce } from "@/game/useShuffledOnce";
import { AvatarSprite } from "@/components/AvatarSprite";
import { Btn, ChoiceBtn } from "@/components/Btn";
import { AlexDialogue } from "@/components/Dialogue";
import { Hud } from "@/components/Hud";
import { InflammatoryAds } from "@/components/InflammatoryAds";
import { Memo } from "@/components/Memo";
import { NewsTakeover } from "@/components/NewsTakeover";
import { PATTERN_A } from "@/components/PixelLogo";
import { EndingCarousel } from "./EndingCarousel";

export function EndAugmentation1Scene() {
  const { state, go } = useGame();
  const responses = [
    {
      id: "teamPriya",
      teamKey: "priya" as const,
      name: "Priya",
      quote: '"All of it!"',
    },
    {
      id: "teamSamarth",
      teamKey: "samarth" as const,
      name: "Samarth",
      quote: '"Just the tedious stuff"',
    },
    {
      id: "teamMarcus",
      teamKey: "marcus" as const,
      name: "Marcus",
      quote: '"Maybe the file management system?"',
    },
    {
      id: "teamJade",
      teamKey: "jade" as const,
      name: "Jade",
      quote: '"I want it to generate content for me"',
    },
    {
      id: "teamWillow",
      teamKey: "willow" as const,
      name: "Willow",
      quote: "\"I don't want to use AI at all — it's killing our planet\"",
      warn: true,
    },
  ].filter((m) => state.team[m.teamKey] !== false);
  return (
    <>
      <Hud tag="AUGMENTATION" year={2031} />
      <Memo headerColor="teal" headerLeft="POLICY PASSED" headerRight="">
        <p>
          The policy passed, but in a weaker form than advocates wanted. Alex
          calls you into her office.
        </p>
        <p>
          You&apos;ll have to start showing how the benefits from AI
          productivity gains will be reinvested into your team itself.
        </p>
        <p>
          You decide to ask your team for input on what parts of their job
          they&apos;d like AI assistance on.
        </p>
      </Memo>
      <div className="graph-box">
        <div className="graph-title">Team Feedback · 2031</div>
        <div className="team-display">
          {responses.map((m, i) => (
            <div
              key={m.id}
              className="team-member"
              style={{ animationDelay: `${0.1 * (i + 1)}s` }}
            >
              <AvatarSprite id={m.id} />
              <div className="team-name">{m.name}</div>
              <div
                className="team-role"
                style={{
                  color: m.warn ? "var(--terracotta)" : "var(--teal-dark)",
                  fontSize: 10,
                  padding: "4px 8px",
                }}
              >
                {m.quote}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Btn
        color="terracotta"
        className="continue-btn"
        onClick={() => go("end_augmentation_2")}
      >
        Continue
      </Btn>
    </>
  );
}

export function EndAugmentation2Scene() {
  const { dispatch, go } = useGame();
  const [unlocked, setUnlocked] = useState(false);
  function pick(choice: "A" | "B") {
    posthog.capture("decision_made", {
      year: 2032,
      decision_id: choice,
      scene: "end_augmentation_2",
    });
    dispatch({ type: "SET_AUG_CHOICE", year: 2032, choice });
    go(choice === "A" ? "end_augmentation_3" : "end_augmentation_3b");
  }
  const choices = useShuffledOnce([
    {
      id: "A" as const,
      color: "teal" as const,
      title: "YES",
      description: "Yes, have someone on your team review every output.",
    },
    {
      id: "B" as const,
      color: "orange" as const,
      title: "NO",
      description: "No, send them out as soon as they are generated.",
    },
  ]);
  const text = `"How is your team currently managing the hyper personalized ads? Are you having a human review all of these before they go out?"`;
  return (
    <>
      <Hud tag="AUGMENTATION · DECISION" year={2032} />
      <Memo headerColor="mustard" headerLeft="ALEX'S OFFICE" headerRight="">
        <p>Alex calls you back into her office.</p>
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
            <p
              style={{
                fontSize: 12,
                margin: "0 0 8px",
                fontStyle: "italic",
                color: "var(--ink-soft)",
              }}
            >
              You pause. Your team sends out thousands of these ads a day.
            </p>
            <h2 style={{ fontSize: 18, margin: 0 }}>
              Should every personalized campaign get human review?
            </h2>
          </div>
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
      </AlexDialogue>
    </>
  );
}

export function EndAugmentation3Scene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="AUGMENTATION · 2032" year={2032} />
      <div className="followup">
        <strong>Your team&apos;s reaction</strong>
        Your team is not happy. These automated campaigns are the primary
        revenue generator, but reviewing generated content all day is a slog.
      </div>
      <Btn
        color="terracotta"
        className="continue-btn"
        onClick={() => go("end_augmentation_4")}
      >
        2033
      </Btn>
    </>
  );
}

export function EndAugmentation3bScene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="AUGMENTATION · 2032" year={2032} />
      <div className="followup">
        <strong>Your team&apos;s reaction</strong>
        Your team is relieved. No one likes reviewing generated content all day.
        But these campaigns are the biggest part of your business now, and no
        one is really watching them closely.
      </div>
      <Btn
        color="terracotta"
        className="continue-btn"
        onClick={() => go("end_augmentation_4")}
      >
        2033
      </Btn>
    </>
  );
}

export function EndAugmentation4Scene() {
  const { go } = useGame();
  return (
    <NewsTakeover
      year={2033}
      pattern={PATTERN_A}
      title="Ad Age · March 2033"
      body={
        <>
          <strong>Ad Age:</strong> Gillette AI campaign sparks backlash after
          consumers say ads felt &quot;creepily personal.&quot;
        </>
      }
      onDismiss={() => go("end_augmentation_4_ads")}
    />
  );
}

export function EndAugmentation4AdsScene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="GILLETTE BACKLASH" year={2033} />
      <Memo headerLeft="THE ADS" headerRight="GOING VIRAL">
        <p>
          The targeting model had been pulling biometric and behavioral signals
          to optimize for what it flagged as &quot;high-conversion emotional
          states.&quot; Nobody had time to look closely at what that meant in
          practice. Now the ads are everywhere.
        </p>
      </Memo>
      <InflammatoryAds />
      <Btn
        color="terracotta"
        className="continue-btn"
        onClick={() => go("end_augmentation_5")}
      >
        Continue
      </Btn>
    </>
  );
}

export function EndAugmentation5Scene() {
  const { state, go } = useGame();
  const choseA = state.aug2032Choice === "A";
  return (
    <>
      <Hud tag="GILLETTE · DAMAGE CONTROL" year={2033} />
      <Memo
        headerColor="terracotta"
        headerLeft="GILLETTE IS ON THE LINE"
        headerRight="CRISIS MODE"
      >
        <p>Gillette is on the line, and they are not happy.</p>
        <p>The backlash is heavy.</p>
        {choseA ? (
          <>
            <p>
              You know reviewing AI campaigns all day is exhausting. Willow
              hates staring at hundreds of generated variations, trying to catch
              the ones that feel off.
            </p>
            <p>
              You still want to keep a human in the loop, and try to{" "}
              <strong>divide up review tasks</strong> amongst your team so no
              one spends their whole day reviewing.
            </p>
          </>
        ) : (
          <p>
            Alex says you need to include a human in the loop for all future
            personalized ads. You do your best to divide up review tasks amongst
            your team so no one spends their whole day reviewing, but they are
            not happy about it.
          </p>
        )}
      </Memo>
      <Btn
        color="terracotta"
        className="continue-btn"
        onClick={() => go("end_augmentation_6")}
      >
        Continue
      </Btn>
    </>
  );
}

export function EndAugmentation6Scene() {
  const { dispatch, go } = useGame();
  const [unlocked, setUnlocked] = useState(false);
  function pick(choice: "A" | "B") {
    posthog.capture("decision_made", {
      year: 2034,
      decision_id: choice,
      scene: "end_augmentation_6",
    });
    dispatch({ type: "SET_AUG_CHOICE", year: 2034, choice });
    go("end_augmentation_7");
  }
  const choices = useShuffledOnce([
    {
      id: "A" as const,
      color: "forest" as const,
      title: "INVEST IN HUMAN-LED VISUAL DIRECTION",
      description:
        "Lean into craft and hand illustration. Make the human origin of the work visible.",
    },
    {
      id: "B" as const,
      color: "teal" as const,
      title: "ADD A CREATIVE AI DIRECTOR",
      description:
        "Keep the AI engine, but put a human creative lead on every campaign. They shape the concept, push back on generic outputs, and always make the final calls.",
    },
  ]);
  const text = `"You need to do something about this, our clients are not happy."`;
  return (
    <>
      <Hud tag="THE PIVOT" year={2034} />
      <Memo
        headerColor="forest"
        headerLeft="CLIENT PRESSURE"
        headerRight="2034"
      >
        <p>
          Every company can generate endless AI-targeted content. People are
          sick of how manipulative and similar it all feels.
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
              How do you differentiate?
            </h2>
          </div>
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
      </AlexDialogue>
    </>
  );
}

export function EndAugmentation7Scene() {
  const { state, go } = useGame();
  const choseA = state.aug2034Choice === "A";
  return (
    <>
      <Hud tag="IT'S WORKING" year={2034} />
      <div className="followup">
        <strong>
          {choseA ? "Human-Led Creative" : "Creative AI Director"}
        </strong>
        {choseA
          ? `Your clients like it! They want campaigns that still feel made by humans. The people who created the work are now credited directly in the final ad with a small photo and their name. The initiative is a smashing success and spreads across the agency.`
          : `It works. Clients still get AI speed, but the campaigns feel less generic because real people are steering them. Human creative leads become the new agency standard!`}
      </div>
      <Btn
        color="terracotta"
        className="continue-btn"
        onClick={() => {
          posthog.capture("ending_reached", { ending_path: "augmentation" });
          go("end_augmentation_final");
        }}
      >
        2035
      </Btn>
    </>
  );
}

export function EndAugmentationFinalScene() {
  return <EndingCarousel current="augmentation" />;
}
