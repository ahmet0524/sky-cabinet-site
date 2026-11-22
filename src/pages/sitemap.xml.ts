import type { APIRoute } from 'astro';
import { SITE_URL } from '../consts';
import { getPosts, postPath } from '../posts';

// Same URL Search Console already has: https://www.skycabinetva.com/sitemap.xml
// New pages: add them to STATIC_PAGES. Blog posts are picked up automatically.
const STATIC_PAGES = ['/', '/privacy.html', '/sms-terms.html'];

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    ...STATIC_PAGES.map((p) => ({ loc: SITE_URL + p, lastmod: today })),
    ...(posts.length ? [{ loc: `${SITE_URL}/blog/`, lastmod: today }] : []),
    ...posts.map((p) => ({
      loc: SITE_URL + postPath(p.id),
      lastmod: (p.data.updatedDate ?? p.data.pubDate).toISOString().slice(0, 10),
    })),
  ];
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join('\n') +
    '\n</urlset>\n';
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
