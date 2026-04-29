/**
 * Generic 8x8 pixel-grid logo. Used for the breaking-news takeover icons
 * (NYT 'T', WSJ 'W', MIT 'M', Atlantic 'A') and the Gillette letter.
 *
 * `pattern`: 8 rows of 8 cells (1 = filled, 0 = empty).
 * `gridClass`: parent container class for sizing/colors (e.g. 'takeover-icon', 'gil-letter').
 * In the original markup, filled cells get class `p`; empty either get nothing
 * (takeover) or class `b` (gil-letter for backdrop tinting). Set `emptyClass` to control that.
 */

interface Props {
  pattern: ReadonlyArray<ReadonlyArray<0 | 1>>;
  gridClass: string;
  emptyClass?: string;
}

export function PixelLogo({ pattern, gridClass, emptyClass = '' }: Props) {
  return (
    <div className={gridClass}>
      {pattern.flatMap((row, ri) =>
        row.map((cell, ci) => (
          <div key={`${ri}-${ci}`} className={cell ? 'p' : emptyClass} />
        ))
      )}
    </div>
  );
}

// Patterns ported from the original render functions (HTML lines 3401-3415, 3608-3617,
// 3826-3835, 4128-4137, 5200-5209, 5450-5459).
export const PATTERN_M: ReadonlyArray<ReadonlyArray<0 | 1>> = [
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 0, 1, 1],
  [1, 0, 1, 0, 0, 1, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

export const PATTERN_T_NYT: ReadonlyArray<ReadonlyArray<0 | 1>> = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

export const PATTERN_T_WIDE: ReadonlyArray<ReadonlyArray<0 | 1>> = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
];

export const PATTERN_A: ReadonlyArray<ReadonlyArray<0 | 1>> = [
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 0, 0, 1, 1, 0],
  [0, 1, 1, 0, 0, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 0, 0, 1, 1, 0],
  [0, 1, 1, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

export const PATTERN_G: ReadonlyArray<ReadonlyArray<0 | 1>> = [
  [0, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 0, 1, 0],
  [1, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

export const PATTERN_W: ReadonlyArray<ReadonlyArray<0 | 1>> = [
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 1],
  [1, 1, 0, 0, 0, 0, 1, 1],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
