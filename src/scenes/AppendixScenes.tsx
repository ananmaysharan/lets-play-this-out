'use client';

import { useGame } from '@/game/GameProvider';
import { Btn } from '@/components/Btn';
import { Hud } from '@/components/Hud';
import { FuturesDiagram } from './FuturesDiagram';

export function FuturesScene() {
  return <FuturesDiagram />;
}

export function PoliciesScene() {
  const { reset } = useGame();
  return (
    <>
      <Hud tag="POLICY LEVERS" year={2035} />
      <h1 className="display-font" style={{ fontSize: 36, margin: '10px 0 20px' }}>
        Policies that could change the game.
      </h1>
      <div className="memo">
        <div className="memo-header forest">
          <span>01</span>
          <span>WORK-SHARING</span>
        </div>
        <div className="memo-body">
          <strong>AI Job Preservation &amp; Work Sharing Act.</strong> Companies with AI productivity gains must reduce
          hours without cutting pay, fund retraining, or redesign roles — not just eliminate them.
        </div>
      </div>
      <div className="memo">
        <div className="memo-header teal">
          <span>02</span>
          <span>AI DIVIDEND</span>
        </div>
        <div className="memo-body">
          <strong>Universal basic income funded by AI profit tax.</strong> Productivity gains flow back to everyone — not
          just to shareholders or workers who kept their jobs.
        </div>
      </div>
      <div className="memo">
        <div className="memo-header mustard">
          <span>03</span>
          <span>HUMAN-IN-LOOP STANDARDS</span>
        </div>
        <div className="memo-body">
          <strong>Mandatory review for high-risk AI outputs.</strong> Biometric targeting, emotional-state inference, and
          other sensitive categories require documented human review before deployment.
        </div>
      </div>
      <div className="memo">
        <div className="memo-header orange">
          <span>04</span>
          <span>PORTABLE RETRAINING</span>
        </div>
        <div className="memo-body">
          <strong>Worker-owned retraining accounts.</strong> Funded by payroll contributions, usable across employers,
          designed for mid-career transitions into emerging roles.
        </div>
      </div>
      <div className="memo">
        <div className="memo-header">
          <span>05</span>
          <span>METRIC TRANSPARENCY</span>
        </div>
        <div className="memo-body">
          <strong>Right-to-know over workplace surveillance.</strong> Workers can see which metrics their employers use to
          evaluate them, how they&apos;re calculated, and what uses are permitted.
        </div>
      </div>
      <Btn color="terracotta" className="continue-btn" onClick={reset}>
        ↻ PLAY AGAIN
      </Btn>
    </>
  );
}
