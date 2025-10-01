import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare';
import clerk from '@clerk/astro'

export default defineConfig({
  integrations: [clerk()],
  adapter: cloudflare(),
  output: 'server',
})
