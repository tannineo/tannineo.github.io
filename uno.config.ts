import { defineConfig, presetAttributify, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  content: {
    filesystem: ['src/**/*.{js,jsx,ts,tsx,astro,mdx}'],
  },
  presets: [
    presetAttributify({
      prefix: 'u-',
      prefixedOnly: true,
    }),
    presetUno(),
    presetIcons({
      collections: {
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
      },
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  theme: {
    colors: {
      sumi: '#1C1C1C',
      seiji: '#69B0AC',
      mizu: '#81C7D4',
    },
  },
})
