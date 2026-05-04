"use client";

import { useState } from "react";
import { useGame } from "@/game/GameProvider";
import { AvatarSprite } from "@/components/AvatarSprite";
import { Btn } from "@/components/Btn";
import { Hud } from "@/components/Hud";
import { TeamDisplay } from "@/components/TeamDisplay";

export function TeamIntroScene() {
  const { go } = useGame();
  const [step, setStep] = useState<1 | 2>(1);

  return (
    <>
      <Hud tag="THE TEAM" year={2025} />
      <div className="intro-stage">
        {step === 1 ? (
          <div>
            <div className="metric-tips-row">
              <div className="metric-tip">
                <span className="tip-label standing">Company Standing</span>
                <p>
                  This shows where you stand with your boss and the company. Keep
                  an eye on this. It will tell you if you might be headed toward{" "}
                  <strong>a promotion or a layoff</strong>!
                </p>
              </div>
              <div className="metric-tip">
                <span className="tip-label climate">AI Climate</span>
                <p>
                  <strong>Keep an eye on national sentiment toward AI.</strong>{" "}
                  AI regulation might affect your day to day!
                </p>
              </div>
            </div>
            <Btn
              color="terracotta"
              className="intro-step-btn"
              style={{ marginTop: 24 }}
              onClick={() => setStep(2)}
            >
              MEET YOUR BOSS &amp; TEAM
            </Btn>
          </div>
        ) : (
          <div className="intro-reveal shown">
            <div className="intro-people-stack">
              <div className="memo">
                <div className="memo-header">
                  <span>YOUR BOSS</span>
                  <span>C-SUITE</span>
                </div>
                <div className="memo-body boss-row">
                  <div className="team-member alex-card-portrait">
                    <AvatarSprite id="bossAlex" viewBox="0 0 16 16" />
                    <div className="team-name">ALEX</div>
                    <div className="team-role">Vice President</div>
                  </div>
                  <p className="boss-bio">
                    Sharp. Commercial. Watches the margins.{" "}
                    <strong>
                      She gave you this promotion — she can take it away at any
                      time.
                    </strong>
                  </p>
                </div>
              </div>

              <div className="memo">
                <div className="memo-header teal">
                  <span>FLOOR 27 · YOUR TEAM</span>
                </div>
                <div className="memo-body">
                  <p style={{ fontSize: 12, marginBottom: 14 }}>
                    These are the people you&apos;re now responsible for. Keep
                    an eye on them over the next 10 years.
                  </p>
                  <TeamDisplay compact />
                </div>
              </div>
            </div>
            <Btn
              color="terracotta"
              className="intro-step-btn"
              style={{ marginTop: 24 }}
              onClick={() => go("y2025news")}
            >
              BEGIN
            </Btn>
          </div>
        )}
      </div>
    </>
  );
}
