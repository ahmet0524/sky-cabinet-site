import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.skycabinetva.com',
  // Keep the live URLs: privacy.astro -> /privacy.html, blog/[slug]/index.astro -> /blog/<slug>/
  build: { format: 'preserve' },
  trailingSlash: 'ignore',
});
