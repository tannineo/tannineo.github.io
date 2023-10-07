import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import solidJS from '@astrojs/solid-js'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
    solidJS({
      include: ['**/solid/**/*.tsx'],
    }),
    mdx(),
  ],

  // deploy to github pages
  site: 'https://tannineo.github.io',
})
