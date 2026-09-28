import { describe, expect, it } from 'vitest';
import { glueNumberRanges } from './format';

describe('glueNumberRanges', () => {
  it('puts a word joiner after the dash of a number range', () => {
    expect(glueNumberRanges('3–4 months down to 2–3 hours')).toBe('3–⁠4 months down to 2–⁠3 hours');
  });

  it('leaves dashes between words alone', () => {
    expect(glueNumberRanges('before–after')).toBe('before–after');
  });
});
