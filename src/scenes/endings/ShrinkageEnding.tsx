'use client';

import posthog from 'posthog-js';
import { useEffect, useState } from 'react';
import { useGame } from '@/game/GameProvider';
import { Btn } from '@/components/Btn';
import { AlexDialogue, LockedContinueBtn } from '@/components/Dialogue';
import { Hud } from '@/components/Hud';
import { Memo } from '@/components/Memo';
import { NewsTakeover } from '@/components/NewsTakeover';
import { PATTERN_T_WIDE } from '@/components/PixelLogo';
import { Stamp } from '@/components/Stamp';
import { EndingActions } from '../EndingActions';

export function EndShrinkage0Scene() {
  const { go } = useGame();
  return (
    <NewsTakeover
      year={2031}
      pattern={PATTERN_T_WIDE}
      body={'"Agencies Report Record Margins as Junior Hiring Falls for Fifth Straight Year"'}
      onDismiss={() => go('end_shrinkage_1')}
      takeoverStyle={{
        background: 'var(--mustard)',
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.07) 1px,transparent 1px)',
        backgroundSize: '28px 28px',
      }}
      yearStyle={{ color: 'var(--ink)', textShadow: '6px 6px 0 rgba(0,0,0,0.1)' }}
    />
  );
}

export function EndShrinkage1Scene() {
  const { go } = useGame();
  const [unlocked, setUnlocked] = useState(false);

  const text =
    `"Good news. Your team is being restructured."\n\n` +
    `"We're reducing the department to just you and the agentic AI team. But you'll get a raise."`;

  return (
    <>
      <Hud tag="SELECTIVE SHRINKAGE" year={2031} />
      <Memo headerColor="mustard" headerLeft="ALEX'S OFFICE · 2031" headerRight="RESTRUCTURE">
        <p>
          The AI Job Preservation &amp; Work Sharing Act did not pass. Alex is happy. Honestly, part of you might be too.
        </p>
        <p>
          Without new rules, 2760 Inc. doesn&apos;t have to prove that AI productivity gains are being shared with workers.
          The company can move fast, stay lean, and keep margins high.
        </p>
        <p>Alex calls you into her office. You brace yourself. But she smiles.</p>
      </Memo>

      <AlexDialogue text={text} onDone={() => setUnlocked(true)}>
        <Memo style={{ margin: 0 }}>
          <p>
            On paper, it&apos;s a promotion. Your title is bigger. Your salary is better. Your &quot;team&apos;s&quot;
            output has barely dropped.
          </p>
        </Memo>
      </AlexDialogue>

      <LockedContinueBtn unlocked={unlocked} onClick={() => go('end_shrinkage_2')}>
        2032
      </LockedContinueBtn>
    </>
  );
}

export function EndShrinkage2Scene() {
  const { go } = useGame();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 360);
    return () => clearTimeout(t);
  }, []);
  return (
    <>
      <Hud tag="THE EMAIL" year={2032} />
      <Memo headerColor="mustard" headerLeft="INBOX · 5:00 PM" headerRight="AUTOMATED">
        <p>You get an email at 5pm. It&apos;s clearly automated — Gillette sent it to every agency they work with.</p>
      </Memo>

      <div
        style={{
          background: 'var(--paper)',
          border: '2px solid var(--ink)',
          boxShadow: '8px 8px 0 var(--ink)',
          maxWidth: 560,
          margin: '24px auto',
          position: 'relative',
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0) rotate(-1deg)' : 'translateY(20px) rotate(-1deg)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        <div
          style={{
            background: 'var(--ink)',
            padding: '8px 14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#C44D37' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#C9A93A' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#4E6B3F' }} />
          </div>
          <span style={{ color: 'var(--paper)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            New Message
          </span>
          <span style={{ color: 'var(--paper)', fontSize: 10, opacity: 0.5 }}>5:00 PM</span>
        </div>
        <div
          style={{
            borderBottom: '1px solid var(--paper-dim)',
            padding: '10px 18px',
            fontSize: 11,
            color: 'var(--ink-soft)',
          }}
        >
          <div>
            <strong>FROM:</strong> partnerships@gillette.com
          </div>
          <div>
            <strong>TO:</strong> allagencies@2760inc.com
          </div>
          <div>
            <strong>SUBJECT:</strong> Partnership Update — Gillette x 2760 Inc.
          </div>
        </div>
        <div style={{ padding: '20px 24px', fontSize: 13, lineHeight: 1.7 }}>
          <p style={{ marginBottom: 12 }}>
            <strong>Dear 2760 Inc. team,</strong>
          </p>
          <p style={{ marginBottom: 12 }}>
            Thank you for your partnership over the past several years. As part of our ongoing investment in internal AI
            marketing capabilities, Gillette will be transitioning targeted campaign development and optimization
            in-house.
          </p>
          <p>We appreciate your past support and wish you continued success.</p>
        </div>
      </div>

      <Btn color="terracotta" className="continue-btn" onClick={() => go('end_shrinkage_3')}>
        2033
      </Btn>
    </>
  );
}

export function EndShrinkage3Scene() {
  const { go } = useGame();
  const [unlocked, setUnlocked] = useState(false);

  const text =
    `"There isn't enough work left to justify the headcount anymore. A manager plus an agent team can do the work of two managers."\n\n` +
    `"I'm not going to make the call but FlowMetrics is going to cut one of you…"`;

  return (
    <>
      <Hud tag="50 / 50" year={2033} />
      <Memo headerColor="terracotta" headerLeft="NOT ENOUGH WORK TO GO AROUND" headerRight="">
        <p>Alex calls you into her office.</p>
      </Memo>

      <AlexDialogue text={text} onDone={() => setUnlocked(true)}>
        <Memo style={{ margin: 0 }}>
          <p style={{ fontStyle: 'italic', color: 'var(--ink-soft)', fontSize: 13, margin: 0 }}>
            It isn&apos;t personal. That&apos;s what makes it hard to argue with.
          </p>
        </Memo>
      </AlexDialogue>

      <LockedContinueBtn unlocked={unlocked} onClick={() => go('end_shrinkage_notice_a')}>
        SEE THE DECISION
      </LockedContinueBtn>
    </>
  );
}

function ShrinkageTerminationScreen({ followupText }: { followupText: string }) {
  const { state, go } = useGame();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 260);
    return () => clearTimeout(t);
  }, []);
  const emailLocal = (state.name || 'employee').toLowerCase().replace(/\s+/g, '.');
  return (
    <div className="ending-screen">
      <div
        style={{
          maxWidth: 500,
          margin: '0 auto 8px',
          fontSize: 12,
          color: 'var(--ink-soft)',
          fontStyle: 'italic',
          textAlign: 'left',
        }}
      >
        {followupText}
      </div>
      <div
        style={{
          maxWidth: 500,
          margin: '0 auto 24px',
          background: 'var(--paper)',
          border: '2px solid var(--ink)',
          boxShadow: '8px 8px 0 var(--ink)',
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        <div
          style={{
            background: 'var(--ink)',
            padding: '8px 14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#C44D37' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#C9A93A' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#4E6B3F' }} />
          </div>
          <span style={{ color: 'var(--paper)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            HR · Automated
          </span>
        </div>
        <div
          style={{
            borderBottom: '1px solid var(--paper-dim)',
            padding: '10px 18px',
            fontSize: 11,
            color: 'var(--ink-soft)',
          }}
        >
          <div>
            <strong>FROM:</strong> hr-automated@2760inc.com
          </div>
          <div>
            <strong>TO:</strong> {emailLocal}@2760inc.com
          </div>
        </div>
        <div style={{ padding: '20px 24px', position: 'relative' }}>
          <Stamp>TERMINATED</Stamp>
          <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>{state.name},</p>
          <p style={{ fontSize: 13, lineHeight: 1.65, marginBottom: 8 }}>
            We regret to inform you that your role is no longer required in our marketing operations. This decision was
            not performance-based.
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.65 }}>We wish you well.</p>
          <p style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 16 }}>
            — Automated HR Correspondence · Floor 18
          </p>
        </div>
      </div>
      <Btn color="terracotta" className="continue-btn" onClick={() => go('end_shrinkage_4')}>
        2034
      </Btn>
    </div>
  );
}

export function EndShrinkageNoticeScene() {
  return <ShrinkageTerminationScreen followupText="Unfortunately, you receive this email." />;
}
export function EndShrinkageNoticeAScene() {
  return <ShrinkageTerminationScreen followupText="Unfortunately, you receive this email." />;
}
export function EndShrinkageNoticeBScene() {
  return <ShrinkageTerminationScreen followupText="Unfortunately, you receive this email." />;
}

export function EndShrinkage4Scene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="THE JOB MARKET" year={2034} />
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', maxWidth: 640, margin: '0 auto' }}>
        <div style={{ flex: 1 }}>
          <Memo headerLeft="POST-AGENCY LIFE" headerRight="">
            <p>You are one of many.</p>
            <p>
              The marketing industry didn&apos;t collapse, it just got smaller. There are no openings left for someone
              like you.
            </p>
            <p>
              You&apos;ve started looking at physical work. Data center maintenance. Infrastructure. Things that still
              need human hands, for now. You&apos;ll begin a retraining program next month.
            </p>
            <p>
              There are too few jobs now around the writing and storytelling that brought you to marketing in the first
              place.
            </p>
          </Memo>
        </div>

        <div style={{ flexShrink: 0, width: 180, position: 'relative', marginTop: 40 }}>
          <div
            style={{
              position: 'absolute',
              top: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 60,
              height: 20,
              background: 'rgba(201,169,58,0.45)',
              border: '1px solid rgba(201,169,58,0.3)',
              zIndex: 2,
            }}
          />
          <div
            style={{
              background: 'var(--paper)',
              border: '1px solid var(--ink)',
              padding: '14px 12px',
              fontSize: 10,
              lineHeight: 1.55,
              transform: 'rotate(2deg)',
              boxShadow: '3px 3px 0 rgba(26,26,26,0.15)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 9,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                borderBottom: '1px solid var(--ink)',
                paddingBottom: 6,
                marginBottom: 8,
              }}
            >
              JOB LISTING
            </div>
            <div style={{ fontWeight: 700, fontSize: 11, marginBottom: 4 }}>Data Center Tech I</div>
            <div style={{ color: 'var(--ink-soft)', marginBottom: 6 }}>Infrastructure Ops Division</div>
            <div style={{ marginBottom: 4 }}>📍 Regional Facility</div>
            <div style={{ marginBottom: 4 }}>Full-time · On-site</div>
            <div style={{ marginBottom: 8 }}>Starting: $42,000/yr</div>
            <div
              style={{
                fontSize: 9,
                color: 'var(--ink-soft)',
                borderTop: '1px dashed var(--ink-soft)',
                paddingTop: 6,
              }}
            >
              No prior tech experience required. Training provided.
            </div>
          </div>
        </div>
      </div>

      <Btn color="terracotta" className="continue-btn" onClick={() => { posthog.capture('ending_reached', { ending_path: 'shrinkage' }); go('end_shrinkage_final'); }}>
        2035
      </Btn>
    </>
  );
}

export function EndShrinkageFinalScene() {
  return (
    <div className="ending-screen">
      <div className="ending-label">SELECTIVE SHRINKAGE · 2035</div>
      <h1 className="ending-title" style={{ color: 'var(--mustard)' }}>
        THE MARGINS
        <br />
        WENT UP.
        <br />
        THE JOBS
        <br />
        WENT DOWN.
      </h1>
      <p className="ending-body">
        You&apos;ve reached a future that experts call <strong>Selective Shrinkage</strong>.
      </p>
      <p className="ending-body">
        It didn&apos;t happen all at once. It happened in raises, in restructurings, in polite emails from clients you&apos;d
        worked with for years.
      </p>
      <p className="ending-body">
        This future isn&apos;t inevitable — but it isn&apos;t an accident either. It&apos;s the result of choices: by companies,
        by regulators, and by people navigating a system that moves faster than policy does.
      </p>
      <p className="ending-body">
        <em>You were one of those people.</em>
      </p>
      <EndingActions />
    </div>
  );
}
