import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import contactLeakGuard from './src/integrations/contact-leak-guard.ts';

export default defineConfig({
  site: 'https://mufeedbinismail.dev',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [react(), sitemap(), contactLeakGuard()],
  env: {
    // Read at build time from .env locally and from the Cloudflare Pages project settings.
    // They only ever reach the page obfuscated; see src/lib/obfuscate.ts.
    schema: {
      CONTACT_EMAIL: envField.string({ context: 'server', access: 'secret' }),
      CONTACT_PHONE: envField.string({ context: 'server', access: 'secret' }),
    },
  },
});
