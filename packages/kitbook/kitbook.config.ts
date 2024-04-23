import { defineConfig } from './src/lib/defineConfig'

export default defineConfig({
  title: 'Kitbook',
  description: 'Svelte Component Documentation and Prototyping Workbench built using SvelteKit',
  viewports: [
    {
      name: 'Mobile',
      width: 320,
      height: 568,
    },
    {
      name: 'Desktop',
      width: 1024,
      height: 768,
    },
    // {
    //   name: 'Tablet',
    //   width: 768,
    //   height: 1024,
    // },
  ],
  languages: [{ name: null, code: null }], // This is only here to enable a composition inside Kitbook's docs. If you use this at all, you would have at least two languages here.
  addLanguageToUrl: ({ code, url }) => {
    const [path, search] = url.split('?')
    const params = new URLSearchParams(search)
    params.set('lang', code)
    return `${path}?${params.toString()}`
  },
  githubURL: 'https://github.com/jacob-8/kitbook/tree/main/packages/kitbook',
  expandTree: true,
  routesDirectory: 'src/lib/routes',
  kitbookRoute: '',
  viewer: {
    // showToggleButton: 'always',
  },
})
