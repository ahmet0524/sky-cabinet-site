import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per post in src/content/blog/. The file name becomes the URL: /blog/<file-name>/
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** Path under /public, e.g. /img/blog/shaker-vs-slab.jpg */
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    /** Drafts build locally (npm run dev) but never ship. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
