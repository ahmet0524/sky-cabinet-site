import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.skycabinetva.com',

  // privacy.astro -> privacy.html, served by Netlify as /privacy (pretty URLs). Canonicals and the sitemap use /privacy.
  build: { format: 'preserve' },
  trailingSlash: 'ignore',

  integrations: [
    sitemap({
      // thank-you is noindex; never list it.
      filter: (page) => !page.includes('/thank-you'),
      // Blog index and posts are folders (/blog/, /blog/<slug>/); match their canonical URLs.
      serialize(item) {
        if (/\/blog(\/[^/.]+)?$/.test(item.url)) item.url += '/';
        return item;
      },
    }),
  ],
});
