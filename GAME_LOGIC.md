# Game Logic — Let's Play This Out

Walkthrough of how the game decides what happens to you. The whole system is small: **four hidden counters, five decisions, one ballot, one coin flip with a fixed outcome.**

---

## 1. The four hidden counters

Every choice you make adds points to one (occasionally two) of four invisible "path" counters. They start at 0.

| Path | What it represents |
|---|---|
| `augmentation` | Humans + AI working together. Editors-in-the-loop. |
| `shrinkage` | Lean into AI. Cut headcount. Hit the dashboard. |
| `erosion` | Aggressive AI everywhere. Brand voice, judgment, and craft quietly disappear. |
| `proworker` | Push back. Protect the team. Refuse the metric. |

Two visible meters also track your career:

- **Standing** (0–100, starts at 50) — Alex's view of you.
- **AI sentiment** (0–100, starts at 50) — the team / public's read on the AI agenda.

Both are clamped to 0–100. They do **not** decide your ending — only the four path counters do. Standing/sentiment are mostly atmosphere and team consequences.

---

## 2. The five decisions (2025–2029)

Each year you pick one option. Below is what each option does to the counters. The biggest number is the path it pushes you toward.

### 2025 — Team Direction
| Choice | Path effect | Standing | Sentiment |
|---|---|---|---|
| A · Business as Usual | augmentation **+1** | −3 | 0 |
| B · Take Advantage | shrinkage **+2** | +10 | +8 |
| C · Pump the Brakes | proworker **+2** | −10 | −5 |

### 2026 — FlowMetrics Response
| Choice | Path effect | Standing | Sentiment |
|---|---|---|---|
| A · Add Context | proworker **+1**, augmentation **+1** | −2 | −2 |
| B · Lean Into Dashboard | shrinkage **+2**, erosion **+1** | +8 | +5 |
| B2 · Tie Bonuses to Velocity | erosion **+3** | +10 | +8 |
| C · Push Back on Metric | proworker **+3** | −8 | −6 |

### 2027 — Headcount Review
| Choice | Path effect | Other |
|---|---|---|
| A · Augment (humans in loop) | augmentation **+3** | standing +2 |
| B · Make the Tough Call | shrinkage **+3** | standing +8, sentiment +5, **lose Samarth** |
| C · Send Them Into the Field | proworker **+4** | standing −12, sentiment −4 |

Choice C triggers a **conditional sub-scene** — Alex challenges you:
- **Hold position** → proworker **+2**, standing −8, sentiment −3
- **Back down** → proworker **−1**, standing +4, sentiment +3

### 2028 — The Gillette Rescue
| Choice | Path effect | Other |
|---|---|---|
| A · Automate Smarter | augmentation **+4** | standing +3 |
| B · Get More Personal | erosion **+3** **and** shrinkage **+2** | standing +8, sentiment +8 |
| C · Lean Into Human Voice | proworker **+4** | standing −3, sentiment −3 |

### 2029 — The Margin Conversation
| Choice | Path effect | Other |
|---|---|---|
| A · Director of Synergy | augmentation **+3** | standing −2, sentiment −2 |
| B · Take a Manager Raise | shrinkage **+4** | standing +8, sentiment +5, **lose Jade**, headcount −1 |
| C · Pay for Retraining | proworker **+3** | standing −6, sentiment −3, **lose Marcus + Priya**, headcount −2 |

### Maximum possible score per path
If a player picked the max-pushing option every year:
- **augmentation**: 1 + 1 + 3 + 4 + 3 = **12**
- **shrinkage**: 2 + 2 + 3 + 2 + 4 = **13** (the +2 from 2028 B is a bonus alongside erosion)
- **erosion**: 0 + 3 + 0 + 3 + 0 = **6** (or 0 + 1 + 0 + 3 + 0 = 4 via the 2026 B path)
- **proworker**: 2 + 3 + (4 + 2) + 4 + 3 = **18** (with the conditional sub-scene)

So **proworker** is the easiest path to "win" by points, and **erosion** is the hardest — you can only push it through two specific choices (2026 B2 and 2028 B).

---

## 3. The 2030 ballot — where the ending is decided

After 2029, you vote on the **AI Job Preservation & Work Sharing Act**. Your vote, combined with your hidden path totals, picks one of four endings.

### Step 1 — Did the policy pass?
```
passed = (vote == FOR)
       OR (vote == ABSTAIN AND proworker + augmentation > shrinkage + erosion)
```
- **FOR** → always passes.
- **AGAINST** → always fails.
- **ABSTAIN** → passes only if your "human-friendly" totals beat your "AI-aggressive" totals.

### Step 2 — Which side wins
| Outcome | Ending = whichever counter is higher |
|---|---|
| Passed | `proworker` vs `augmentation` |
| Failed | `erosion` vs `shrinkage` |

### Step 3 — The 15% wobble
After step 2, the game does a single "coin flip." If it comes up under 0.15, the ending is **swapped to its sibling on the same side** (proworker ↔ augmentation, or erosion ↔ shrinkage).

**Important:** this is *not* random. It's a **seeded hash** of:
```
augmentation | shrinkage | erosion | proworker | policyVote | proWorkerHeld
```
Same playthrough → same flip every time. Replaying the exact same choices always gives the same ending. About 15% of *possible playthroughs* end up flipped, not 15% of attempts.

### The four endings
- **Augmentation** ("Holding On") — you kept humans in the loop.
- **Shrinkage** ("Promoted") — you played the dashboard. The corner office is yours.
- **Erosion** ("Limbo") — you're fast, measurable, and unsure what you are anymore.
- **Pro-worker** ("Under Review") — principled, but the business doesn't reward principles.

---

## 4. The "recap" page is just a leaderboard

Before the ballot you see a recap card. The text shown is whichever **single** counter is currently highest (`getLeadingPath`). Ties go to the first one declared (`augmentation`).

This is *flavor only*. The actual ending is decided by the ballot logic above, not by the recap.

---

## 5. Quick strategy probabilities

Roughly speaking:

| You want… | Reliable recipe |
|---|---|
| Shrinkage ending (PROMOTED) | Pick B / B / B / B / B and vote AGAINST. Easy to hit. |
| Augmentation ending | Pick A every year and vote FOR. Counter caps near 12. |
| Pro-worker ending | Pick C every year, hold position in 2027, and vote FOR. This is the highest-scoring path; very stable. |
| Erosion ending | The hardest. Needs the 2026 B2 + 2028 B picks (both rare options) **and** a failed ballot (vote AGAINST, or abstain after pushing AI counters high). |

The 15% wobble means a small fraction of would-be Augmentation runs land on Pro-worker (and vice versa), and the same for Shrinkage ↔ Erosion. It's there to keep the ending from feeling 100% pre-determined while staying reproducible per playthrough.

---

## 6. What's *not* random

- No `Math.random()` anywhere in the game logic.
- The "coin flip" is a deterministic hash (`mulberry32` seeded by `xmur3`).
- Re-running the same choices and the same ballot vote always produces the same ending.
- This means hot-reloads, page refreshes, and the Resume feature can't change your ending mid-playthrough.

---

## 7. Edge mechanics worth knowing

- **Team losses** (`teamLoss`) just flip a team member off and decrement headcount; they don't directly affect endings.
- **Headcount floor** in 2029: choices B and C clamp headcount at 3 minimum.
- **Pro-worker bonus** (`APPLY_PROWORKER_BONUS`): triggers once in pro-worker endings — standing +8, sentiment −12. The `proworkerBonusApplied` flag prevents it from re-applying after a Resume.
- **Counters can go negative** (e.g. proworker can lose 1 from "Back down" in 2027). Standing/sentiment can't — they clamp at 0.
