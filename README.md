# SKY Cabinet Kitchen & Bath — skycabinetva.com

Astro 7 static site. GitHub `main` → Netlify builds it automatically (`netlify.toml`: `npm run build`, publishes `dist/`).

## Run locally

```
npm install
npm run dev      # http://localhost:4321, drafts are visible here
npm run build    # production build into dist/
```

## Where things live

| What | File |
|---|---|
| Address, phone, hours, cities, Instagram, LocalBusiness schema | `src/consts.ts` (change once, every page updates) |
| `<head>`, Google tag (GTM-KSP6328V), click events | `src/layouts/Base.astro` |
| Top bar, header, footer | `src/components/Header.astro`, `Footer.astro` |
| Pages | `src/pages/*.astro` (`privacy.astro` → `/privacy.html`) |
| CSS, images, robots.txt | `public/` |
| Sitemap (`/sitemap.xml`) | `src/pages/sitemap.xml.ts` — add new static pages to `STATIC_PAGES`; blog posts are added automatically |

## Add a blog post

1. Create `src/content/blog/<url-slug>.md` (the file name becomes `/blog/<url-slug>/`).
2. Front matter:
   ```
   ---
   title: "Shaker vs. Slab Cabinet Doors"
   description: "One or two sentences for Google and link previews."
   pubDate: 2026-12-01
   image: /img/blog/shaker-vs-slab.jpg   # optional, put the file in public/img/blog/
   imageAlt: "White shaker kitchen"        # optional
   draft: false
   ---
   ```
3. Write the post in Markdown, commit, push. It appears on `/blog/`, in the sitemap, with BlogPosting schema.

`/blog/` is `noindex` and left out of the sitemap until the first real post is published.

## Do not break

- The quote form posts natively to Netlify Forms (`data-netlify="true"`). Do not add a submit handler that calls `preventDefault()` — that silently dropped every lead before 22 Nov 2026.
- Every script in a page must be `<script is:inline>`, or Astro bundles it as a module and `gtag` stops being global.
- Inside `.astro` markup, `{` and `}` start an expression. Write them as `&#123;` `&#125;` in text.
