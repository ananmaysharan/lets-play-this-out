# Let's Play This Out: AI and Work

Next.js port of the single-file HTML game `Combo_lets play this out.html`.

A branching narrative game where you play a Marketing Manager at 2760 Inc.
across 2025–2035 as AI transforms the workplace. Five choice years lead to
one of four futures: Augmentation, Job Erosion, Selective Shrinkage, or
Pro-Worker Redesign.

## Stack

- **Next.js 16** (App Router, Turbopack) deployed on Vercel.
- **React 19** with `useReducer` state machine + `useContext` provider.
- Plain CSS in `src/app/globals.css` (ported verbatim from the original
  `<style>` block — class names preserved, font references swapped to
  `next/font` CSS variables).
- TypeScript strict.
- No external state library; no Tailwind.

## Layout

```
src/
├── app/
│   ├── layout.tsx     loads Archivo Black, JetBrains Mono, VT323, Archivo
│   ├── globals.css    ~1200-line CSS port (tokens, keyframes, components, media queries)
│   └── page.tsx       mounts <GameProvider><Game/></GameProvider>
├── game/
│   ├── types.ts          SceneId union + GameState shape
│   ├── state.ts          pure reducer + applyEffects + getLeadingPath
│   ├── persistence.ts    localStorage save/load (versioned)
│   ├── GameProvider.tsx  context, dispatch, notification queue
│   ├── useTypewriter.ts  Promise-based typewriter w/ prefers-reduced-motion
│   └── Game.tsx          SceneId → component map; fade-in via key={state.scene}
├── components/      shared UI atoms
│   ├── SpriteSheet.tsx   ~860-line SVG defs, mounted once
│   ├── Memo.tsx          5-color "paper memo" card
│   ├── Btn.tsx + ChoiceBtn   6-color buttons w/ offset-shadow press effect
│   ├── Dialogue.tsx      AlexDialogue speech bubble + LockedContinueBtn
│   ├── Hud.tsx           timeline marker + standing/AI climate bars
│   ├── NewsTakeover.tsx  full-bleed news interstitial
│   ├── PixelLogo.tsx     M, T, A, G, W pixel patterns
│   ├── Ballot.tsx        voting UI w/ keyboard nav + animated X mark
│   ├── PaperChart.tsx    2025 Labor $ vs AI $ chart
│   ├── FmCard.tsx        2026 FlowMetrics dashboard
│   ├── GilCard.tsx       2028 Gillette ad card
│   ├── Calendar.tsx      2031 Pro-Worker week
│   ├── Polaroid.tsx      2034 Brooklyn pop-up scene
│   ├── TeamDisplay.tsx   Priya/Samarth/Marcus/Jade/Willow grid
│   ├── ProgressBar.tsx   top-of-page progress fill
│   ├── Notifications.tsx queue rendering
│   ├── Followup.tsx      between-year follow-up card
│   └── Stamp.tsx         rotated PROMOTED / TERMINATED stamp
└── scenes/          one component per scene id
    ├── IntroScene.tsx
    ├── AvatarScene.tsx
    ├── PromotionScene.tsx
    ├── TeamIntroScene.tsx
    ├── YearScenes.tsx          all year news/ctx/q + black-scene + followup
    ├── RecapScene.tsx
    ├── PolicyScene.tsx
    ├── AppendixScenes.tsx      futures + policies
    ├── EndingActions.tsx       shared "play again / explore" buttons
    └── endings/
        ├── AugmentationEnding.tsx
        ├── ErosionEnding.tsx
        ├── ShrinkageEnding.tsx
        └── ProworkerEnding.tsx
```

## Running

```
npm install
npm run dev      # http://localhost:3000
npm run build && npm start  # production
```

## Design notes

- **Visual fidelity first.** Class names are preserved 1:1 with the original
  HTML, so the brutalist zine aesthetic (hard 6 px shadows, paper rotation,
  Archivo Black + JetBrains Mono + VT323 contrast) carries over exactly.
- **State machine, single client route.** All scenes live at `/`; the active
  scene id is React state, not a URL. Mirrors the original `innerHTML` swap
  but with React diffing.
- **localStorage save/resume.** Saves on every state change after intro.
  An "↻ Resume saved game" button appears on the intro page when a save
  exists. `Reset` clears the save and starts fresh.
- **Accessibility.** Real `<button>` elements with focus rings; `aria-live`
  on dialogue bubbles; `role="radiogroup"` on choices and ballot rows;
  arrow-key navigation on the ballot; `prefers-reduced-motion` shrinks all
  animations to ~0 ms and reveals typewriter text instantly.
- **Mobile.** Original media queries preserved + a `≤480 px` layer that
  removes paper rotations and stretches buttons full-width.

## What's not here yet

- Wiring the team's `tools/editor/` outline.md to the runtime game (the
  story content is currently embedded in scene components).
- Backend save sync, accounts, leaderboards.
- Localization.
