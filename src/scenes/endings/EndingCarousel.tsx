"use client";

import posthog from "posthog-js";
import { useCallback, useEffect, useState } from "react";
import { useGame } from "@/game/GameProvider";
import type { PathKey } from "@/game/types";

export type EndingPathId = PathKey;

interface SourceLink {
  title: string;
  url: string;
}

interface BodyParagraph {
  /** First paragraph gets accent-colored styling. */
  intro?: boolean;
  /** Inline-html allowed (strong, em). */
  html: string;
}

interface PathContent {
  key: EndingPathId;
  shortName: string;
  /** Subtitle inside the colored tile on the left of the card. */
  tileSub: string;
  /** Small label above the title. */
  eyebrow: string;
  /** CSS color string for accent. */
  color: string;
  /** Whether the active pill should use ink (dark) text on the accent fill. */
  textOnActive: "paper" | "ink";
  /** Big card title. May contain <br />. */
  title: string;
  body: BodyParagraph[];
  sources: SourceLink[];
}

const PATHS: PathContent[] = [
  {
    key: "augmentation",
    shortName: "AUGMENTATION",
    tileSub: "Holding on",
    eyebrow: "AUGMENTATION · 2035",
    color: "var(--teal-dark)",
    textOnActive: "paper",
    title: "YOU KEPT THE HUMANS<br />IN THE LOOP.",
    body: [
      {
        intro: true,
        html: "You&rsquo;ve reached a future that experts call <strong>Augmentation</strong>!",
      },
      {
        html: "In an Augmentation future, AI becomes a tool across the process, while humans move into roles focused on review and coordination. AI productivity gains go back into role redesign instead of flowing only to executives. This future avoided large-scale job losses and a loss of autonomy &mdash; but there&rsquo;s still more system oversight than there used to be.",
      },
      {
        html: "You arrived here through a mix of structural pressures and your choices. Explore the 3 other futures experts say are possible. But remember: <strong>the future of work with AI is not fixed.</strong>",
      },
      {
        html: "Any future we end up in will be shaped by managers, workers, and policymakers &mdash; aka people like you. The possibilities are endless, and we still have agency over how AI becomes part of our daily work.",
      },
      {
        html: "Explore current ideas around shaping the future in the policy efforts in the tab below.",
      },
    ],
    sources: [
      {
        title: "Erik Brynjolfsson — The Turing Trap",
        url: "https://digitaleconomy.stanford.edu/news/the-turing-trap-the-promise-peril-of-human-like-artificial-intelligence/",
      },
      {
        title: "David Autor — Applying AI to Rebuild Middle Class Jobs",
        url: "https://www.nber.org/papers/w32140",
      },
      {
        title: "Thomas Malone — Superminds",
        url: "https://cci.mit.edu/superminds-by-thomas-w-malone/",
      },
    ],
  },
  {
    key: "erosion",
    shortName: "JOB EROSION",
    tileSub: "Limbo",
    eyebrow: "JOB EROSION · 2035",
    color: "var(--terracotta)",
    textOnActive: "paper",
    title: "THE JOB STAYED.<br />THE CRAFT DIDN'T.",
    body: [
      {
        intro: true,
        html: "You&rsquo;ve reached a future that experts call <strong>Job Erosion</strong>.",
      },
      {
        html: "Jobs don&rsquo;t disappear, but the quality and pay degrade. The work becomes faster and more measurable, but less creative and less autonomous.",
      },
      {
        html: "You arrived here through a mix of structural pressures and your choices. Explore the 3 other futures experts say are possible. But remember: <strong>the future of work with AI is not fixed.</strong>",
      },
      {
        html: "Any future we end up in will be shaped by managers, workers, and policymakers &mdash; aka people like you. The possibilities are endless, and we still have agency over how AI becomes part of our daily work.",
      },
      {
        html: "Explore current ideas around shaping the future in the policy efforts in the tab below.",
      },
    ],
    sources: [
      {
        title: "Acemoglu &amp; Restrepo — Automation and New Tasks",
        url: "https://www.aeaweb.org/articles?id=10.1257/jep.33.2.3",
      },
      {
        title: "Veena Dubal — On Algorithmic Wage Discrimination",
        url: "https://columbialawreview.org/content/on-algorithmic-wage-discrimination/",
      },
      {
        title: "Data &amp; Society — Algorithmic Management in the Workplace",
        url: "https://datasociety.net/library/explainer-algorithmic-management-in-the-workplace/",
      },
    ],
  },
  {
    key: "shrinkage",
    shortName: "SELECTIVE SHRINKAGE",
    tileSub: "Cut loose",
    eyebrow: "SELECTIVE SHRINKAGE · 2035",
    color: "var(--mustard)",
    textOnActive: "ink",
    title: "THE MARGINS WENT UP.<br />THE JOBS WENT DOWN.",
    body: [
      {
        intro: true,
        html: "You&rsquo;ve reached a future that experts call <strong>Selective Shrinkage</strong>.",
      },
      {
        html: "Companies don&rsquo;t fire everyone, but they stop needing as many people. AI absorbs the junior, freelance, and first-draft tasks that used to train people into senior roles. Marketing teams get smaller and more senior, with fewer entry points for new workers and less room for slow learning.",
      },
      {
        html: "Your decisions in the game helped lead to this future. Explore the 3 other futures experts say are possible. But remember: <strong>the future of work with AI is not fixed.</strong>",
      },
      {
        html: "Any future we end up in will be shaped by managers, workers, and policymakers &mdash; aka people like you. The possibilities are endless, and we still have agency over how AI becomes part of our daily work.",
      },
      {
        html: "Explore current ideas around shaping the future in the policy efforts in the tab below.",
      },
    ],
    sources: [
      {
        title: "Stanford Digital Economy Lab — Canaries in the Coal Mine?",
        url: "https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/",
      },
      {
        title: "Generative AI as Seniority-Biased Technological Change",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5425555",
      },
      {
        title: "Washington University — AI Tools and Freelance Work",
        url: "https://olin.washu.edu/about/news-and-media/news/2023/08/study-ai-tools-cause-a-decline-in-freelance-work-and-incomeat-least-in-the-short-run.php",
      },
    ],
  },
  {
    key: "proworker",
    shortName: "PRO-WORKER REDESIGN",
    tileSub: "Redesign",
    eyebrow: "PRO-WORKER REDESIGN · 2035",
    color: "var(--forest)",
    textOnActive: "paper",
    title: "A FUTURE STEERED<br />BY WORKERS.",
    body: [
      {
        intro: true,
        html: "You&rsquo;ve reached a future that experts call <strong>Pro-Worker Redesign</strong>.",
      },
      {
        html: "This future did not happen automatically. It is one categorized by AI being steered by workers and policy toward complementing workers, creating new tasks, and raising the value of human expertise &mdash; rather than using AI to just replace human labor.",
      },
      {
        html: "Your decisions in the game helped lead to this future. Explore the 3 other futures experts say are possible. But remember: <strong>the future of work with AI is not fixed.</strong>",
      },
      {
        html: "Any future we end up in will be shaped by managers, workers, and policymakers &mdash; aka people like you. The possibilities are endless, and we still have agency over how AI becomes part of our daily work.",
      },
      {
        html: "Explore current ideas around shaping the future in the policy efforts in the tab below.",
      },
    ],
    sources: [
      {
        title: "Building Pro-Worker Artificial Intelligence",
        url: "https://www.nber.org/papers/w34854",
      },
      {
        title:
          "OECD — Social Dialogue and Collective Bargaining in the Age of AI",
        url: "https://www.oecd.org/en/publications/oecd-employment-outlook-2023_08785bba-en.html",
      },
      {
        title: "David Autor — Applying AI to Rebuild Middle Class Jobs",
        url: "https://www.nber.org/papers/w32140",
      },
    ],
  },
];

interface Props {
  current: EndingPathId;
}

export function EndingCarousel({ current }: Props) {
  const { state, dispatch, go, reset } = useGame();
  const yourIdx = PATHS.findIndex((p) => p.key === current);
  const [activeIdx, setActiveIdx] = useState(yourIdx >= 0 ? yourIdx : 0);
  const [swapping, setSwapping] = useState(false);

  const goTo = useCallback((idx: number) => {
    setSwapping(true);
    window.setTimeout(() => {
      setActiveIdx(((idx % PATHS.length) + PATHS.length) % PATHS.length);
      setSwapping(false);
    }, 180);
  }, []);

  // ← / → keyboard nav
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goTo(activeIdx - 1);
      if (e.key === "ArrowRight") goTo(activeIdx + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx, goTo]);

  const path = PATHS[activeIdx];
  const isYours = activeIdx === yourIdx;

  function handleSeeHow() {
    posthog.capture("ending_see_how_clicked", { future: path.key, is_player_path: isYours });
    dispatch({ type: "SET_VIEWING_FUTURE", future: path.key });
    dispatch({ type: "SET_PREVIOUS_SCENE", scene: state.scene });
    go("futures");
  }

  function handlePolicies() {
    posthog.capture("policies_explored");
    dispatch({ type: "SET_PREVIOUS_SCENE", scene: state.scene });
    go("policies");
  }

  function handleReplay() {
    posthog.capture("game_replayed");
    reset();
  }

  return (
    <div className="ending-carousel">
      <nav className="path-pill-row" aria-label="Choose a future to view">
        {PATHS.map((p, i) => (
          <button
            key={p.key}
            type="button"
            className={`path-pill${i === activeIdx ? " active" : ""}`}
            data-text-on-active={p.textOnActive}
            style={{ ["--accent" as string]: p.color }}
            onClick={() => goTo(i)}
          >
            {p.shortName}
          </button>
        ))}
      </nav>

      <div className="carousel">
        <button
          type="button"
          className="carousel-arrow"
          aria-label="Previous future"
          onClick={() => goTo(activeIdx - 1)}
        >
          ←
        </button>

        <article
          className={`carousel-card${swapping ? " swapping" : ""}`}
          style={{ ["--accent" as string]: path.color }}
        >
          <div className={`sticker${isYours ? " you-are-here" : ""}`}>
            {isYours ? "YOU ENDED UP IN THIS FUTURE" : "A FUTURE YOU DIDN'T REACH"}
          </div>

          <div className="card-left">
            <div className="path-tile">
              <div className="path-name">{path.shortName}</div>
            </div>
            <button
              type="button"
              className="see-how-btn"
              onClick={handleSeeHow}
            >
              {isYours ? "SEE HOW YOU GOT HERE" : "SEE HOW TO GET HERE"}
            </button>
          </div>

          <div className="card-right">
            <div className="card-eyebrow">{path.eyebrow}</div>
            <h1
              className="card-title"
              dangerouslySetInnerHTML={{ __html: path.title }}
            />
            <div className="card-body">
              {path.body
                .filter((b) => isYours || !b.intro)
                .map((b, i) => (
                  <p
                    key={i}
                    className={b.intro ? "intro" : undefined}
                    dangerouslySetInnerHTML={{ __html: b.html }}
                  />
                ))}
              <div className="sources">
                <div className="sources-label">References</div>
                <ol>
                  {path.sources.map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        dangerouslySetInnerHTML={{ __html: s.title }}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </article>

        <button
          type="button"
          className="carousel-arrow"
          aria-label="Next future"
          onClick={() => goTo(activeIdx + 1)}
        >
          →
        </button>
      </div>

      <div className="carousel-dots" role="tablist" aria-label="Future selector">
        {PATHS.map((p, i) => (
          <span key={p.key} className="dot-wrap">
            <button
              type="button"
              className={`dot${i === activeIdx ? " active" : ""}`}
              aria-label={`Go to ${p.shortName}`}
              onClick={() => goTo(i)}
            />
          </span>
        ))}
      </div>

      <div className="ending-actions">
        <button type="button" className="ec-btn ec-btn-terra" onClick={handleReplay}>
          ↻ PLAY AGAIN
        </button>
        <button type="button" className="ec-btn ec-btn-forest" onClick={handlePolicies}>
          ◆ EXPLORE POLICIES
        </button>
      </div>
    </div>
  );
}
