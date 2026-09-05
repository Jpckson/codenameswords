import type { APIRoute } from "astro";
import { getCollection } from 'astro:content';
export const prerender = false;

export const GET = (async () => {

    const results = await getCollection('lists');
    const list = results.map(({ data: { name, slug, difficulty, words } }) => ({
        name,
        slug,
        language: 'en',
        difficulty,
        words: words.length,
        url: `/api/lists/${slug}`,
        page: `/${slug}`,
    }));

    return new Response(JSON.stringify(list), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}) satisfies APIRoute;