import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.skycabinetva.com',
  // privacy.astro -> privacy.html, served by Netlify as /privacy (pretty URLs). Canonicals and the sitemap use /privacy.
  build: { format: 'preserve' },
  trailingSlash: 'ignore',
});
