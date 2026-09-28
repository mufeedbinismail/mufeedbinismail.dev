/** Two-digit display number for a zero-based position: 01, 02, … */
export const numbered = (index: number) => String(index + 1).padStart(2, '0');

/** Joins number ranges like `3–4` with a word joiner, so a line never breaks after the dash. */
export const glueNumberRanges = (text: string) => text.replace(/(\d)–(\d)/g, '$1–⁠$2');
