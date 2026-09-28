import { describe, expect, it } from 'vitest';
import { deobfuscate, obfuscate } from './obfuscate';

describe('obfuscate', () => {
  const email = 'someone@example.com';

  it('round-trips a value', () => {
    expect(deobfuscate(obfuscate(email))).toBe(email);
  });

  it('leaves no trace of the value in its output', () => {
    const { data, key } = obfuscate(email);
    expect(data + key).not.toContain('@');
    expect(data + key).not.toContain('someone');
  });

  it('uses a fresh key each time', () => {
    expect(obfuscate(email).key).not.toBe(obfuscate(email).key);
  });
});
