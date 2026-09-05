import { defineCollection } from 'astro:content';

import { glob } from 'astro/loaders';

import { z } from 'astro/zod';

const lists = defineCollection({
    loader: glob({ base: './src/lists', pattern: '**/*.json' }),
    schema: z.object({
        name: z.string(),
        slug: z.string(),
        difficulty: z.string(),
        words: z.array(z.string()),
    }),
});

export const collections = { lists };