# Continuity Audit — Let's Play This Out

A path-by-path continuity review of the 10-year arc (2025→2035), focusing on long-arc discontinuities, ghost characters, tone whiplash, and missing acknowledgment that jobs remain tight under AI even on the "good" paths.

---

## Headline findings (ranked by severity)

### 1. Proworker 2029C "retraining" tonally betrays the path
**File:** `src/scenes/YearScenes.tsx` ~lines 1019–1023 / 993–998

On a pure C run the player has spent four years insisting "AI doesn't have to eliminate juniors." Then 2029C tells them "you don't need this many hands anymore" and ships Marcus and Priya off to retraining — using the exact word the player has been *fighting against*. The follow-up also ends with "you might be next out the door at this rate," which has been the warning for four years and now lands hollow against the champagne / record-year framing of the 2029 setup.

**Fix shape:** rewrite C to acknowledge "the policy fight hasn't reversed the structural pressure — AI gains still haven't translated into job growth outside this office," and drop the "next out the door" refrain in favor of bittersweet acknowledgment.

---

### 2. "You and your team has made it through a chaotic 9 years" — almost never true
**File:** `src/scenes/endings/ProworkerEnding.tsx:374`

Hardcoded. On the canonical C/C/C-hold/C/C path, 2029C removes Marcus and Priya, so the team is actually 3 (Samarth + Jade + Willow). Even worse on wobble paths (player who fired Samarth in 2027B + lost Jade in 2029B and wobbled into proworker → "team of five" off by 2). The proworker ending file never reads `state.team` at all (augmentation does — line 22).

**Fix shape:** pull headcount from `state.team` and interpolate, or use neutral copy: *"Your remaining team has made it through a chaotic 9 years — the ones who held on alongside you."*

---

### 3. `state.proWorkerHeld` never read in any ending
The 2027 "hold position vs back down" answer is stored but **never consumed** anywhere in `ProworkerEnding.tsx`. A player who explicitly backed down (scared of losing job, proworker −1) gets the same triumphant ending as one who stood their ground. The path's whole emotional meaning is "you were principled under pressure" — only true if `held === 'yes'`.

**Fix shape:** in `EndProworkerFinalScene`, conditionally render: *"Not every battle was won. In 2027 you backed down. But the direction held."*

---

### 4. "Jade stepped into the AI Content Strategist role in 2028" shown unconditionally
**File:** `src/scenes/YearScenes.tsx:1007–1010`

Description for 2029A claims Jade is burning out in the AI integration role — but Jade only got that role on **2028A** path. Players who chose 2028B or 2028C see this description and have no idea what it's referring to.

**Fix shape:** rewrite 2029A description to be path-agnostic, or gate the Jade mention on `history` containing 2028A.

---

### 5. Augmentation 2032 assumes hyper-personalized ad pipeline
**File:** `src/scenes/endings/AugmentationEnding.tsx:82–87, 161–171`

"How is your team managing the hyper personalized ads?" is asked universally, but a player who chose 2028C (lean into human voice, barbershop activations, anti-personalization) literally pivoted Gillette away from this. They now face a creepy-personalization scandal for ads they explicitly didn't run.

**Fix shape:** acknowledge that "since 2028, the agency shifted toward personalization-at-scale" as an industry trend that overtook the player's approach, rather than assuming it was the player's explicit strategy.

---

### 6. "9 years" vs. "Year 10" tenure inconsistency
- `ErosionEnding.tsx:283` says "manager at 2760 Inc. for 9 years now"
- `ProworkerEnding.tsx` HUD tag at the same time-slice is `"YEAR 10 · FIELDWORK"`

Same year, two different framings.

**Fix shape:** use "nearly a decade" in erosion to sidestep the counting ambiguity, or unify on one count.

---

### 7. Shrinkage 2031 restructure ignores already-cut team
On pure B/B/B/B/B, the player already fired Samarth in 2027 and lost Jade in 2029. The 2031 "we're reducing the department to just you and the agents" beat treats this as if it's happening from a full team — no acknowledgment of the years of voluntary shedding.

---

### 8. Tone whiplash: Alex's 2031 → 2033 reversal in proworker
- 2031: Alex calmly explains compliance with the policy
- 2033: "all these regulations are making it hard to stay afloat"

The trajectory should plausibly run reluctance → acceptance, but the game runs it embraced → resented.

---

### 9. Static "Your Path Here" scroll on proworker final
**File:** `ProworkerEnding.tsx:436–475`

The path summary is hardcoded ("FlowMetrics Pushback," "Hold Position," "Pro-Worker Vote"). Wobble-in players who chose A every year see a path summary that doesn't reflect their playthrough.

**Fix shape:** drive year-step text from `state.history`, or replace with neutral labels.

---

### 10. Dead code: three identical shrinkage termination scenes
**File:** `ShrinkageEnding.tsx:273–281`

`EndShrinkageNoticeScene`, `EndShrinkageNoticeAScene`, `EndShrinkageNoticeBScene` all render identically. The router only ever sends to `_a`. Looks like the design intended a "you survive vs. colleague survives" branch that was never built.

---

## Cross-cutting gap: jobs still tight under AI

Even on the "good" paths, **no scene acknowledges that jobs remain tight under AI in the broader market**. The proworker ending reads as "we won, the policy passed, everything worked out" without conceding that 2760 Inc. is now an island and the people on the team know they're lucky to have these specific seats. The 2027 "jobless growth" and 2029 "hollowing career ladder" newscasts are set up but never paid off in the endings.

**Recommended insertion** in `EndProworker7Scene`, after "For better or worse.":

> *Out there, the marketing industry is smaller than it was in 2025. Your team knows this building is one of the few places left for them. That's not a small thing.*

---

## Long-arc discontinuities by path

### Proworker (pure C/C/C-hold/C/C → FOR)

- **2032 Willow dialogue** ("AI gains should not only go to people who managed to keep stable jobs like us") calls these "stable jobs," but on the C path the player has been on thin ice since 2025 and nearly got fired in 2027. "Stable" is a stretch — should be "people who still have jobs like us."
- **2033 Alex freezing roles** is a real consequence of the player's advocacy, but the scene doesn't connect back to it. Missed emotional beat.
- **2034 Willow as Gillette pop-up lead** appears without setup. 2028C describes the *whole team* going into barbershops, never names Willow specifically. Seed Willow's lead role in 2028C follow-up.
- **"team of five" + "9 years"** issues (see findings #2, #6).

### Proworker (mixed: C/C/C-backdown/A/C → FOR)

Player backed down in 2027 and chose augmentation in 2029, but still proworker-dominant. The 2031 text ("you move to make sure your team does not just spend their time reviewing AI output but instead redesigns roles around human capabilities") fits someone who consistently pushed back, not someone who wavered. No conditional rendering exists.

### Augmentation (pure A/A/A/A/A → FOR)

- **2032 hyper-personalized ads** premise is partially defensible on 2028A (the "AI twin" workflow is a form of personalization), but the 2033 *biometric* scandal feels like an escalation the player never authorized.
- **FlowMetrics rank thread is dropped.** 2026A says rank "hasn't improved." Never returned to in 2028/2029. Abandoned mechanic.

### Shrinkage (pure B/B/B/B/B → AGAINST)

- **2031 restructure** doesn't acknowledge prior team losses (Samarth in 2027, Jade in 2029). The player has been voluntarily shedding people for years; the 2031 cut should land as confirmation, not surprise.
- **2032 Gillette loss email** is chronologically sound — earned by the 2028 "Get More Personal" → 2033 scandal arc.
- **2034 retraining** is earned (player is laid off). No issue.

### Erosion (B2 + B run → AGAINST)

- **2031** Alex cuts the team entirely, but on a B2 path the player *tied bonuses to FlowMetrics* — this was a management-driven choice, not just structural pressure. The cut should acknowledge the player built this. Currently feels like it's happening *to* them.
- **Erosion does the best job** of any ending capturing the structural pressure ("approve, reject, escalate, explain"). Needs the least remediation.

---

## Ghost-character bugs

**Augmentation team display correctly filtered** by `state.team[m.teamKey] !== false` (`AugmentationEnding.tsx:22`). Samarth (if 2027B), Jade (if 2029B), and Marcus/Priya (if 2029C) all hide correctly.

**Proworker ending does NOT read `state.team`.** `EndProworker7Scene` line 374 says "team of five" unconditionally. On the canonical pure-C path, 2029C removes Marcus and Priya → team is 3 (Samarth + Jade + Willow). On wobble paths from runs that fired Samarth (2027B) and lost Jade (2029B), team is even smaller. Always wrong on canonical path.

---

## State variables not gated correctly

| Variable | Status | Notes |
|---|---|---|
| `proWorkerHeld` | Set, never read in any ending | Critical for proworker emotional payoff |
| `aug2032Choice` | Correctly used | `AugmentationEnding.tsx:162` branches 2033 text |
| `history` | Tracked, never read | No path-aware language anywhere in endings |
| `endingPath` | Set, never read by ending scenes | No wobble-specific language |
| `state.team` | Read in augmentation only | Missing in proworker ending (causes "team of five" bug) |

---

## Tone whiplash moments

**Proworker 2029C follow-up.** "You might be next out the door at this rate" has been the warning for four years and stops landing. By 2029, on a path the player has survived this long, the line is exhausted.

**Proworker 2031 → 2033 Alex.** Embraced compliance → resented compliance is the wrong direction. Reluctance → acceptance would be more plausible.

**Shrinkage 2031** "Honestly, part of you might be too" [happy the bill failed]. Coherent on pure B path. Off-key for a wobble-in player from augmentation who never sought personal benefit from cuts.

**Proworker final "Your Path Here" scroll.** Hardcoded labels claim a specific playthrough that wobble-in players didn't actually take.

---

## Smaller fit-and-finish issues

- `TeamIntroScene.tsx:70` says "FLOOR 27" but the script doc says "FLOOR 23"
- `ShrinkageEnding.tsx:349` has a 📍 emoji in copy
- `NEW_SCRIPT.MD:662` typo "to few" (correctly "too few" in code)
- FlowMetrics rank is referenced in 2026 (#2 / #9) but never paid off in 2027–2029
- The "you might be next out the door" line is reused 3+ times on proworker path

---

## Recommended fix order

1. **Finding #1** — proworker C-2029 rewrite (user-flagged, biggest narrative win)
2. **Finding #2** — "team of five" pull from `state.team` (quick, prevents the most jarring ghost-team line)
3. **Finding #3** — read `proWorkerHeld` in proworker ending (small, big payoff)
4. **Findings #4 + #5** — rewrite 2029A description, soften aug 2032 framing (text-only)
5. **Finding #6** — consistent tenure language (one-line edit)
6. **Cross-cutting "jobs still tight"** — one-paragraph insertion in proworker 2034
7. Dead shrinkage scenes + floor number — janitorial
