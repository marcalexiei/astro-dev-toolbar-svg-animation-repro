# Astro's dev toolbar freezes SVG animations in Safari

An SVG shown through `<img>` that animates with CSS stops partway through in Safari under
`astro dev`. It plays to the end in a build, with the toolbar off, and in Chromium.

![The ring stops partway under astro dev and completes under astro preview](demo.gif)

## Reproduce

```sh
pnpm install
pnpm dev
```

Open http://localhost:4321/ in Safari. Each ring should draw itself in one second and "OK" should
fade in. Since Astro 7.4.10 ([#18621](https://github.com/withastro/astro/pull/18621)) the eager ring
does, but the `loading="lazy"` one still stops partway and its "OK" never shows.

WebKit reports a `decodedBodySize` of 0 for a lazy image, so the audit falls back to fetching it
again, which freezes it. The lazy ring loads `/ring.svg?lazy` so the two images are separate requests.

It completes in each of these cases:

- `ASTRO_DEV_TOOLBAR=off pnpm dev`, which turns the toolbar off in `astro.config.mjs`;
- `pnpm build && pnpm preview`;
- any Chromium browser.

Empty Safari's caches (⌥⌘E) between loads: it animates an SVG `<img>` only on first load.
`public/fetch.html` shows the cause without Astro: fetching an animating SVG's URL freezes it.

Tested with Astro 7.4.10, Safari on macOS and Playwright's WebKit.
