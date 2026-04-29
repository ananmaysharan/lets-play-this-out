'use client';

import { useEffect, useState } from 'react';
import { useGame } from '@/game/GameProvider';
import { Btn } from '@/components/Btn';
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

const InlineAlexAvatar = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" style={{ border: '2px solid var(--ink)', background: 'var(--paper-dim)' }}>
    <rect x="18" y="38" width="36" height="30" fill="#3D7A84" />
    <rect x="24" y="38" width="24" height="4" fill="#5A9BA6" />
    <polygon points="36,42 28,38 44,38" fill="#FDF8EC" />
    <ellipse cx="36" cy="28" rx="14" ry="15" fill="#D4A982" />
    <ellipse cx="36" cy="16" rx="14" ry="8" fill="#2A1A0A" />
    <rect x="22" y="16" width="4" height="14" fill="#2A1A0A" />
    <rect x="46" y="16" width="4" height="12" fill="#2A1A0A" />
    <ellipse cx="30" cy="27" rx="2.5" ry="3" fill="#1A1A1A" />
    <ellipse cx="42" cy="27" rx="2.5" ry="3" fill="#1A1A1A" />
    <circle cx="31" cy="26" r="1" fill="white" />
    <circle cx="43" cy="26" r="1" fill="white" />
    <path d="M30 34 Q36 39 42 34" stroke="#1A1A1A" strokeWidth="1.5" fill="none" />
  </svg>
);

function useTypeLine(text: string, active: boolean, onDone?: () => void): string {
  const [vis, setVis] = useState('');
  useEffect(() => {
    if (!active) return;
    setVis('');
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setVis(text);
      onDone?.();
      return;
    }
    let i = 0;
    let cancelled = false;
    let t: ReturnType<typeof setTimeout> | null = null;
    const tick = () => {
      if (cancelled) return;
      if (i >= text.length) {
        setTimeout(() => onDone?.(), 400);
        return;
      }
      setVis(text.slice(0, i + 1));
      i++;
      t = setTimeout(tick, 28);
    };
    tick();
    return () => {
      cancelled = true;
      if (t) clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  return vis;
}

export function EndShrinkage1Scene() {
  const { go } = useGame();
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);
  const t1 = useTypeLine('"Good news. Your team is being restructured."', stage === 0, () => setStage(1));
  const t2 = useTypeLine('You brace yourself. But she smiles.', stage === 1, () => setStage(2));
  const t3 = useTypeLine(
    `"We're reducing the department to just you and the agentic agent team. But you'll get a raise."`,
    stage === 2,
    () => setStage(3)
  );

  return (
    <>
      <Hud tag="SELECTIVE SHRINKAGE" year={2031} />
      <div className="news-headline">
        <span className="news-source">Industry Report · 2031</span>
        Agencies Report Record Margins as Junior Hiring Falls For Fifth Straight Year
      </div>
      <Memo headerColor="mustard" headerLeft="ALEX'S OFFICE · 2031" headerRight="RESTRUCTURE">
        <p>
          The AI Job Preservation &amp; Work Sharing Act did not pass. Alex is happy. Honestly, part of you might be too.
        </p>
        <p>
          Without new rules, 2760 Inc. doesn&apos;t have to prove that AI productivity gains are being shared with workers.
          The company can move fast, stay lean, and keep margins high.
        </p>
        <p>Alex calls you into her office.</p>
      </Memo>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 18,
          margin: '20px auto 8px',
          maxWidth: 640,
        }}
      >
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <InlineAlexAvatar />
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--teal-dark)',
            }}
          >
            Alex
          </span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <DialogBubble text={t1} />
          <ItalicAside text={t2} />
          <DialogBubble text={t3} />
        </div>
      </div>

      <Memo style={{ marginTop: 16 }}>
        <p>On paper, it&apos;s a promotion. Your title is bigger. Your salary is better. Your &quot;team&apos;s&quot; output has barely dropped.</p>
      </Memo>

      <Btn
        color="terracotta"
        className="continue-btn"
        style={{ opacity: stage === 3 ? 1 : 0, transition: 'opacity 0.4s' }}
        disabled={stage !== 3}
        onClick={() => go('end_shrinkage_2')}
      >
        → 2032
      </Btn>
    </>
  );
}

function DialogBubble({ text }: { text: string }) {
  return (
    <div
      style={{
        background: 'var(--paper)',
        border: '2px solid var(--ink)',
        padding: '12px 16px',
        position: 'relative',
        boxShadow: '3px 3px 0 var(--ink)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: -12,
          bottom: 14,
          width: 0,
          height: 0,
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          borderRight: '12px solid var(--ink)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: -9,
          bottom: 15,
          width: 0,
          height: 0,
          borderTop: '7px solid transparent',
          borderBottom: '7px solid transparent',
          borderRight: '11px solid var(--paper)',
        }}
      />
      <span className="mono" style={{ fontSize: 14, lineHeight: 1.5 }}>
        {text}
      </span>
    </div>
  );
}

function ItalicAside({ text }: { text: string }) {
  return (
    <div
      style={{
        background: 'var(--paper-dim)',
        border: '2px solid var(--ink)',
        padding: '10px 16px',
        fontSize: 13,
        color: 'var(--ink-soft)',
        fontStyle: 'italic',
      }}
    >
      <span className="mono">{text}</span>
    </div>
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

      <Memo style={{ maxWidth: 640, margin: '0 auto' }}>
        <p style={{ fontStyle: 'italic' }}>You&apos;d better see how this goes.</p>
      </Memo>

      <Btn color="terracotta" className="continue-btn" onClick={() => go('end_shrinkage_3')}>
        → 2033
      </Btn>
    </>
  );
}

export function EndShrinkage3Scene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="50 / 50" year={2033} />
      <Memo headerColor="terracotta" headerLeft="CLIENTS FOLLOW" headerRight="IN-HOUSE AI">
        <p>
          More clients follow Gillette. Not dramatically — just steadily, one by one. They don&apos;t need agencies for
          volume anymore. Their internal AI systems generate copy, test audiences, schedule posts, and optimize
          campaigns in real time. There isn&apos;t enough work left to justify the headcount.
        </p>
        <p>
          The decision of who stays isn&apos;t made by Alex. It&apos;s made by a system — performance metrics pulled, scores
          calculated, a process run. You and a colleague are rated equally. There simply isn&apos;t room for both of you.
        </p>
        <p style={{ fontStyle: 'italic', color: 'var(--ink-soft)', fontSize: 13 }}>
          It isn&apos;t personal. That&apos;s what makes it hard to argue with.
        </p>
      </Memo>

      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)',
            marginBottom: 14,
          }}
        >
          How do you handle this?
        </p>
        <div style={{ display: 'grid', gap: 14 }}>
          <button
            type="button"
            className="btn"
            style={{ textAlign: 'left', padding: '20px 22px', background: 'var(--paper)' }}
            onClick={() => go('end_shrinkage_notice_a')}
          >
            <span style={{ display: 'block', fontFamily: 'var(--ff-display)', fontSize: 14, marginBottom: 6, letterSpacing: '0.01em' }}>
              A — Wait for the decision.
            </span>
            <span
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 400,
                textTransform: 'none',
                letterSpacing: 0,
                lineHeight: 1.55,
                color: 'var(--ink-soft)',
              }}
            >
              You agree that the system deciding will be fairest — it has metrics on both you and your colleague.
            </span>
          </button>
          <button
            type="button"
            className="btn"
            style={{ textAlign: 'left', padding: '20px 22px', background: 'var(--paper)' }}
            onClick={() => go('end_shrinkage_notice_b')}
          >
            <span style={{ display: 'block', fontFamily: 'var(--ff-display)', fontSize: 14, marginBottom: 6, letterSpacing: '0.01em' }}>
              B — Advocate for both of you to stay.
            </span>
            <span
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 400,
                textTransform: 'none',
                letterSpacing: 0,
                lineHeight: 1.55,
                color: 'var(--ink-soft)',
              }}
            >
              You argue that a system can&apos;t do the same quality of work. You might be less efficient, but you both
              understand marketing better than any AI model.
            </span>
          </button>
        </div>
      </div>
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
        → 2034
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
          <Memo headerLeft="POST-AGENCY LIFE" headerRight="RETRAINING">
            <p>You are one of many.</p>
            <p>
              The marketing industry didn&apos;t collapse — it just got smaller. Quietly. Efficiently. And there are no
              openings left for someone like you.
            </p>
            <p>
              You&apos;ve started looking at physical work. Data center maintenance. Infrastructure. Things that still need
              human hands, for now. You&apos;ll begin a retraining program next month. It has nothing to do with writing,
              or the instinct for storytelling that brought you to marketing in the first place.
            </p>
            <p>That part of you doesn&apos;t have a job title anymore.</p>
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

      <Btn color="terracotta" className="continue-btn" onClick={() => go('end_shrinkage_final')}>
        → 2035
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
