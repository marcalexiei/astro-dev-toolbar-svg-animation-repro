import { defineConfig } from 'astro/config';

// Set ASTRO_DEV_TOOLBAR=off to start `astro dev` without the toolbar: the animation then completes.
export default defineConfig({
  devToolbar: { enabled: process.env.ASTRO_DEV_TOOLBAR !== 'off' },
});
