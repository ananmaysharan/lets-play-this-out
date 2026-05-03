'use client';

import { useEffect, useState } from 'react';
import { useGame } from '@/game/GameProvider';
import { useTypewriter } from '@/game/useTypewriter';
import { AlexDialogue, LockedContinueBtn } from '@/components/Dialogue';
import { Btn, ChoiceBtn } from '@/components/Btn';
import { Hud } from '@/components/Hud';
import { Memo } from '@/components/Memo';
import { NewsTakeover } from '@/components/NewsTakeover';
import {
  PATTERN_A,
  PATTERN_M,
  PATTERN_T_NYT,
} from '@/components/PixelLogo';
import { PaperChart } from '@/components/PaperChart';
import { FmCard } from '@/components/FmCard';
import { GilCard } from '@/components/GilCard';

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
          <strong>MIT Work of the Future Lab:</strong> AI is now economically viable to automate 11.7% of U.S. jobs —
          but that doesn&apos;t mean companies will.
        </>
      }
      onDismiss={() => go('y2025ctx')}
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
    `The agencies moving fastest on AI are winning. Some are taking a slower approach and asking tough questions… I don't want to do that yet though.\n\n` +
    `I know your team is already using some of this stuff. Get ahead of it. Set some direction. We'll talk again in Q2.`;

  return (
    <>
      <Hud tag="THE DECK DROP" year={2025} />
      <Memo headerColor="mustard" headerLeft="CONFERENCE ROOM B" headerRight="9:47 AM">
        <p>It&apos;s your first meeting as manager. Alex closes the door and drops a deck on the table.</p>
      </Memo>
      <div className="scene-with-chart">
        <AlexDialogue text={text} onDone={() => setUnlocked(true)} />
        <PaperChart />
      </div>
      <LockedContinueBtn unlocked={unlocked} onClick={() => go('y2025q')} />
    </>
  );
}

export function Y2025QScene() {
  const { dispatch, applyEffects, go } = useGame();
  function pick(c: 'A' | 'B' | 'C') {
    if (c === 'A') {
      applyEffects(
        [{ path: 'augmentation', pathDelta: 1, standingDelta: -3, sentimentDelta: 0 }],
        { year: 2025, id: 'A' }
      );
      dispatch({
        type: 'SET_FOLLOWUP',
        heading: `Follow-up`,
        body: `Alex doesn't think this is solid enough. But you're new to being a manager — it's not held against you. Yet.`,
        next: 'y2026news',
      });
    } else if (c === 'B') {
      applyEffects(
        [
          {
            path: 'shrinkage',
            pathDelta: 2,
            standingDelta: 10,
            sentimentDelta: 8,
            notification: 'STANDING ↑ AI CLIMATE ↑',
          },
        ],
        { year: 2025, id: 'B' }
      );
      dispatch({
        type: 'SET_FOLLOWUP',
        heading: `Follow-up`,
        body: `Your team's Q2 output is top-notch. Strong numbers your first year? That's how you get noticed. You're on Alex's radar as a leader who gets it.`,
        next: 'y2026news',
      });
    } else {
      applyEffects(
        [
          {
            path: 'proworker',
            pathDelta: 2,
            standingDelta: -10,
            sentimentDelta: -5,
            notification: 'STANDING ↓ AI CLIMATE ↓',
          },
        ],
        { year: 2025, id: 'C' }
      );
      dispatch({
        type: 'SET_FOLLOWUP',
        heading: `Follow-up`,
        body: `You raise concerns about creativity and client data. Alex listens, but you're on thin ice — and it's only been a little while since you started this job.`,
        next: 'y2026news',
      });
    }
    go('y2025followup');
  }
  return (
    <>
      <Hud tag="DECISION 01" year={2025} />
      <Memo headerLeft="Q: TEAM DIRECTION" headerRight="DUE: FRIDAY">
        <h2 style={{ fontSize: 18 }}>
          Alex wants your team&apos;s direction on AI by end of week. What do you tell her?
        </h2>
      </Memo>
      <div className="btn-stack">
        <ChoiceBtn
          color="teal"
          title="BUSINESS AS USUAL"
          description="Each person uses AI as they see fit — drafts, summaries, notes — but everyone is still responsible for their own output."
          onClick={() => pick('A')}
        />
        <ChoiceBtn
          color="mustard"
          title="TAKE ADVANTAGE OF THE MOMENT"
          description="Push the team to use AI to speed up output across the board. A strong first year on the job would turn heads."
          onClick={() => pick('B')}
        />
        <ChoiceBtn
          color="forest"
          title="PUMP THE BRAKES"
          description="Tell your team to be cautious — especially with client data and creative work. Don't say no. Just raise concerns."
          onClick={() => pick('C')}
        />
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
          <strong>New York Times:</strong> JP Morgan&apos;s new tech monitors employees&apos; keystrokes and meetings. The
          bank says it&apos;s for their wellbeing.
        </>
      }
      onDismiss={() => go('y2026ctx')}
    />
  );
}

export function Y2026CtxScene() {
  const { go } = useGame();
  const [unlocked, setUnlocked] = useState(false);
  const text =
    `Running lean and moving fast. That's what this year looks like.\n\n` +
    `Use FlowMetrics. Watch your team closely — who's pulling their weight, who's not.\n\n` +
    `I want eyes on the data. Your team's 6th out of 11. Fix that. Q3 review is coming.`;
  return (
    <>
      <Hud tag="YEAR 2 · FLOWMETRICS" year={2026} />
      <Memo headerColor="orange" headerLeft="SCENE · MANAGERS-ONLY MEETING" headerRight="8:12 AM">
        <p>
          2760 Inc. is adopting a new tool called <strong>FlowMetrics</strong> today! It tracks how much time each person
          spends using digital tools and the volume of content employees &amp; teams produce.
        </p>
      </Memo>
      <div className="scene-with-chart">
        <AlexDialogue text={text} onDone={() => setUnlocked(true)} />
        <FmCard />
      </div>
      <LockedContinueBtn unlocked={unlocked} onClick={() => go('y2026q')} />
    </>
  );
}

export function Y2026QScene() {
  const { dispatch, applyEffects, go } = useGame();
  function pick(c: 'A' | 'B' | 'B2' | 'C') {
    if (c === 'A') {
      applyEffects(
        [
          { path: 'proworker', pathDelta: 1, standingDelta: -2, sentimentDelta: -2 },
          { path: 'augmentation', pathDelta: 1 },
        ],
        { year: 2026, id: 'A' }
      );
      dispatch({
        type: 'SET_FOLLOWUP',
        heading: `Follow-up · Added Context`,
        body: `Your FlowMetric rank hasn't improved, but you show Alex strong client feedback numbers in defense of what you call "high-quality slow work." She's impressed you stayed late — frustrated you're not prioritizing the metric. A promotion is still not in sight.`,
        next: 'y2027news',
      });
    } else if (c === 'B') {
      applyEffects(
        [
          {
            path: 'shrinkage',
            pathDelta: 2,
            standingDelta: 8,
            sentimentDelta: 5,
            notification: 'STANDING ↑',
          },
          { path: 'erosion', pathDelta: 1 },
        ],
        { year: 2026, id: 'B' }
      );
      dispatch({
        type: 'SET_FOLLOWUP',
        heading: `Follow-up · Lean Into the Dashboard`,
        body: `Priya, your most junior employee, builds AI templates for campaign assets that let your team hit the goal. Numbers are going up. Some workflows are now almost AI from start to end. Alex compliments your team's work. A promotion doesn't feel far off.`,
        next: 'y2027news',
      });
    } else if (c === 'B2') {
      applyEffects(
        [
          {
            path: 'erosion',
            pathDelta: 3,
            standingDelta: 10,
            sentimentDelta: 8,
            notification: 'STANDING ↑↑ AI CLIMATE ↑',
          },
        ],
        { year: 2026, id: 'B2' }
      );
      dispatch({
        type: 'SET_FOLLOWUP',
        heading: `Follow-up · Bonuses Tied to Velocity`,
        body: `Alex is impressed by your initiative. You're no longer just a manager who follows direction — you're one who sets it. Q4 bonuses are now tethered to a single number.`,
        next: 'y2027news',
      });
    } else {
      applyEffects(
        [
          {
            path: 'proworker',
            pathDelta: 3,
            standingDelta: -8,
            sentimentDelta: -6,
            notification: 'STANDING ↓ AI CLIMATE ↓',
          },
        ],
        { year: 2026, id: 'C' }
      );
      dispatch({
        type: 'SET_FOLLOWUP',
        heading: `Follow-up · Push Back on the Metric`,
        body: `Alex pushes back hard. You win a partial concession: FlowMetrics won't be used in performance reviews — for now. You've spent political capital. Your team has fallen to #8 in rankings.`,
        next: 'y2027news',
      });
    }
    go('y2026followup');
  }
  return (
    <>
      <Hud tag="DECISION 02" year={2026} />
      <Memo headerLeft="Q: FLOWMETRICS RESPONSE" headerRight="RANKED 6 / 11">
        <h2 style={{ fontSize: 18 }}>
          FlowMetrics is live. Your team is being ranked. What do you do?
        </h2>
      </Memo>
      <div className="btn-stack">
        <ChoiceBtn
          color="teal"
          title="ADD CONTEXT"
          description="Tell your team efficiency matters, but good marketing requires judgment. Pull late nights gathering qualitative client feedback manually."
          onClick={() => pick('A')}
        />
        <ChoiceBtn
          color="mustard"
          title="LEAN INTO THE DASHBOARD"
          description="Set output velocity as a North Star metric. Team goal: top 3 rank by Q3."
          onClick={() => pick('B')}
        />
        <ChoiceBtn
          color="orange"
          title="TAKE INITIATIVE — BONUSES"
          description="Go to Alex and propose tying Q4 bonuses to individual output velocity scores. You know what keeps your team motivated."
          onClick={() => pick('B2')}
        />
        <ChoiceBtn
          color="forest"
          title="PUSH BACK ON THE METRIC"
          description="Request a meeting with Alex and HR. Argue FlowMetrics is a dangerous metric for creative work."
          onClick={() => pick('C')}
        />
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
          <strong>The Atlantic:</strong> &quot;Jobless Growth: The Economy Is Fine. Your Industry Isn&apos;t.&quot; GDP is up.
          Hiring is flat. AI infrastructure investment is driving growth that doesn&apos;t create jobs.
        </>
      }
      onDismiss={() => go('y2027ctx')}
    />
  );
}

export function Y2027CtxScene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="JOBLESS GROWTH" year={2027} />
      <Memo headerColor="terracotta" headerLeft="ALL-HANDS · DOWNTOWN OFFICE" headerRight="QUIET PART · LOUD">
        <p>The economy has cooled. Two clients have paused contracts. At the all-hands, the CEO says the quiet part out loud:</p>
        <div className="quote-block">
          &quot;Agentic AI tools are now capable of producing junior-level work at a fraction of the cost. We&apos;ll be reviewing
          headcount across all teams.&quot;
        </div>
        <p>
          Your junior staffers come to your desk separately that afternoon. Different faces, same question:{' '}
          <em>&quot;Should I be worried?&quot;</em>
        </p>
        <div className="email-preview">
          <div className="email-header">FROM: Alex &nbsp; · &nbsp; 4:47 PM &nbsp; · &nbsp; NO SUBJECT</div>
          Review your team&apos;s headcount. Come to me with a recommendation by EOD next week.
        </div>
      </Memo>
      <Btn color="terracotta" className="continue-btn" onClick={() => go('y2027q')}>
        → YOUR RECOMMENDATION
      </Btn>
    </>
  );
}

export function Y2027QScene() {
  const { dispatch, applyEffects, go } = useGame();
  function pick(c: 'A' | 'B' | 'C') {
    if (c === 'A') {
      applyEffects(
        [{ path: 'augmentation', pathDelta: 3, standingDelta: 2 }],
        { year: 2027, id: 'A' }
      );
      dispatch({
        type: 'SET_FOLLOWUP',
        heading: `Follow-up · Humans in the Loop`,
        body: `Junior staff are now acting as AI output editors — the humans in the loop that keep the work trustworthy. Alex is satisfied with your AI usage, but says headcount will be reviewed again next quarter.`,
        next: 'y2028ctx',
      });
      go('y2027followup');
    } else if (c === 'B') {
      applyEffects(
        [
          {
            path: 'shrinkage',
            pathDelta: 3,
            standingDelta: 8,
            sentimentDelta: 5,
            notification: 'HEADCOUNT ↓ · STANDING ↑',
          },
          { teamLoss: 'samarth' },
        ],
        { year: 2027, id: 'B' }
      );
      dispatch({
        type: 'SET_FOLLOWUP',
        heading: `Follow-up · The Tough Call`,
        body: `Q4 numbers look excellent. Alex is happy — your team is on track to be a top performer this year. Samarth lost his job. The math was clean.`,
        next: 'y2028ctx',
      });
      go('y2027followup');
    } else {
      applyEffects(
        [
          {
            path: 'proworker',
            pathDelta: 4,
            standingDelta: -12,
            sentimentDelta: -4,
            notification: 'STANDING ↓↓ AI CLIMATE ↓',
          },
        ],
        { year: 2027, id: 'C' }
      );
      dispatch({
        type: 'SET_FOLLOWUP',
        heading: `Follow-up · Into the Field`,
        body: `Real conversations. Real places. Real human insight that no model can scrape. It's good stuff. But your standing is on thin ice — and you might be next out the door…`,
        next: 'y2027proworker',
      });
      go('y2027followup');
    }
  }
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
        <ChoiceBtn
          color="teal"
          title="AUGMENT — KEEP HUMANS IN THE LOOP"
          description="AI output needs managing. Someone has to catch errors, maintain brand voice, keep the quality bar from quietly dropping."
          onClick={() => pick('A')}
        />
        <ChoiceBtn
          color="orange"
          title="MAKE THE TOUGH CALL"
          description="Your least effective junior, Samarth, has terrible FlowMetrics scores. An agentic tool can cover ~60% of his work."
          onClick={() => pick('B')}
        />
        <ChoiceBtn
          color="forest"
          title="SEND THEM INTO THE FIELD"
          description="Refuse to cut anyone. Redesign junior roles entirely — send them out daily as on-the-ground cultural correspondents."
          onClick={() => pick('C')}
        />
      </div>
    </>
  );
}

export function Y2027ProworkerScene() {
  const { dispatch, applyEffects, go } = useGame();
  const [questionVisible, setQuestionVisible] = useState(false);
  const text = `Every other agency is cutting costs. We can't afford to be romantic about this. Samarth's FlowMetrics scores are the worst on your team…`;

  function decide(held: 'yes' | 'no') {
    dispatch({ type: 'SET_PROWORKER_HELD', held });
    if (held === 'yes') {
      applyEffects([
        {
          path: 'proworker',
          pathDelta: 2,
          standingDelta: -8,
          sentimentDelta: -3,
          notification: 'STANDING ↓ AI CLIMATE ↓',
        },
      ]);
      go('y2027proworkerYes');
    } else {
      applyEffects([{ path: 'proworker', pathDelta: -1, standingDelta: 4, sentimentDelta: 3 }]);
      dispatch({
        type: 'SET_FOLLOWUP',
        heading: `Follow-up · Backing Down`,
        body: `You'll keep your job for another day… but watch out — you're still on thin ice!`,
        next: 'y2028ctx',
      });
      go('y2027proworkerFollowup');
    }
  }

  return (
    <>
      <Hud tag="ALEX'S OFFICE" year={2027} />
      <Memo headerColor="terracotta" headerLeft="INTERNAL · HOT SEAT" headerRight="DO NOT FORWARD">
        <p>Alex thinks you&apos;re being naive.</p>
      </Memo>
      <div style={{ maxWidth: 720, margin: '24px auto 0' }}>
        <AlexDialogue text={text} charDelayMs={18} onDone={() => setQuestionVisible(true)} />
      </div>
      <div
        style={{
          opacity: questionVisible ? 1 : 0,
          transition: 'opacity 0.4s ease',
          marginTop: 28,
          pointerEvents: questionVisible ? 'auto' : 'none',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 18 }}>Do you hold your position?</h2>
        <div className="btn-stack">
          <ChoiceBtn
            color="forest"
            title="YES — HOLD YOUR POSITION"
            description="This is how you got your start in this industry…"
            onClick={() => decide('yes')}
          />
          <ChoiceBtn
            color="orange"
            title="NO — BACK DOWN"
            description="No way! The job market is terrible, you can't risk losing this one."
            onClick={() => decide('no')}
          />
        </div>
      </div>
    </>
  );
}

export function Y2027ProworkerYesScene() {
  const { go } = useGame();
  return <BlackScene onContinue={() => go('y2028ctx')} />;
}

/* Cinematic black-screen typewriter (HTML 4015-4063).
 * Phases: l1-typing → 1100ms hold → divider mounts → 500ms hold → l2-typing → 400ms → ready.
 * Reuses useTypewriter for both lines so timing/punctuation pauses match the rest of the game.
 */
const LINE1 = 'Alex wants to let you go!';
const LINE2 = `Luckily, your clients come to your defense. They rave about the human touch your team has! You'll keep your job for now…`;

function BlackScene({ onContinue }: { onContinue: () => void }) {
  const { visible: vis1, done: done1 } = useTypewriter(LINE1, 28);
  // line2 typewriter only starts once we hit the 'l2' phase
  const [showLine2, setShowLine2] = useState(false);
  const [showDivider, setShowDivider] = useState(false);
  const [ready, setReady] = useState(false);
  const { visible: vis2, done: done2 } = useTypewriter(showLine2 ? LINE2 : '', 20);

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

  return (
    <div className="black-scene">
      <div className="black-scene-stack">
        <div className={`black-line ${!done1 ? 'typing' : ''}`}>{vis1}</div>
        {showDivider ? <div className="black-scene-divider" /> : null}
        {showLine2 ? (
          <div className={`black-line ${!done2 ? 'typing' : ''}`}>{vis2}</div>
        ) : null}
      </div>
      <button
        type="button"
        className={`black-scene-continue ${ready ? 'ready' : ''}`}
        onClick={onContinue}
        disabled={!ready}
      >
        → CONTINUE
      </button>
    </div>
  );
}

/* ====================================================================
 * 2028
 * ==================================================================== */

export function Y2028CtxScene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="CLIENT CRISIS" year={2028} />
      <div className="news-headline">
        <span className="news-source">Wired · January 2028</span>
        The Ad That Knew Too Much: How Agentic AI Is Personalizing Marketing — And Why Consumers Are Starting to Notice
      </div>

      <div className="scene-with-chart">
        <div>
          <Memo headerLeft="INBOUND CALL · GILLETTE" headerRight="URGENT">
            <p>Fourth year. The numbers look fine. But then Gillette — your biggest client — calls.</p>
            <p>Three months of flat engagement. Comments dead. Their CMO is direct:</p>
            <div className="speech">
              <span className="speech-attrib">Gillette CMO</span>
              &quot;The content is reaching people. It&apos;s just not landing with anyone.&quot;
            </div>
            <p>
              He asks what your team can do to fix it. <strong>You can&apos;t afford to lose this client.</strong>
            </p>
          </Memo>
        </div>
        <GilCard />
      </div>

      <Btn color="terracotta" className="continue-btn" onClick={() => go('y2028q')}>
        → YOUR PLAN
      </Btn>
    </>
  );
}

export function Y2028QScene() {
  const { dispatch, applyEffects, go } = useGame();
  function pick(c: 'A' | 'B' | 'C') {
    if (c === 'A') {
      applyEffects(
        [{ path: 'augmentation', pathDelta: 4, standingDelta: 3 }],
        { year: 2028, id: 'A' }
      );
      dispatch({
        type: 'SET_FOLLOWUP',
        heading: `Follow-up · Automate Smarter`,
        body: `You pitch it to Gillette as the best of both worlds. Jade steps into the new role and the new ads show an increase in performance. Jade has a lot on her plate to manage though and develops dark circles under her eyes.`,
        next: 'y2029ctx',
      });
    } else if (c === 'B') {
      applyEffects(
        [
          { path: 'erosion', pathDelta: 3, standingDelta: 8, sentimentDelta: 8, notification: 'STANDING ↑↑ · AI CLIMATE ↑' },
          { path: 'shrinkage', pathDelta: 2 },
        ],
        { year: 2028, id: 'B' }
      );
      dispatch({
        type: 'SET_FOLLOWUP',
        heading: `Follow-up · Get More Personal`,
        body: `The ads are working. Personalization is paying off. Your standing at the agency is better than ever. What could go wrong?`,
        next: 'y2029ctx',
      });
    } else {
      applyEffects(
        [{ path: 'proworker', pathDelta: 4, standingDelta: -3, sentimentDelta: -3 }],
        { year: 2028, id: 'C' }
      );
      dispatch({
        type: 'SET_FOLLOWUP',
        heading: `Follow-up · Lean Into the Human Voice`,
        body: `Gillette is nervous — it goes against everything their competitors are doing. You tell them that's the point. Only time will tell!`,
        next: 'y2029ctx',
      });
    }
    go('y2028followup');
  }
  return (
    <>
      <Hud tag="DECISION 04" year={2028} />
      <Memo headerLeft="Q: GILLETTE RESCUE" headerRight="BIGGEST CLIENT">
        <h2 style={{ fontSize: 18 }}>What&apos;s your plan?</h2>
      </Memo>
      <div className="btn-stack">
        <ChoiceBtn
          color="teal"
          title="AUTOMATE SMARTER"
          description={`You build a dual workflow: every member on your team has an AI "twin" that is available to answer questions at all times. Your team members are still responsible for managing the relationships, but the Gillette team can leverage your team's expertise at any time, for the same cost. You assign your employee Jade to manage the Gillette AI integration.`}
          onClick={() => pick('A')}
        />
        <ChoiceBtn
          color="orange"
          title="GET MORE PERSONAL"
          description="You pitch Gillette on a fully agentic AI system trained specifically on their audience data. Real-time personalization at a scale no human team can match."
          onClick={() => pick('B')}
        />
        <ChoiceBtn
          color="forest"
          title="LEAN INTO THE HUMAN VOICE"
          description="You tell Gillette to stop competing on volume and win on voice instead and start doing irl activations in barbershops across the country. Strip back the cadence. Real stories. Real language. Real humans."
          onClick={() => pick('C')}
        />
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
    <>
      <Hud tag="BEST YEAR YET" year={2029} />
      <div className="news-headline">
        <span className="news-source">Harvard Business Review · February 2029</span>
        The Hollowing of the Marketing Career Ladder: When AI Handles Junior Work, Who Learns to Do Senior Work?
      </div>
      <Memo headerColor="mustard" headerLeft="ALL-HANDS · RECORD YEAR" headerRight="🍾 CHAMPAGNE">
        <p>The agency just had its best financial year since 2021. And that&apos;s saying a lot — quite a few agencies didn&apos;t make it this far.</p>
        <p>Alex calls a team-lead meeting to share the results. There&apos;s champagne.</p>
        <p>
          On the walk back to your desk you do a quiet calculation. Output per person is up around <strong>40%</strong>{' '}
          since 2025. But where is this money going?
        </p>
        <div className="email-preview">
          <div className="email-header">FROM: Alex &nbsp;·&nbsp; NEXT MORNING</div>
          Let&apos;s talk about where we go from here.
        </div>
      </Memo>
      <Btn color="terracotta" className="continue-btn" onClick={() => go('y2029q')}>
        → YOUR PITCH
      </Btn>
    </>
  );
}

export function Y2029QScene() {
  const { state, dispatch, applyEffects, go } = useGame();
  function pick(c: 'A' | 'B' | 'C') {
    if (c === 'A') {
      applyEffects(
        [{ path: 'augmentation', pathDelta: 3, standingDelta: -2, sentimentDelta: -2 }],
        { year: 2029, id: 'A' }
      );
      dispatch({
        type: 'SET_FOLLOWUP',
        heading: `Follow-up · Director of Human-AI Synergy`,
        body: `Alex approves it. The new hire changes the dynamic immediately. Jade exhales for the first time in a year. But it means you and Alex are not seeing any of the benefits… you worry Alex might not be thrilled!`,
        next: 'recap',
      });
    } else if (c === 'B') {
      const newHc = Math.max(3, state.headcount - 1);
      applyEffects(
        [
          {
            path: 'shrinkage',
            pathDelta: 4,
            standingDelta: 8,
            sentimentDelta: 5,
            notification: 'HEADCOUNT ↓ · STANDING ↑↑',
          },
        ],
        { year: 2029, id: 'B' }
      );
      // Lose Jade. Floor headcount at 3 (don't drop below the original game floor).
      dispatch({ type: 'TEAM_LOSS', member: 'jade' });
      dispatch({ type: 'SET_HEADCOUNT', n: newHc });
      dispatch({
        type: 'SET_FOLLOWUP',
        heading: `Follow-up · Manager Raise`,
        body: `It came at a cost — one junior role gets absorbed into the automated pipeline to offset the salary bump. Your team goes from four to three — Jade is laid off. You're orchestrating agents more than managing people now. The lean setup works. But you're a different kind of manager than you were in 2025.`,
        next: 'recap',
      });
    } else {
      const newHc = Math.max(3, state.headcount - 2);
      applyEffects(
        [
          {
            path: 'proworker',
            pathDelta: 3,
            standingDelta: -6,
            sentimentDelta: -3,
            notification: 'HEADCOUNT ↓↓ · STANDING ↓',
          },
        ],
        { year: 2029, id: 'C' }
      );
      dispatch({ type: 'TEAM_LOSS', member: 'marcus' });
      dispatch({ type: 'TEAM_LOSS', member: 'priya' });
      dispatch({ type: 'SET_HEADCOUNT', n: newHc });
      dispatch({
        type: 'SET_FOLLOWUP',
        heading: `Follow-up · Pay for Retraining`,
        body: `Marcus and Priya leave for 6 months of retraining! However, you might be the next one out the door at this rate. Alex is not thrilled the money did not go to managerial level raises.`,
        next: 'recap',
      });
    }
    go('y2029followup');
  }
  return (
    <>
      <Hud tag="DECISION 05" year={2029} />
      <Memo headerLeft="Q: THE MARGIN CONVERSATION" headerRight="ROOM IN THE BUDGET">
        <h2 style={{ fontSize: 18 }}>Alex says there&apos;s room in the margins. What do you push for?</h2>
      </Memo>
      <div className="btn-stack">
        <ChoiceBtn
          color="teal"
          title="BRING ON A DIRECTOR OF HUMAN-AI SYNERGY"
          description="Jade stepped into the AI Content Strategist role in 2028, and has been burning out quietly. You propose hiring someone for the role…"
          onClick={() => pick('A')}
        />
        <ChoiceBtn
          color="mustard"
          title="TAKE A MANAGER RAISE"
          description="Alex offers you a personal promotion. She says the margins support it. You say yes."
          onClick={() => pick('B')}
        />
        <ChoiceBtn
          color="forest"
          title="PAY FOR RETRAINING"
          description="Your team is doing great but it's clear you don't need this many hands anymore. You can use the money to help one or two of your junior staff retrain in new career paths."
          onClick={() => pick('C')}
        />
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
      go('intro');
      return;
    }
    const nextScene = f.next;
    dispatch({ type: 'CLEAR_FOLLOWUP' });
    go(nextScene);
  }

  const heading = f?.heading ?? 'Follow-up';
  const body = f?.body ?? '(Missing follow-up content — returning home.)';

  return (
    <>
      <Hud />
      <div className="followup">
        <strong>{heading}</strong>
        {body}
      </div>
      <Btn color="terracotta" className="continue-btn" onClick={onContinue}>
        → CONTINUE
      </Btn>
    </>
  );
}
