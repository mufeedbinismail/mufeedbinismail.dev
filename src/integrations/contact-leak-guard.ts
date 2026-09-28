import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';
import { loadEnv } from 'vite';

const TEXT_FILES = /\.(html|js|mjs|css|json|xml|txt|webmanifest)$/;

async function* textFilesIn(dir: string): AsyncGenerator<string> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* textFilesIn(path);
    else if (TEXT_FILES.test(entry.name)) yield path;
  }
}

/** Every spelling of the contact details a harvester could match on. */
function needlesFor(email: string, phone: string): string[] {
  const digits = phone.replace(/\D/g, '');
  return [email, encodeURIComponent(email), email.replace('@', '&#64;'), phone, digits, digits.slice(-9)];
}

/**
 * Fails the build if the raw email or phone number appears anywhere in the
 * output. The CV PDFs are exempt — that is where the details are meant to live.
 */
export default function contactLeakGuard(): AstroIntegration {
  return {
    name: 'contact-leak-guard',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const env = loadEnv('production', process.cwd(), 'CONTACT_');
        const needles = needlesFor(env.CONTACT_EMAIL ?? '', env.CONTACT_PHONE ?? '').filter(Boolean);
        const leaks: string[] = [];
        const root = fileURLToPath(dir);
        for await (const file of textFilesIn(root)) {
          const text = await readFile(file, 'utf8');
          const hit = needles.find((needle) => text.includes(needle));
          if (hit) leaks.push(`${file.slice(root.length)} contains "${hit}"`);
        }
        if (leaks.length) throw new Error(`Contact details leaked into the build:\n${leaks.join('\n')}`);
        logger.info('No raw contact details in the build output.');
      },
    },
  };
}
