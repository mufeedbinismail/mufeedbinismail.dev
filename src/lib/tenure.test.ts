import { describe, expect, it } from 'vitest';
import { monthLabel, spelled, yearsSince } from './tenure';

describe('yearsSince', () => {
  it('does not count a year until its anniversary month', () => {
    expect(yearsSince('2020-06', new Date(2026, 4, 31))).toBe(5);
  });

  it('counts the year from the first day of the anniversary month', () => {
    expect(yearsSince('2020-06', new Date(2026, 5, 1))).toBe(6);
  });

  it('never goes negative for a start in the future', () => {
    expect(yearsSince('2030-01', new Date(2026, 0, 1))).toBe(0);
  });
});

describe('spelled', () => {
  it('spells small numbers and falls back to digits', () => {
    expect(spelled(6)).toBe('six');
    expect(spelled(21)).toBe('21');
  });
});

describe('monthLabel', () => {
  it('formats a month as short month and year', () => {
    expect(monthLabel('2020-06')).toBe('Jun 2020');
  });
});
