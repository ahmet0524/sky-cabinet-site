import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// <lastmod> for the sitemap. Blog posts use their own updatedDate/pubDate from the front matter,
// the blog index uses the newest post, legal pages use the date their text last changed,
// and everything else (the home page) uses the build date.
const postDates = {};
for (const f of readdirSync('./src/content/blog').filter((f) => f.endsWith('.md'))) {
  const fm = readFileSync(`./src/content/blog/${f}`, 'utf8').split('---')[1] || '';
  if (/^draft:\s*true/m.test(fm)) continue;
  const d = (fm.match(/^updatedDate:\s*(\S+)/m) || fm.match(/^pubDate:\s*(\S+)/m) || [])[1];
  if (d) postDates[f.replace(/\.md$/, '')] = new Date(d).toISOString();
}
const newestPost = Object.values(postDates).sort().pop();
const FIXED = { '/privacy': '2026-11-22', '/sms-terms': '2026-11-22' };
const buildDate = new Date().toISOString();

export default defineConfig({
  site: 'https://www.skycabinetva.com',

  // privacy.astro -> privacy.html, served by Netlify as /privacy (pretty URLs). Canonicals and the sitemap use /privacy.
  build: { format: 'preserve' },
  trailingSlash: 'ignore',

  integrations: [
    sitemap({
      // thank-you is noindex; never list it.
      filter: (page) => !page.includes('/thank-you'),
      serialize(item) {
        // Blog index and posts are folders (/blog/, /blog/<slug>/); match their canonical URLs.
        if (/\/blog(\/[^/.]+)?$/.test(item.url)) item.url += '/';
        const path = new URL(item.url).pathname;
        const slug = (path.match(/^\/blog\/([^/]+)\/$/) || [])[1];
        if (slug && postDates[slug]) item.lastmod = postDates[slug];
        else if (path === '/blog/' && newestPost) item.lastmod = newestPost;
        else if (FIXED[path]) item.lastmod = new Date(FIXED[path]).toISOString();
        else item.lastmod = buildDate;
        return item;
      },
    }),
  ],
});
