'use client';

import { useGame } from '@/game/GameProvider';
import { AvatarSprite } from '@/components/AvatarSprite';
import { Btn, ChoiceBtn } from '@/components/Btn';
import { Hud } from '@/components/Hud';
import { Memo } from '@/components/Memo';
import { EndingActions } from '../EndingActions';

export function EndAugmentation1Scene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="AUGMENTATION" year={2031} />
      <Memo headerColor="teal" headerLeft="THE POLICY PASSED" headerRight="WEAKER FORM">
        <p>The policy passed, but in a weaker form than advocates wanted. Alex calls you into her office.</p>
        <p>You&apos;ll have to start showing how the benefits from AI productivity gains will be reinvested into your team itself.</p>
        <p>You decide to ask your team for input on what parts of their job they&apos;d like AI assistance on.</p>
      </Memo>
      <div className="team-display">
        {[
          { id: 'teamPriya', name: 'Priya', quote: '"All of it!"' },
          { id: 'teamSamarth', name: 'Samarth', quote: '"Just the tedious stuff"' },
          { id: 'teamMarcus', name: 'Marcus', quote: '"Maybe the file management system?"' },
          { id: 'teamJade', name: 'Jade', quote: '"I want it to generate content for me"' },
          { id: 'teamWillow', name: 'Willow', quote: "\"I don't want to use AI at all — it's killing our planet\"", warn: true },
        ].map((m, i) => (
          <div key={m.id} className="team-member" style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
            <AvatarSprite id={m.id} />
            <div className="team-name">{m.name}</div>
            <div
              className="team-role"
              style={{
                color: m.warn ? 'var(--terracotta)' : 'var(--teal-dark)',
                fontSize: 10,
                padding: '4px 8px',
              }}
            >
              {m.quote}
            </div>
          </div>
        ))}
      </div>
      <Btn color="terracotta" className="continue-btn" onClick={() => go('end_augmentation_2')}>
        → 2032
      </Btn>
    </>
  );
}

export function EndAugmentation2Scene() {
  const { dispatch, go } = useGame();
  return (
    <>
      <Hud tag="AUGMENTATION · DECISION" year={2032} />
      <Memo headerColor="mustard" headerLeft="ALEX'S OFFICE · AGAIN" headerRight="THE QUESTION">
        <p>Alex wants to know how your team is managing the hyper personalized ads.</p>
        <div className="speech">
          <span className="speech-attrib">Alex</span>
          &quot;How is your team currently managing the hyper personalized ads? Are you having a human review all of these
          before they go out?&quot;
        </div>
        <p>You pause. Your team sends out thousands of versions a day.</p>
        <h2 style={{ fontSize: 18 }}>Should every personalized campaign get human review?</h2>
      </Memo>
      <div className="btn-stack">
        <ChoiceBtn
          color="teal"
          title="YES · HAVE SOMEONE REVIEW EVERY OUTPUT"
          description="Keep a human in the loop before anything goes live."
          onClick={() => {
            dispatch({ type: 'SET_AUG_CHOICE', year: 2032, choice: 'A' });
            go('end_augmentation_3');
          }}
        />
        <ChoiceBtn
          color="orange"
          title="NO · SEND THEM OUT AS SOON AS THEY'RE GENERATED"
          description="Speed is the advantage. Trust the system."
          onClick={() => {
            dispatch({ type: 'SET_AUG_CHOICE', year: 2032, choice: 'B' });
            go('end_augmentation_3b');
          }}
        />
      </div>
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
        Your team is not happy. These automated campaigns are the primary revenue generator, but reviewing generated
        content all day is a slog.
      </div>
      <Btn color="terracotta" className="continue-btn" onClick={() => go('end_augmentation_4')}>
        → 2033
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
        Your team is relieved. No one likes reviewing generated content all day. But these campaigns are the biggest
        part of your business now, and no one is really watching them closely.
      </div>
      <Btn color="terracotta" className="continue-btn" onClick={() => go('end_augmentation_4')}>
        → 2033
      </Btn>
    </>
  );
}

export function EndAugmentation4Scene() {
  const { go } = useGame();
  return (
    <>
      <Hud tag="GILLETTE" year={2033} />
      <div
        style={{
          background: 'var(--orange)',
          border: '2px solid var(--ink)',
          padding: '20px 24px',
          margin: '20px auto',
          maxWidth: 640,
          boxShadow: '6px 6px 0 var(--ink)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -12,
            left: 14,
            background: 'var(--ink)',
            color: 'var(--paper)',
            padding: '4px 10px',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.15em',
            border: '2px solid var(--ink)',
          }}
        >
          🔔 NOTIFICATION
        </div>
        <p
          style={{
            fontFamily: 'var(--ff-display)',
            fontSize: 16,
            lineHeight: 1.3,
            marginTop: 8,
          }}
        >
          Ad Age, March 2033:
          <br />
          &quot;Gillette AI Campaign Sparks Backlash After Consumers Say Ads Felt &apos;Creepily Personal&apos;&quot;
        </p>
      </div>
      <Btn color="terracotta" className="continue-btn" onClick={() => go('end_augmentation_5')}>
        → CONTINUE
      </Btn>
    </>
  );
}

export function EndAugmentation5Scene() {
  const { state, go } = useGame();
  const choseA = state.aug2032Choice === 'A';
  return (
    <>
      <Hud tag="GILLETTE · DAMAGE CONTROL" year={2033} />
      <Memo headerColor="terracotta" headerLeft="GILLETTE IS ON THE LINE" headerRight="CRISIS MODE">
        <p>Something tells you this is not good.</p>
        <p>
          Some of your personalized ads crossed the line. Biometric data is being used to help AI agents target
          campaigns — and this time, the targeting felt too precise. Too intimate. Too creepy.
        </p>
        <p>The backlash is heavy.</p>
        {choseA ? (
          <>
            <p>
              You know reviewing AI campaigns all day is exhausting. Willow hates staring at hundreds of generated
              variations, trying to catch the ones that feel off — no single person can stay vigilant all day.
            </p>
            <p>
              You still want to keep a human in the loop, and try to <strong>divide up review tasks</strong> amongst your
              team so no one spends their whole day reviewing.
            </p>
          </>
        ) : (
          <p>
            Alex says you need to include a human in the loop for all future personalized ads. You do your best to
            divide up review tasks amongst your team so no one spends their whole day reviewing — but they are not
            happy about it.
          </p>
        )}
      </Memo>
      <Btn color="terracotta" className="continue-btn" onClick={() => go('end_augmentation_6')}>
        → 2034
      </Btn>
    </>
  );
}

export function EndAugmentation6Scene() {
  const { dispatch, go } = useGame();
  return (
    <>
      <Hud tag="THE PIVOT" year={2034} />
      <Memo headerColor="forest" headerLeft="CLIENT PRESSURE" headerRight="2034">
        <p>Every company can generate endless AI-targeted content. People are sick of how manipulative and similar it all feels.</p>
        <div className="speech">
          <span className="speech-attrib">Alex</span>
          &quot;You need to do something about this — our clients are not happy.&quot;
        </div>
        <h2 style={{ fontSize: 18, marginTop: 14 }}>How do you differentiate?</h2>
      </Memo>
      <div className="btn-stack">
        <ChoiceBtn
          color="forest"
          title="INVEST IN HAND ILLUSTRATION & HUMAN-LED VISUAL DIRECTION"
          description="Lean into craft. Make the human origin of the work visible."
          onClick={() => {
            dispatch({ type: 'SET_AUG_CHOICE', year: 2034, choice: 'A' });
            go('end_augmentation_7');
          }}
        />
        <ChoiceBtn
          color="teal"
          title='IMPLEMENT A "HUMAN-VETTED" CERTIFICATION'
          description="Maintain AI production speed but add a human moral compass and taste filter to every campaign."
          onClick={() => {
            dispatch({ type: 'SET_AUG_CHOICE', year: 2034, choice: 'B' });
            go('end_augmentation_7');
          }}
        />
      </div>
    </>
  );
}

export function EndAugmentation7Scene() {
  const { state, go } = useGame();
  const choseA = state.aug2034Choice === 'A';
  return (
    <>
      <Hud tag="IT'S WORKING" year={2034} />
      <div className="followup">
        <strong>{choseA ? 'Human-Led Creative' : 'Human-Vetted Certification'}</strong>
        {choseA
          ? `Your clients like it — they want campaigns that still feel made by people. The people who created the work are now credited directly in the final ad with a small photo and their name. The initiative is a smashing success and spreads across the agency.`
          : `Your clients like it — they want campaigns that still feel made by people. This allows you to keep the scale of AI while reassuring clients that a human "moral compass" and "taste filter" guided every decision. The initiative is a smashing success and spreads across the agency.`}
      </div>
      <Btn color="terracotta" className="continue-btn" onClick={() => go('end_augmentation_final')}>
        → 2035
      </Btn>
    </>
  );
}

export function EndAugmentationFinalScene() {
  return (
    <div className="ending-screen">
      <div className="ending-label">AUGMENTATION · 2035</div>
      <h1 className="ending-title" style={{ color: 'var(--teal-dark)' }}>
        YOU KEPT
        <br />
        THE HUMANS
        <br />
        IN THE LOOP.
      </h1>
      <p className="ending-body">
        Your marketing job remained, but the work changed. AI became a co-pilot across the process, and humans moved
        into roles focused on review, coordination, judgment, and risk.
      </p>
      <p className="ending-body">
        Policy helped make sure some AI productivity gains went back into role redesign instead of flowing only to
        executives. This future avoided large-scale job losses, and a loss of autonomy. However, there is still more
        system oversight, more cognitive load, and a constant need to decide where human judgment matters most.
      </p>
      <p className="ending-body" style={{ fontFamily: 'var(--ff-display)' }}>
        You&apos;ve reached a future experts call <em>Augmentation</em>.
      </p>
      <p className="ending-body muted" style={{ fontSize: 13 }}>
        But this future is far from guaranteed. People, including you, have agency to change how AI becomes part of our
        daily work.
      </p>
      <EndingActions />
    </div>
  );
}
