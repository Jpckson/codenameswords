# **Codenames Words**
The official codebase for [Codenames Words](https://codenameswords.xyz)

Codenames Words hosts public themed word lists for Codenames the game.

## API
Codenames Words has a publically available API rate limited to ~100 requests per minute.

### `curl https://codenameswords.xyz/api/lists/`
Fetches all available lists
- name
- slug
- language
- difficulty
- words (word count)
- url
- page

### `curl https://codenameswords.xyz/api/lists/{slug}?length={WordCount}`
Fetches {WordCount} random words from the list.

Length defaults to 25.
<br>Max 100. Min 1.
- name
- slug
- language
- difficulty
- [words]

## 

This project was my first using [Astro](https://github.com/withastro/astro).