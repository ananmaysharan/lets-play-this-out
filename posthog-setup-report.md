<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into *Let's Play This Out*. Here's a summary of everything that was set up:

**Infrastructure:**
- Created `instrumentation-client.ts` to initialize PostHog client-side using the Next.js 15.3+ recommended approach (no provider needed)
- Added reverse proxy rewrites to `next.config.ts` so all PostHog traffic routes through `/ingest/*`, improving ad-blocker resilience
- Set `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` in `.env.local`
- PostHog exception capture (`capture_exceptions: true`) is enabled for automatic error tracking

**Event tracking** was added across 8 files covering the full player journey from intro to ending.

| Event | Description | File |
|---|---|---|
| `game_started` | Player clicks START on the intro screen | `src/scenes/IntroScene.tsx` |
| `game_resumed` | Player resumes a saved game | `src/scenes/IntroScene.tsx` |
| `avatar_selected` | Player confirms avatar and name | `src/scenes/AvatarScene.tsx` |
| `decision_made` | Player makes a yearly decision (2025–2029, 2032, 2034). Properties: `year`, `decision_id`, `scene` | `src/scenes/YearScenes.tsx`, `src/scenes/endings/AugmentationEnding.tsx`, `src/scenes/endings/ErosionEnding.tsx` |
| `proworker_stance_chosen` | Player decides to stand ground or back down in 2027. Property: `choice` | `src/scenes/YearScenes.tsx` |
| `policy_voted` | Player votes on the AI Job Preservation Act (2030) or AI Dividend Act (2032). Properties: `vote`, `resulting_ending` / `policy` | `src/scenes/PolicyScene.tsx`, `src/scenes/endings/ProworkerEnding.tsx` |
| `ending_reached` | Player arrives at a final ending screen. Property: `ending_path` | `src/scenes/endings/AugmentationEnding.tsx`, `src/scenes/endings/ErosionEnding.tsx`, `src/scenes/endings/ShrinkageEnding.tsx`, `src/scenes/endings/ProworkerEnding.tsx` |
| `game_replayed` | Player clicks "Play Again" at an ending | `src/scenes/EndingActions.tsx` |
| `futures_explored` | Player clicks "Explore Other Futures" at an ending | `src/scenes/EndingActions.tsx` |
| `policies_explored` | Player clicks "Explore Policies" at an ending | `src/scenes/EndingActions.tsx` |

## Next steps

We've built a dashboard and five insights to monitor player behavior based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/408583/dashboard/1540479
- **Game Start to Policy Vote Funnel** (conversion funnel): https://us.posthog.com/project/408583/insights/7vNdcOjz
- **Ending Distribution** (which paths players reach): https://us.posthog.com/project/408583/insights/DG5CbuMd
- **Policy Vote Breakdown** (for / against / abstain): https://us.posthog.com/project/408583/insights/z1JUYanN
- **Decisions by Year** (drop-off across the 5 yearly decisions): https://us.posthog.com/project/408583/insights/zVTBFtFS
- **Replay & Exploration Rate** (what players do after an ending): https://us.posthog.com/project/408583/insights/nO1Zf9AG

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
