import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare';
import clerk from '@clerk/astro'

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [clerk()],
  adapter: cloudflare(),
  output: 'server',

  vite: {
    plugins: [tailwindcss()],
  },
})