"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useIsThumbnail } from "@/debug/ThumbnailContext";

const CELL = 32;
const ANIM_MS = 2800;
const SPAWN_MIN_MS = 110;
const SPAWN_MAX_MS = 280;
const COLORS = [
  "var(--terracotta)",
  "var(--forest)",
  "var(--teal)",
  "var(--mustard)",
];

type Square = {
  id: number;
  col: number;
  row: number;
  color: string;
};

export function BlinkingSquares() {
  const isThumbnail = useIsThumbnail();
  const [mounted, setMounted] = useState(false);
  const [squares, setSquares] = useState<Square[]>([]);
  const [grid, setGrid] = useState({ cols: 0, rows: 0 });
  const idRef = useRef(0);
  const squaresRef = useRef<Square[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    squaresRef.current = squares;
  }, [squares]);

  useEffect(() => {
    const update = () => {
      setGrid({
        cols: Math.max(1, Math.floor(window.innerWidth / CELL)),
        rows: Math.max(1, Math.floor(window.innerHeight / CELL)),
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (grid.cols === 0 || grid.rows === 0) return;
    let spawnTimeout: ReturnType<typeof setTimeout> | undefined;
    const removeTimeouts = new Set<ReturnType<typeof setTimeout>>();

    const spawn = () => {
      const taken = new Set(squaresRef.current.map((s) => `${s.col},${s.row}`));
      let col = -1;
      let row = -1;
      for (let i = 0; i < 40; i++) {
        const c = Math.floor(Math.random() * grid.cols);
        const r = Math.floor(Math.random() * grid.rows);
        if (!taken.has(`${c},${r}`)) {
          col = c;
          row = r;
          break;
        }
      }
      if (col >= 0) {
        const id = idRef.current++;
        const sq: Square = {
          id,
          col,
          row,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
        setSquares((prev) => [...prev, sq]);
        const t = setTimeout(() => {
          setSquares((cur) => cur.filter((s) => s.id !== id));
          removeTimeouts.delete(t);
        }, ANIM_MS);
        removeTimeouts.add(t);
      }
      const next = SPAWN_MIN_MS + Math.random() * (SPAWN_MAX_MS - SPAWN_MIN_MS);
      spawnTimeout = setTimeout(spawn, next);
    };
    spawn();

    return () => {
      if (spawnTimeout) clearTimeout(spawnTimeout);
      removeTimeouts.forEach((t) => clearTimeout(t));
    };
  }, [grid.cols, grid.rows]);

  // Inside the /debug scene map, skip the full-viewport portal entirely —
  // the cream-colored .blink-bg is position: fixed and would cover the
  // whole map.
  if (isThumbnail) return null;
  if (!mounted) return null;

  return createPortal(
    <div className="blink-bg" aria-hidden="true">
      {squares.map((s) => (
        <span
          key={s.id}
          className="blink-square"
          style={{
            top: `${s.row * CELL}px`,
            left: `${s.col * CELL}px`,
            width: `${CELL}px`,
            height: `${CELL}px`,
            background: s.color,
          }}
        />
      ))}
    </div>,
    document.body,
  );
}
