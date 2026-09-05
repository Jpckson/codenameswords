import { defineConfig, fontProviders } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import node from '@astrojs/node';

export default defineConfig({
    site: 'https://codenameswords.xyz',
    base: '/',
    trailingSlash: "never",
    output: 'static',
    root: '.',
    srcDir: './src',
    prerenderConflictBehavior: 'error',

    redirects: { // 301 err
        // former paths that might be cached still 
        '/en': '/',
        '/en/[list]': '/[list]',
        '/emoji': '/',
        '/emoji/[list]': '/[list]',
    },

    integrations: [
        sitemap({
            filter: (page) => {
                return !page.includes('/api/');
            }
        })
    ],

  // Fonts downloads font and serves it
    fonts: [
        {
            provider: fontProviders.google(),
            name: "Bungee",
            cssVariable: "--Bungee",
            weights: ["400","700"], // only ships needed weights
        },
        {
            provider: fontProviders.google(),
            name: "Space Mono",
            cssVariable: "--SpaceMono",
            weights: ["400","700"],
        } 
    ],

    server: { port: 4221 },
    adapter: node({
        mode: 'standalone'
    })
});