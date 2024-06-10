import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "琥珀草",
  description: "+1s",
  lang: 'zh-Hans',
  head: [
    ['link', { rel: 'icon', href: '/img/favicon.png' }],
    ['link', { rel: 'apple-touchicon', href: '/img/touch-icon.png' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/INTRO' },
      { text: 'CHANGELOG', link: '/CHANGELOG' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pbdm' }
    ]
  },
  lastUpdated: true,
  vite: {
    server: {
      port: 2222
    } 
  }
})
