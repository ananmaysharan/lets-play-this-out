"use client";

import posthog from "posthog-js";
import { useEffect } from "react";
import { useGame } from "@/game/GameProvider";
import { AvatarSprite } from "@/components/AvatarSprite";
import { Ballot, type BallotOption } from "@/components/Ballot";
import { Btn } from "@/components/Btn";
import { CalendarCard } from "@/components/Calendar";
import { Hud } from "@/components/Hud";
import { Memo } from "@/components/Memo";
import { NewsTakeover } from "@/components/NewsTakeover";
import { PATTERN_T_NYT, PATTERN_W } from "@/components/PixelLogo";
import { Polaroid, BrooklynPolaroidArt } from "@/components/Polaroid";
import { EndingCarousel } from "./EndingCarousel";

export function EndProworker1Scene() {
  const { go } = useGame();
  return (
    <NewsTakeover
      year={2031}
      pattern={PATTERN_T_NYT}
      body={
        <>
          <strong>New York Times: </strong> Landmark AI Benefit Sharing Vote
          Passes!
        </>
      }
      onDismiss={() => go("end_proworker_2")}
    />
  );
}

export function EndProworker2Scene() {
  const { dispatch, go } = useGame();
  useEffect(() => {
    dispatch({ type: "APPLY_PROWORKER_BONUS" });
  }, [dispatch]);
  return (
    <>
      <Hud tag="REDESIGN" year={2031} />
      <div className="scene-with-chart">
        <div>
          <Memo
            headerColor="forest"
            headerLeft="2031 · POLICY EFFECTS"
            headerRight="SHARE GAINS"
          >
            <p>
              <strong>The policy passed!</strong> It is not perfect, but it
              changes what Alex can ask for.
            </p>
            <p>
              2760 Inc. now has to show how AI productivity gains are being
              shared. If AI makes the team faster, the company has to prove that
              those gains are going somewhere besides executive bonuses and
              headcount reduction.
            </p>
            <p>
              You move to make sure your team does not just spend their time
              reviewing AI output but instead redesigns roles around human
              capabilities.
            </p>
          </Memo>
        </div>
        <CalendarCard />
      </div>
      <Btn
        color="forest"
        className="continue-btn"
        onClick={() => go("end_proworker_3")}
      >
        ON TO 2032
      </Btn>
    </>
  );
}

export function EndProworker3Scene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="UBI DEBATE" year={2032} />
      <Memo
        headerColor="teal"
        headerLeft="2032 · NATIONAL DEBATE"
        headerRight="UBI ON THE BALLOT"
      >
        <p>
          <strong>The country is voting again!</strong> This time, it is on a
          universal basic income funded by taxes on AI-driven profits.
        </p>
        <p>
          Everyone gets something. But full-time workers above a certain income
          get less.
        </p>
      </Memo>

      <div className="dialogue-twoway">
        <div className="dialogue-row-pw willow">
          <div className="pw-char-stage">
            <div className="pw-char-frame">
              <AvatarSprite id="teamWillow" />
            </div>
            <div className="pw-char-nametag">WILLOW</div>
          </div>
          <div className="pw-bubble tail-left">
            <span className="pw-attrib willow">WILLOW · SR. ASSOCIATE</span>
            AI gains should go to everyone, not only to people who managed to
            keep stable jobs like us!
          </div>
        </div>

        <div className="dialogue-row-pw alex">
          <div className="pw-char-stage">
            <div className="pw-char-frame alex-frame">
              <AvatarSprite id="bossAlex" viewBox="0 0 16 16" />
            </div>
            <div className="pw-char-nametag">
              ALEX <span className="role">· VP</span>
            </div>
          </div>
          <div className="pw-bubble tail-left">
            <span className="pw-attrib">ALEX · VP</span>
            I&apos;m worried. The company is already absorbing so much — shorter
            workweeks, training rules, and shared productivity requirements. One
            more cost could really hit us hard!
          </div>
        </div>
      </div>

      <div className="voter-status">
        <strong>Your situation:</strong> You are employed. You would not get the
        full amount.
      </div>

      <Btn
        color="teal"
        className="continue-btn"
        style={{ marginTop: 24 }}
        onClick={() => go("end_proworker_4")}
      >
        HEAD TO THE BALLOT
      </Btn>
    </>
  );
}

const DIVIDEND_OPTIONS: BallotOption[] = [
  {
    id: "yes",
    letter: "YES",
    text: "Pass it. Tax AI profits, fund UBI for everyone.",
  },
  {
    id: "no",
    letter: "NO",
    text: "Reject it. Too much, too fast — companies will pull back.",
  },
  {
    id: "abstain",
    letter: "ABSTAIN",
    text: "Step back. The policy feels too messy to choose either way.",
  },
];

export function EndProworker4Scene() {
  const { dispatch, go } = useGame();
  function submit(v: string) {
    posthog.capture("policy_voted", { vote: v, policy: "ai_dividend_act" });
    dispatch({
      type: "SET_DIVIDEND_VOTE",
      vote: v as "yes" | "no" | "abstain",
    });
    go("end_proworker_5");
  }
  return (
    <>
      <Hud tag="VOTE" year={2032} />
      <Ballot
        eyebrow="Official Ballot · 2032"
        title="The AI Dividend Act"
        question="How do you vote on a universal basic income funded by a tax on AI-driven profits?"
        options={DIVIDEND_OPTIONS}
        onSubmit={submit}
      />
    </>
  );
}

export function EndProworker5Scene() {
  const { go } = useGame();
  return (
    <NewsTakeover
      year={2033}
      pattern={PATTERN_W}
      body={
        <>
          <strong>WSJ:</strong> You might have a check in the mail! UBI funded
          by AI profits narrowly passes.
        </>
      }
      onDismiss={() => go("end_proworker_6")}
      takeoverStyle={{
        background: "var(--forest)",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
      yearStyle={{ textShadow: "6px 6px 0 rgba(0,0,0,0.25)" }}
    />
  );
}

export function EndProworker6Scene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="DIVIDEND PASSES" year={2033} />
      <div className="scene-with-chart">
        <div>
          <Memo
            headerColor="forest"
            headerLeft="2033 · NATIONAL · BACKLASH"
            headerRight="FREEZE"
          >
            <p>
              <strong>The AI dividend passes narrowly.</strong> The first
              payments go out in March.
            </p>
            <p>Outside of 2760 Inc., workers have more breathing room.</p>
            <p>
              But the backlash is immediate. Employers say the new AI profit tax
              is slowing hiring.
            </p>
          </Memo>

          <div className="dialogue-row-pw alex" style={{ margin: "18px 0 0" }}>
            <div className="pw-char-stage">
              <div className="pw-char-frame alex-frame">
                <AvatarSprite id="bossAlex" viewBox="0 0 16 16" />
              </div>
              <div className="pw-char-nametag">
                ALEX <span className="role">· VP</span>
              </div>
            </div>
            <div className="pw-bubble tail-left">
              <span className="pw-attrib">ALEX · VP</span>
              All these regulations are making it hard to stay afloat in these
              times of crazy change! We are going to freeze new roles until
              leadership understands the costs.
            </div>
          </div>
        </div>

        <div>
          <Polaroid
            title={
              <>
                First Payments
                <br />
                Mailed
              </>
            }
            year="MAR 2033"
            style={{ transform: "rotate(-1.5deg)", maxWidth: 340 }}
          >
            <UbiCheckArt />
          </Polaroid>
        </div>
      </div>

      <Btn
        color="forest"
        className="continue-btn"
        style={{ marginTop: 24 }}
        onClick={() => go("end_proworker_7")}
      >
        ON TO 2034
      </Btn>
    </>
  );
}

function UbiCheckArt() {
  // Subtle check / dollar illustration in the polaroid. Original used the same SVG idiom.
  return (
    <svg
      className="polaroid-art"
      viewBox="0 0 100 96"
      preserveAspectRatio="xMidYMid meet"
      style={{ aspectRatio: "1.05/1" }}
    >
      <rect x="0" y="0" width="100" height="96" fill="#E8DCC0" />
      <rect
        x="14"
        y="22"
        width="72"
        height="42"
        fill="#FDF8EC"
        stroke="#1A1A1A"
        strokeWidth="1.5"
      />
      <rect x="14" y="22" width="72" height="6" fill="#4E6B3F" />
      <text
        x="50"
        y="28"
        textAnchor="middle"
        fontFamily="Archivo Black"
        fontSize="6"
        fill="#FDF8EC"
      >
        AI DIVIDEND CHECK
      </text>
      <text
        x="22"
        y="42"
        fontFamily="Archivo Black"
        fontSize="14"
        fill="#1A1A1A"
      >
        $1,200
      </text>
      <text x="22" y="54" fontFamily="JetBrains Mono" fontSize="6" fill="#333">
        PAY TO THE ORDER OF — YOU
      </text>
      <rect x="22" y="58" width="56" height="1" fill="#1A1A1A" />
      <rect x="22" y="62" width="36" height="1" fill="#1A1A1A" />
    </svg>
  );
}

export function EndProworker7Scene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="YEAR 10 · FIELDWORK" year={2034} />
      <div className="scene-with-chart">
        <div>
          <Memo
            headerColor="forest"
            headerLeft="OFF THE DESK"
            headerRight="GILLETTE POP-UP"
          >
            <p>
              You usually have Fridays off. But this week you&apos;re headed to
              a Gillette pop-up Willow has been building toward for months.
            </p>
            <p>
              AI now handles a lot of the computer work you used to do: drafts,
              reports, audience clusters, campaign variations.
            </p>
            <p>
              So your team spends half of the four-day week{" "}
              <strong>in the field</strong>. You talk to people. You watch
              reactions. You bring real context back into the system.
            </p>
            <p>
              Your job has a lot more to do with people than it did in 2025.{" "}
              <em>For better or worse.</em>
            </p>
            <p>
              <strong>
                You and your team have made it through a chaotic 9 years!
              </strong>
            </p>
          </Memo>
        </div>
        <div>
          <Polaroid
            title={
              <>
                Gillette Pop-Up
                <br />
                Brooklyn
              </>
            }
            year="2034"
          >
            <BrooklynPolaroidArt />
          </Polaroid>
        </div>
      </div>

      <Btn
        color="forest"
        className="continue-btn"
        style={{ marginTop: 24 }}
        onClick={() => {
          posthog.capture("ending_reached", { ending_path: "proworker" });
          go("end_proworker_final");
        }}
      >
        TO THE LAST YEAR
      </Btn>
    </>
  );
}

export function EndProworkerFinalScene() {
  return <EndingCarousel current="proworker" />;
}
