/* Pixel-art avatar renderer — ported from the avatar_customizer reference.
   96x96 grid; rendered at SCALE px-per-cell to a canvas. */

export const SIZE = 96;

export type Grid = (string | null)[][];

export function makeGrid(): Grid {
  const g: Grid = [];
  for (let i = 0; i < SIZE; i++) g.push(new Array<string | null>(SIZE).fill(null));
  return g;
}

function fillRect(g: Grid, x0: number, x1: number, y0: number, y1: number, c: string | null) {
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      if (y >= 0 && y < SIZE && x >= 0 && x < SIZE) g[y][x] = c;
    }
  }
}

function setPixels(g: Grid, pixels: [number, number][], c: string) {
  for (const [y, x] of pixels) {
    if (y >= 0 && y < SIZE && x >= 0 && x < SIZE) g[y][x] = c;
  }
}

function blendColor(a: string, b: string, r: number) {
  const A = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  const B = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  const M = A.map((v, i) => Math.round(v + (B[i] - v) * r));
  return '#' + M.map((v) => v.toString(16).padStart(2, '0')).join('');
}

/* ---------- HEAD ---------- */
function drawHead(g: Grid, skin: string, shadow: string, age: number) {
  fillRect(g, 32, 63, 21, 21, skin);
  fillRect(g, 31, 64, 22, 22, skin);
  fillRect(g, 30, 65, 23, 51, skin);
  fillRect(g, 31, 64, 52, 53, skin);
  fillRect(g, 33, 62, 54, 54, skin);
  fillRect(g, 35, 60, 55, 55, skin);
  fillRect(g, 38, 57, 56, 57, skin);

  fillRect(g, 30, 30, 26, 49, shadow);
  fillRect(g, 65, 65, 26, 49, shadow);
  setPixels(g, [[22, 32], [22, 63], [21, 33], [21, 62]], shadow);
  setPixels(g, [[52, 32], [52, 63], [53, 33], [53, 62], [54, 34], [54, 61]], shadow);

  // ears
  fillRect(g, 27, 29, 35, 44, skin);
  fillRect(g, 66, 68, 35, 44, skin);
  fillRect(g, 28, 29, 39, 42, shadow);
  fillRect(g, 66, 67, 39, 42, shadow);

  const skinLight = blendColor(skin, '#FFFFFF', 0.18);
  const browColor = '#2A170F';
  const eyeOutline = '#111111';
  const mouthColor = '#9E4B43';

  // brows
  fillRect(g, 33, 41, 28, 30, browColor);
  fillRect(g, 54, 62, 28, 30, browColor);

  // eyes
  fillRect(g, 33, 41, 32, 39, eyeOutline);
  fillRect(g, 35, 38, 33, 38, '#FFFFFF');
  fillRect(g, 54, 62, 32, 39, eyeOutline);
  fillRect(g, 56, 59, 33, 38, '#FFFFFF');

  // nose
  fillRect(g, 47, 48, 41, 45, skinLight);
  fillRect(g, 45, 50, 46, 46, shadow);
  g[47][45] = shadow;
  g[47][50] = shadow;

  // mouth
  fillRect(g, 41, 54, 49, 49, mouthColor);
  fillRect(g, 43, 52, 50, 50, mouthColor);

  // neck
  fillRect(g, 40, 55, 58, 67, skin);
  fillRect(g, 40, 41, 60, 67, shadow);
  fillRect(g, 54, 55, 60, 67, shadow);
  fillRect(g, 42, 53, 65, 67, shadow);

  if (age >= 35) {
    g[47][41] = shadow;
    g[47][54] = shadow;
    g[48][40] = shadow;
    g[48][55] = shadow;
  }
  if (age >= 45) {
    fillRect(g, 42, 53, 25, 25, shadow);
    setPixels(g, [[35, 31], [36, 31], [35, 64], [36, 64]], shadow);
  }
  if (age >= 55) {
    fillRect(g, 35, 38, 40, 40, shadow);
    fillRect(g, 56, 59, 40, 40, shadow);
    setPixels(g, [[47, 40], [48, 38], [49, 38], [47, 55], [48, 57], [49, 57]], shadow);
  }
  if (age >= 65) {
    setPixels(g, [[52, 42], [53, 42], [52, 53], [53, 53]], shadow);
    g[51][45] = shadow;
    g[51][50] = shadow;
  }
}

/* ---------- HAIR STYLES ---------- */
export interface HairStyle {
  name: string;
  draw(g: Grid, c: string, s: string): void;
}

export const HAIR_STYLES: HairStyle[] = [
  {
    name: 'Space Buns',
    draw(g, c, s) {
      const hl = blendColor(c, '#FFFFFF', 0.25);
      fillRect(g, 30, 65, 21, 27, c);
      fillRect(g, 30, 65, 27, 27, s);
      setPixels(g, [[24, 40], [24, 46], [24, 52], [24, 58]], hl);
      fillRect(g, 28, 30, 26, 44, c);
      fillRect(g, 65, 67, 26, 44, c);
      fillRect(g, 28, 28, 28, 42, s);
      fillRect(g, 67, 67, 28, 42, s);

      fillRect(g, 33, 38, 6, 6, c);
      fillRect(g, 32, 39, 7, 7, c);
      fillRect(g, 31, 40, 8, 12, c);
      fillRect(g, 32, 39, 13, 13, c);
      fillRect(g, 33, 38, 14, 14, c);
      fillRect(g, 33, 38, 15, 19, c);
      fillRect(g, 31, 32, 9, 12, s);
      fillRect(g, 32, 38, 13, 13, s);
      fillRect(g, 36, 38, 8, 9, hl);

      fillRect(g, 57, 62, 6, 6, c);
      fillRect(g, 56, 63, 7, 7, c);
      fillRect(g, 55, 64, 8, 12, c);
      fillRect(g, 56, 63, 13, 13, c);
      fillRect(g, 57, 62, 14, 14, c);
      fillRect(g, 57, 62, 15, 19, c);
      fillRect(g, 63, 64, 9, 12, s);
      fillRect(g, 57, 63, 13, 13, s);
      fillRect(g, 57, 59, 8, 9, hl);

      fillRect(g, 27, 27, 46, 47, '#C9A93A');
      fillRect(g, 26, 28, 48, 50, '#9C6FB8');
      g[51][27] = '#9C6FB8';
      fillRect(g, 68, 68, 46, 47, '#C9A93A');
      fillRect(g, 67, 69, 48, 50, '#9C6FB8');
      g[51][68] = '#9C6FB8';
    },
  },
  {
    name: 'Beanie',
    draw(g, c, s) {
      const hl = blendColor(c, '#FFFFFF', 0.2);
      fillRect(g, 30, 65, 25, 28, c);
      fillRect(g, 30, 65, 28, 28, s);
      fillRect(g, 28, 31, 27, 44, c);
      fillRect(g, 64, 67, 27, 44, c);
      fillRect(g, 28, 28, 30, 42, s);
      fillRect(g, 67, 67, 30, 42, s);

      fillRect(g, 28, 67, 14, 23, c);
      fillRect(g, 30, 65, 11, 14, c);
      fillRect(g, 32, 63, 9, 11, c);
      for (let x = 32; x <= 64; x += 5) fillRect(g, x, x, 14, 23, s);
      fillRect(g, 28, 67, 22, 25, c);
      fillRect(g, 28, 67, 24, 24, s);
      fillRect(g, 28, 67, 25, 25, c);
      fillRect(g, 44, 51, 4, 7, c);
      fillRect(g, 42, 53, 5, 6, c);
      fillRect(g, 45, 50, 3, 4, c);
      fillRect(g, 45, 47, 4, 5, hl);
      fillRect(g, 47, 48, 7, 9, s);
    },
  },
  {
    name: 'Curly Top',
    draw(g, c, s) {
      const hl = blendColor(c, '#FFFFFF', 0.25);
      fillRect(g, 28, 67, 15, 26, c);
      fillRect(g, 30, 65, 12, 14, c);
      fillRect(g, 32, 63, 9, 11, c);
      fillRect(g, 35, 60, 7, 8, c);
      fillRect(g, 25, 28, 18, 38, c);
      fillRect(g, 67, 70, 18, 38, c);
      fillRect(g, 36, 38, 6, 7, c);
      fillRect(g, 42, 44, 6, 7, c);
      fillRect(g, 48, 50, 6, 7, c);
      fillRect(g, 54, 56, 6, 7, c);
      setPixels(g, [[12, 33], [12, 39], [12, 45], [12, 51], [12, 57], [16, 30], [16, 38], [16, 46], [16, 54], [16, 62], [20, 32], [20, 40], [20, 48], [20, 56], [20, 64]], s);
      setPixels(g, [[10, 36], [10, 44], [10, 52], [10, 58], [14, 32], [14, 42], [14, 52], [14, 62], [18, 34], [18, 44], [18, 54], [18, 64]], hl);
      fillRect(g, 30, 65, 26, 27, s);
      setPixels(g, [[42, 36], [42, 38], [44, 35], [44, 60], [42, 58], [42, 60], [45, 36], [45, 60]], blendColor(c, '#000000', 0.4));
    },
  },
  {
    name: 'Buzz Cut',
    draw(g, c, s) {
      fillRect(g, 30, 65, 21, 24, c);
      fillRect(g, 32, 63, 19, 20, c);
      fillRect(g, 34, 61, 17, 18, c);
      fillRect(g, 30, 65, 24, 24, s);
      fillRect(g, 30, 31, 25, 36, c);
      fillRect(g, 64, 65, 25, 36, c);
      fillRect(g, 30, 30, 26, 35, s);
      fillRect(g, 65, 65, 26, 35, s);
      const hl = blendColor(c, '#FFFFFF', 0.15);
      for (let y = 19; y <= 23; y += 2) {
        for (let x = 34; x <= 61; x += 4) {
          g[y][x] = hl;
        }
      }
    },
  },
  {
    name: 'Long Straight',
    draw(g, c, s) {
      const hl = blendColor(c, '#FFFFFF', 0.18);
      fillRect(g, 30, 65, 18, 26, c);
      fillRect(g, 32, 63, 15, 17, c);
      fillRect(g, 34, 61, 13, 14, c);
      fillRect(g, 26, 31, 24, 80, c);
      fillRect(g, 64, 69, 24, 80, c);
      fillRect(g, 32, 63, 26, 28, c);
      fillRect(g, 32, 63, 28, 28, s);
      fillRect(g, 26, 26, 30, 78, s);
      fillRect(g, 69, 69, 30, 78, s);
      fillRect(g, 28, 28, 30, 70, hl);
      fillRect(g, 67, 67, 30, 70, hl);
      setPixels(g, [[16, 38], [16, 46], [16, 54], [16, 60], [19, 40], [19, 52], [19, 58]], hl);
    },
  },
  {
    name: 'Pixie',
    draw(g, c, s) {
      const hl = blendColor(c, '#FFFFFF', 0.22);
      fillRect(g, 30, 65, 17, 27, c);
      fillRect(g, 32, 63, 14, 16, c);
      fillRect(g, 35, 60, 12, 13, c);
      fillRect(g, 28, 30, 26, 38, c);
      fillRect(g, 65, 67, 26, 38, c);
      fillRect(g, 28, 28, 28, 36, s);
      fillRect(g, 67, 67, 28, 36, s);
      fillRect(g, 33, 56, 24, 27, c);
      fillRect(g, 36, 50, 23, 23, c);
      fillRect(g, 33, 50, 27, 27, s);
      setPixels(g, [[18, 40], [18, 46], [18, 52], [20, 36], [20, 44], [20, 54], [22, 38], [22, 48], [22, 58]], hl);
      setPixels(g, [[14, 40], [14, 50], [15, 44], [15, 56]], hl);
      fillRect(g, 27, 28, 47, 50, '#C9A93A');
      fillRect(g, 28, 28, 51, 51, '#C9A93A');
      g[52][27] = '#C9A93A';
    },
  },
  {
    name: 'Topknot',
    draw(g, c, s) {
      const hl = blendColor(c, '#FFFFFF', 0.22);
      fillRect(g, 30, 65, 17, 27, c);
      fillRect(g, 32, 63, 14, 16, c);
      fillRect(g, 35, 60, 12, 13, c);
      fillRect(g, 30, 65, 27, 27, s);
      fillRect(g, 28, 30, 26, 41, c);
      fillRect(g, 65, 67, 26, 41, c);
      fillRect(g, 28, 28, 28, 39, s);
      fillRect(g, 67, 67, 28, 39, s);
      fillRect(g, 41, 54, 6, 13, c);
      fillRect(g, 39, 56, 8, 11, c);
      fillRect(g, 42, 53, 5, 5, c);
      fillRect(g, 41, 42, 8, 11, s);
      fillRect(g, 39, 56, 13, 13, s);
      fillRect(g, 50, 53, 7, 8, hl);
      setPixels(g, [[15, 38], [15, 48], [15, 58], [18, 36], [18, 46], [18, 56]], hl);
    },
  },
  {
    name: 'Long Wavy',
    draw(g, c, s) {
      const hl = blendColor(c, '#FFFFFF', 0.2);
      fillRect(g, 30, 65, 17, 27, c);
      fillRect(g, 32, 63, 14, 16, c);
      fillRect(g, 35, 60, 11, 13, c);
      fillRect(g, 24, 31, 22, 84, c);
      fillRect(g, 64, 71, 22, 84, c);
      setPixels(g, [[35, 24], [36, 24], [40, 25], [41, 25], [45, 24], [46, 24], [50, 25], [51, 25], [55, 24], [56, 24], [60, 25], [65, 24], [70, 25], [75, 24]], s);
      setPixels(g, [[35, 71], [36, 71], [40, 70], [41, 70], [45, 71], [46, 71], [50, 70], [51, 70], [55, 71], [56, 71], [60, 70], [65, 71], [70, 70], [75, 71]], s);
      setPixels(g, [[37, 23], [38, 23], [47, 23], [48, 23], [57, 23], [58, 23], [67, 23]], c);
      setPixels(g, [[37, 72], [38, 72], [47, 72], [48, 72], [57, 72], [58, 72], [67, 72]], c);
      fillRect(g, 32, 63, 26, 28, c);
      fillRect(g, 32, 63, 28, 28, s);
      setPixels(g, [[28, 28], [35, 27], [42, 28], [49, 27], [56, 28], [63, 27], [70, 28], [28, 67], [35, 68], [42, 67], [49, 68], [56, 67], [63, 68], [70, 67]], hl);
      setPixels(g, [[16, 40], [16, 50], [16, 58], [19, 38], [19, 48], [19, 56]], hl);
    },
  },
];

/* ---------- HAIR COLORS ---------- */
export interface HairColor {
  name: string;
  main: string;
  shadow: string;
}

export const HAIR_COLORS: HairColor[] = [
  { name: 'Black', main: '#1A1A1A', shadow: '#000000' },
  { name: 'Brown', main: '#5A3A1F', shadow: '#3A2412' },
  { name: 'Auburn', main: '#A04822', shadow: '#6E2F14' },
  { name: 'Ginger', main: '#D86A2C', shadow: '#A14817' },
  { name: 'Blonde', main: '#E8C76C', shadow: '#B89A45' },
  { name: 'Platinum', main: '#F0E6C9', shadow: '#C9BC95' },
  { name: 'Silver', main: '#9C9C9C', shadow: '#6E6E6E' },
  { name: 'Pink', main: '#D87AA8', shadow: '#A04E78' },
];

function tintHairForAge(main: string, shadow: string, age: number): [string, string] {
  if (age < 45) return [main, shadow];
  const grayAmount = Math.min(0.7, ((age - 45) / 30) * 0.7);
  return [blendColor(main, '#AFAFAF', grayAmount), blendColor(shadow, '#7A7A7A', grayAmount)];
}

/* ---------- SKIN TONES ---------- */
export interface SkinTone {
  name: string;
  main: string;
  shadow: string;
}

export const SKIN_TONES: SkinTone[] = [
  { name: 'Porcelain', main: '#F4D8BC', shadow: '#D9B698' },
  { name: 'Fair', main: '#E8C19E', shadow: '#C99A78' },
  { name: 'Warm Beige', main: '#D9A87C', shadow: '#B7855A' },
  { name: 'Olive', main: '#C28A5F', shadow: '#9C6A40' },
  { name: 'Tan', main: '#A87144', shadow: '#84552B' },
  { name: 'Bronze', main: '#8C5430', shadow: '#683B1E' },
  { name: 'Deep', main: '#6E3F22', shadow: '#4D2912' },
  { name: 'Ebony', main: '#4F2C19', shadow: '#321809' },
];

/* ---------- SHIRTS ---------- */
export interface Shirt {
  name: string;
  colors: [string, string];
  draw(g: Grid, c1: string, c2: string): void;
}

export const SHIRTS: Shirt[] = [
  {
    name: 'Off-Shoulder Black',
    colors: ['#1A1A1A', '#000000'],
    draw(g, c1, c2) {
      fillRect(g, 18, 77, 67, SIZE - 1, c1);
      fillRect(g, 41, 54, 67, 73, null);
      fillRect(g, 44, 51, 73, 76, null);
      fillRect(g, 18, 24, 73, SIZE - 1, c2);
      fillRect(g, 71, 77, 73, SIZE - 1, c2);
    },
  },
  {
    name: 'Blue Hoodie',
    colors: ['#3A6FB5', '#274C7E'],
    draw(g, c1, c2) {
      fillRect(g, 18, 77, 67, SIZE - 1, c1);
      fillRect(g, 42, 53, 67, 70, null);
      fillRect(g, 44, 51, 70, 72, null);
      fillRect(g, 36, 59, 80, 90, c2);
      fillRect(g, 36, 59, 80, 81, c2);
      fillRect(g, 44, 45, 67, 78, '#F0E6C9');
      fillRect(g, 50, 51, 67, 78, '#F0E6C9');
      fillRect(g, 18, 23, 70, SIZE - 1, c2);
      fillRect(g, 72, 77, 70, SIZE - 1, c2);
    },
  },
  {
    name: 'Green Sweater',
    colors: ['#3A6E48', '#2A5236'],
    draw(g, c1, c2) {
      fillRect(g, 18, 77, 67, SIZE - 1, c1);
      fillRect(g, 43, 52, 67, 70, '#F4D8BC');
      fillRect(g, 43, 52, 70, 71, c2);
      for (let x = 22; x <= 75; x += 6) {
        fillRect(g, x, x, 71, SIZE - 1, c2);
      }
      fillRect(g, 18, 22, 73, SIZE - 1, c2);
      fillRect(g, 73, 77, 73, SIZE - 1, c2);
    },
  },
  {
    name: 'Floral Lavender',
    colors: ['#B98AC9', '#8E64A0'],
    draw(g, c1) {
      fillRect(g, 18, 77, 67, SIZE - 1, c1);
      fillRect(g, 42, 53, 67, 71, null);
      fillRect(g, 44, 51, 71, 73, null);
      const flowerPositions: [number, number][] = [[78, 28], [82, 38], [78, 50], [82, 60], [78, 70]];
      for (const [fy, fx] of flowerPositions) {
        fillRect(g, fx - 1, fx + 1, fy - 1, fy + 1, '#F4F0E0');
        g[fy][fx] = '#C9A93A';
      }
      fillRect(g, 44, 51, 67, 67, '#C9A93A');
      fillRect(g, 42, 42, 67, 70, '#C9A93A');
      fillRect(g, 53, 53, 67, 70, '#C9A93A');
      fillRect(g, 47, 48, 71, 73, '#4E6B3F');
      g[74][47] = '#4E6B3F';
      g[74][48] = '#4E6B3F';
    },
  },
  {
    name: 'Mustard Knit',
    colors: ['#C9A93A', '#9A8228'],
    draw(g, c1, c2) {
      fillRect(g, 18, 77, 67, SIZE - 1, c1);
      fillRect(g, 42, 53, 67, 70, '#F4D8BC');
      fillRect(g, 42, 53, 70, 71, c2);
      for (let y = 73; y <= SIZE - 1; y += 5) {
        for (let x = 22; x <= 73; x += 5) {
          g[y][x] = c2;
        }
      }
      fillRect(g, 44, 51, 67, 67, '#9C6FB8');
      fillRect(g, 42, 42, 67, 69, '#9C6FB8');
      fillRect(g, 53, 53, 67, 69, '#9C6FB8');
      fillRect(g, 18, 22, 73, SIZE - 1, c2);
      fillRect(g, 73, 77, 73, SIZE - 1, c2);
    },
  },
  {
    name: 'Red Plaid',
    colors: ['#A03828', '#6E2418'],
    draw(g, c1, c2) {
      fillRect(g, 18, 77, 67, SIZE - 1, c1);
      fillRect(g, 42, 53, 67, 71, null);
      fillRect(g, 42, 43, 71, 76, null);
      fillRect(g, 52, 53, 71, 76, null);
      for (let y = 74; y <= SIZE - 1; y += 6) {
        fillRect(g, 18, 77, y, y, c2);
      }
      for (let x = 22; x <= 73; x += 6) {
        fillRect(g, x, x, 71, SIZE - 1, c2);
      }
      fillRect(g, 47, 48, 78, 79, '#F0E6C9');
      fillRect(g, 47, 48, 84, 85, '#F0E6C9');
      fillRect(g, 47, 48, 90, 91, '#F0E6C9');
    },
  },
  {
    name: 'Teal Blazer',
    colors: ['#3D7A84', '#27545C'],
    draw(g, c1, c2) {
      fillRect(g, 18, 77, 67, SIZE - 1, c1);
      fillRect(g, 42, 53, 67, 75, null);
      fillRect(g, 41, 41, 70, 75, c2);
      fillRect(g, 54, 54, 70, 75, c2);
      fillRect(g, 42, 53, 75, SIZE - 1, '#F4F0E0');
      fillRect(g, 46, 49, 75, SIZE - 1, '#C44D37');
      fillRect(g, 47, 48, 75, 78, '#A03828');
      fillRect(g, 26, 32, 78, 81, '#F4F0E0');
      g[78][26] = '#C44D37';
      g[81][32] = '#C44D37';
      fillRect(g, 18, 22, 73, SIZE - 1, c2);
      fillRect(g, 73, 77, 73, SIZE - 1, c2);
    },
  },
  {
    name: 'Striped Tee',
    colors: ['#F4F0E0', '#1A1A1A'],
    draw(g, c1, c2) {
      fillRect(g, 18, 77, 67, SIZE - 1, c1);
      fillRect(g, 42, 53, 67, 70, null);
      fillRect(g, 44, 51, 70, 72, null);
      for (let y = 73; y <= SIZE - 1; y += 6) {
        fillRect(g, 18, 77, y, y + 2, c2);
      }
    },
  },
];

/* ---------- BUILDER ---------- */
export interface AvatarConfig {
  skin: number;
  hair: number;
  hairColor: number;
  shirt: number;
  age: number;
}

export const DEFAULT_AVATAR_CONFIG: AvatarConfig = {
  skin: 1,
  hair: 0,
  hairColor: 0,
  shirt: 0,
  age: 28,
};

export function buildAvatarGrid(cfg: AvatarConfig): Grid {
  const g = makeGrid();
  const skin = SKIN_TONES[clampIdx(cfg.skin, SKIN_TONES.length)];
  drawHead(g, skin.main, skin.shadow, cfg.age);
  const shirt = SHIRTS[clampIdx(cfg.shirt, SHIRTS.length)];
  shirt.draw(g, shirt.colors[0], shirt.colors[1]);
  const hairColor = HAIR_COLORS[clampIdx(cfg.hairColor, HAIR_COLORS.length)];
  const [hMain, hShadow] = tintHairForAge(hairColor.main, hairColor.shadow, cfg.age);
  HAIR_STYLES[clampIdx(cfg.hair, HAIR_STYLES.length)].draw(g, hMain, hShadow);
  return g;
}

function clampIdx(i: number, len: number) {
  return Math.max(0, Math.min(len - 1, Math.floor(i)));
}

/* ---------- RENDER ---------- */
export function renderGridToCanvas(canvas: HTMLCanvasElement, g: Grid, bg = '#EDE4CC') {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const scaleX = canvas.width / SIZE;
  const scaleY = canvas.height / SIZE;
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const c = g[y][x];
      if (c === null) continue;
      ctx.fillStyle = c;
      ctx.fillRect(x * scaleX, y * scaleY, scaleX + 0.5, scaleY + 0.5);
    }
  }
}

/* ---------- SWATCH BUILDERS ---------- */
export function buildSkinSwatchGrid(skinIdx: number): Grid {
  const g = makeGrid();
  const tone = SKIN_TONES[clampIdx(skinIdx, SKIN_TONES.length)];
  drawHead(g, tone.main, tone.shadow, 28);
  return g;
}

export function buildHairSwatchGrid(hairIdx: number): Grid {
  const g = makeGrid();
  drawHead(g, '#D9A87C', '#B7855A', 28);
  HAIR_STYLES[clampIdx(hairIdx, HAIR_STYLES.length)].draw(g, '#1A1A1A', '#000000');
  return g;
}

export function buildShirtSwatchGrid(shirtIdx: number): Grid {
  const g = makeGrid();
  drawHead(g, '#D9A87C', '#B7855A', 28);
  const shirt = SHIRTS[clampIdx(shirtIdx, SHIRTS.length)];
  shirt.draw(g, shirt.colors[0], shirt.colors[1]);
  return g;
}

export function randomConfig(): AvatarConfig {
  return {
    skin: Math.floor(Math.random() * SKIN_TONES.length),
    hair: Math.floor(Math.random() * HAIR_STYLES.length),
    hairColor: Math.floor(Math.random() * HAIR_COLORS.length),
    shirt: Math.floor(Math.random() * SHIRTS.length),
    age: 22 + Math.floor(Math.random() * 30),
  };
}
