import type { ElementEntry as Element } from "./elements";

// Each band takes whole columns. Heights list the filled cells per column,
// bottom-aligned, so short columns leave a gap at the top like the d-block.
const BANDS: { families: string[]; heights: number[] }[] = [
  { families: ["document", "metadata"], heights: [8] },
  { families: ["sectioning"], heights: [8, 8] },
  { families: ["grouping"], heights: [7, 7] },
  { families: ["table"], heights: [5, 5] },
  { families: ["embedded"], heights: [6, 7] },
  { families: ["text", "edits"], heights: [7, 8, 8, 8] },
  { families: ["form"], heights: [7, 8] },
  { families: ["interactive", "scripting"], heights: [8] },
];

export const ROWS = 8;
export const COLUMNS = BANDS.reduce((sum, band) => sum + band.heights.length, 0);
export const F_BLOCK_WIDTH = 15;

export interface Placed {
  el: Element;
  /** Row inside its own list. Main table and fossils each start at 1. */
  row: number;
  col: number;
  /** Row on the whole board, used for arrow-key navigation. */
  boardRow: number;
}

export function placeMain(elements: Element[]): Placed[] {
  const placed: Placed[] = [];
  let col = 1;
  for (const band of BANDS) {
    const members = elements
      .filter((el) => band.families.includes(el.data.family.id))
      .sort((a, b) => a.data.n - b.data.n);
    const capacity = band.heights.reduce((a, b) => a + b, 0);
    if (members.length !== capacity) {
      throw new Error(`Band ${band.families.join("+")} has ${members.length} elements but ${capacity} cells`);
    }
    let i = 0;
    for (const height of band.heights) {
      for (let r = ROWS - height + 1; r <= ROWS; r++) placed.push({ el: members[i++], row: r, col, boardRow: r });
      col++;
    }
  }
  return placed;
}

// Obsolete elements fill two rows under the table, offset by one column.
export function placeFBlock(elements: Element[]): Placed[] {
  return elements
    .filter((el) => el.data.family.id === "obsolete")
    .sort((a, b) => a.data.n - b.data.n)
    .map((el, i) => {
      const row = Math.floor(i / F_BLOCK_WIDTH) + 1;
      // The fossils sit below a one-row gap that holds their label.
      return { el, row, col: (i % F_BLOCK_WIDTH) + 2, boardRow: ROWS + 1 + row };
    });
}
