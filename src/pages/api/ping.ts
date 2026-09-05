import type { APIRoute } from "astro";

export const GET = (async () => {

    return new Response(JSON.stringify("Pong!"), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}) satisfies APIRoute;