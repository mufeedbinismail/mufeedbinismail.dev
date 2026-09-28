/**
 * Contact details reach the page only in this form: the value XORed with a
 * random key, both base64-encoded. It keeps harvesters that grep HTML/JS for
 * `@` or digit runs away from the values; it is not encryption.
 */
export interface Obfuscated {
  data: string;
  key: string;
}

const toBase64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes));
const fromBase64 = (text: string) => Uint8Array.from(atob(text), (c) => c.charCodeAt(0));
const xor = (bytes: Uint8Array, key: Uint8Array) => bytes.map((b, i) => b ^ key[i % key.length]);

export function obfuscate(value: string): Obfuscated {
  const key = crypto.getRandomValues(new Uint8Array(16));
  return { data: toBase64(xor(new TextEncoder().encode(value), key)), key: toBase64(key) };
}

export function deobfuscate({ data, key }: Obfuscated): string {
  return new TextDecoder().decode(xor(fromBase64(data), fromBase64(key)));
}
