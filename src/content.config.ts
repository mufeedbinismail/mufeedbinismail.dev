import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const cases = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/cases' }),
  schema: z.object({
    /** Reading order for "Next write-up". */
    order: z.number().int().positive(),
    title: z.string(),
    summary: z.string(),
    year: z.string(),
    area: z.string(),
    role: z.string(),
    stack: z.array(z.string()).min(1),
    problem: z.string(),
    steps: z.array(z.object({ heading: z.string(), text: z.string() })).min(1),
    outcome: z.string(),
    lesson: z.string(),
  }),
});

export const collections = { cases };
