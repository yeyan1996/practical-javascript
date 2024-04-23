import fs from 'node:fs'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Practical JavaScript',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Source Code', link: '/src/assign/assign.md' },
    ],

    sidebar: fs.readdirSync(new URL('../src', import.meta.url))
        .map((dirname: string) => ({ text: dirname, link: `/src/${dirname}/${dirname}.md` })),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yeyan1996/practical-javascript' },
    ],
  },
})
