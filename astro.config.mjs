// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dee7studio.com',
  adapter: cloudflare(),
  // Clean URLs without a trailing slash (/blog, not /blog/). Matches the old
  // Webflow URLs Google already knows and removes the 307 hop on every
  // internal link.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
});
