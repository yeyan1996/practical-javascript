import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Practical JavaScript',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Source Code', link: '/source-code' },
    ],

    sidebar: [
      {
        text: 'Source Code',
        items: fs.readdirSync(new URL('../src', import.meta.url)).filter(i => path.extname(i) === '.md').map(dirname => ({ text: dirname, link: `/src/${dirname}/${dirname}.md` })),
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yeyan1996/practical-javascript' },
    ],
  },
})