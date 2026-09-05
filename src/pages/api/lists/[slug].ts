import type { APIRoute } from "astro";
import { getCollection } from 'astro:content';

export const prerender = false;

export async function getStaticPaths() {
    const results = await getCollection('lists');
    return results.map(({ data: { slug } }) => ({
        params: { slug },
    }));
}

export const GET = (async ({ params, url }) => {
    let { slug } = params;

    const results = await getCollection('lists');
    const entry = results.find(({ data }) => data.slug === slug);

    if (!entry) {
        return new Response(JSON.stringify({ error: "List not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    const { name, slug: entrySlug, difficulty, words } = entry.data;

    const lengthParam = url.searchParams.get('length');
    const parsed = Number.parseInt(lengthParam ?? '', 10);
    let length = Number.isNaN(parsed) ? 25 : parsed;

    if (!length || length > 99 || length < 1 || words.length < length) {
        length = 25;
    }
    
    const safe = /^[a-zA-Z0-9-]+$/;
    let copy = words.filter(word => word.length < 16 && safe.test(word));
    let randomWords = [];
    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * copy.length);
        const randomWord = copy[randomNumber];
        randomWords.push(randomWord);
        copy.splice(copy.indexOf(randomWord), 1);
    }

    const list = {
        name,
        slug: entrySlug,
        language: 'en',
        difficulty,
        words: randomWords,
    };

    return new Response(JSON.stringify(list), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}) satisfies APIRoute;