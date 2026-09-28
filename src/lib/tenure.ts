/** A month in `YYYY-MM` form, e.g. `2020-06`. */
export type YearMonth = `${number}-${number}`;

/** Whole years completed between `since` and `now`; the anniversary month counts as complete. */
export function yearsSince(since: YearMonth, now: Date = new Date()): number {
  const [year, month] = since.split('-').map(Number);
  const months = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
  return Math.max(0, Math.floor(months / 12));
}

const WORDS = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen', 'twenty',
];

/** The number spelled out for prose, falling back to digits past twenty. */
export function spelled(n: number): string {
  return WORDS[n] ?? String(n);
}

/** Year of a `YYYY-MM` month. */
export function yearOf(month: YearMonth): number {
  return Number(month.split('-')[0]);
}

/** `Jun 2020` style label for a `YYYY-MM` month. */
export function monthLabel(month: YearMonth): string {
  const [year, m] = month.split('-').map(Number);
  return new Date(Date.UTC(year, m - 1, 1)).toLocaleString('en-GB', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
