'use client';

import { useGame } from '@/game/GameProvider';
import { Btn, ChoiceBtn } from '@/components/Btn';
import { Hud } from '@/components/Hud';
import { Memo } from '@/components/Memo';
import { EndingActions } from '../EndingActions';

export function EndErosion1Scene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="JOB EROSION" year={2031} />
      <div className="news-headline">
        <span className="news-source">Wall Street Journal · 2031</span>
        AI Productivity Tools Become Standard In White-Collar Performance Reviews
      </div>
      <Memo headerColor="terracotta" headerLeft="POLICY FAILED · CATCH UP" headerRight="Q&A WITH ALEX">
        <p>The policy failed. FlowMetrics is now tied to quarterly reviews and your numbers have plateaued.</p>
        <p>
          Alex calls you in. She pulls up a dashboard you recognize — your own output velocity, benchmarked against the
          rest of the agency. She asks what your plan is to catch up.
        </p>
        <p>You knew this was coming. You have an idea to cut your team and take people out of the reviewing loop.</p>
      </Memo>
      <Btn color="terracotta" className="continue-btn" onClick={() => go('end_erosion_2')}>
        → 2032
      </Btn>
    </>
  );
}

export function EndErosion2Scene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="GILLETTE BACKLASH" year={2032} />
      <div className="news-headline">
        <span className="news-source">Ad Age · March 2032</span>
        Gillette AI Campaign Sparks Backlash After Consumers Say Ads Felt &quot;Creepily Personal&quot;
      </div>
      <Memo headerLeft="TARGETING SCANDAL" headerRight="YOU ARE SOLO">
        <p>
          The targeting model had been identifying what it flagged internally as &quot;high-conversion emotional
          states.&quot; Nobody had time to look closely at what that meant in practice. Now it&apos;s a headline.
        </p>
        <p>Gillette is furious. The campaigns were performing. Then overnight they became a PR problem.</p>
        <div className="email-preview">
          <div className="email-header">FROM: Alex &nbsp;·&nbsp; 7:00 AM</div>
          We need eyes on this stuff again. Figure it out today.
        </div>
        <h2 style={{ fontSize: 18, marginTop: 14 }}>How do you handle AI campaign risk review as a solo team member?</h2>
      </Memo>
      <div className="btn-stack">
        <ChoiceBtn
          color="orange"
          title="HIRE A LOW-COST REVIEWER"
          description="Bring in a contractor with no marketing background to scan campaigns for obvious issues. Low-paying, gut-feel work."
          onClick={() => go('end_erosion_3')}
        />
        <ChoiceBtn
          color="terracotta"
          title="ABSORB THE WORK YOURSELF"
          description="No new hire, no new process. Just one more tab open all day. Your FlowMetrics can't afford another dip."
          onClick={() => go('end_erosion_3b')}
        />
      </div>
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
          It helps a little. The reviewer catches targeting choices that cross a line hard to define to the agentic
          system. Low-paying job. No expertise required. Just quick gut feelings on complete marketing campaigns.
        </p>
        <p>Your FlowMetrics score dips — you could have absorbed this yourself. Alex notices the inefficiency.</p>
        <p>
          Every campaign is now personalized and targeted. Your agency stayed relevant because after numerous scandals,
          clients want human review in the mix.
        </p>
        <p>
          Your workday has a rhythm now: <em>approve, reject, escalate, explain. Approve, reject, escalate, explain.</em>
        </p>
      </Memo>
      <Btn color="terracotta" className="continue-btn" onClick={() => go('end_erosion_4')}>
        → 2034
      </Btn>
    </>
  );
}

export function EndErosion3bScene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="ALL ON YOU" year={2033} />
      <Memo headerColor="terracotta" headerLeft="ONE MORE TAB" headerRight="ALL DAY">
        <p>
          The work of reviewing what the agents produce is now up to you. According to FlowMetrics, you&apos;re more
          productive than ever — but you have never felt less like a marketer.
        </p>
        <p>
          Your workday has a rhythm now: <em>approve, reject, escalate, explain.</em> Then again. Then again.
        </p>
      </Memo>
      <Btn color="terracotta" className="continue-btn" onClick={() => go('end_erosion_4')}>
        → 2034
      </Btn>
    </>
  );
}

export function EndErosion4Scene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="THE ASK" year={2034} />
      <div className="alert">FLOWMETRIC SCORE IN CRITICAL ZONE</div>
      <Memo headerColor="terracotta" headerLeft="ALEX · PAYCUT PROPOSAL" headerRight="LOYAL? MAYBE.">
        <p>
          Alex calls you into her office. You&apos;ve been a manager at 2760 Inc. for <strong>9 years</strong> now, she says, and they value your loyalty.
        </p>
        <p>
          But the skills you were originally compensated for are no longer part of the job. According to FlowMetrics,
          output velocity is higher from people paid a tenth of your salary. The craft that drew you to this career has
          been decomposed into reviewable micro-tasks.
        </p>
        <p>
          Alex says you can keep your job — but you&apos;ll take a pay reduction. She just can&apos;t justify keeping you otherwise.
        </p>
        <h2 style={{ fontSize: 18, marginTop: 10 }}>Do you accept the pay reduction?</h2>
      </Memo>
      <div className="btn-stack">
        <ChoiceBtn color="mustard" title="YES · KEEP THE JOB" onClick={() => go('end_erosion_final')} />
        <ChoiceBtn color="terracotta" title="NO · YOU'RE WORTH MORE" onClick={() => go('end_erosion_lose')} />
      </div>
    </>
  );
}

export function EndErosionLoseScene() {
  return (
    <div className="ending-screen">
      <div className="ending-label">2034 · GAME ENDED EARLY</div>
      <h1 className="ending-title" style={{ color: 'var(--terracotta)' }}>
        YOU DIDN&apos;T
        <br />
        MAKE IT
        <br />
        TO 2035.
      </h1>
      <p className="ending-body">
        Consider this a lost game. The market for your old skillset has dried up, and you&apos;re out. Let&apos;s walk back
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
      <h1 className="ending-title" style={{ color: 'var(--terracotta)' }}>
        THE WORK
        <br />
        GOT FASTER.
        <br />
        YOU GOT LESS.
      </h1>
      <p className="ending-body">
        Your job did not disappear — but the quality and pay degraded. The work is faster and more measurable, but less
        creative, and less autonomous.
      </p>
      <p className="ending-body">
        You arrived here through a mix of structural pressures and your choices. But this future is far from
        guaranteed. People, including you, have agency to change how AI is used and governed.
      </p>
      <EndingActions />
    </div>
  );
}
