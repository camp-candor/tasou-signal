// @ts-check
import { defineConfig } from 'astro/config';
import clerk from "@clerk/astro";
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [clerk()],
  output: 'hybrid',
  adapter: cloudflare({
    imageService: "passthrough",
    platformProxy: {
      enabled: true
    },
  })
});