# Kitbook Config

If you want to keep your `vite.config.ts` file clean or be able to use your Kitbook config for visual regression tests, you can move your config into a file called `kitbook.config.ts`:

```ts title="kitbook.config.ts"
import { defineConfig } from 'kitbook/defineConfig'

export default defineConfig({
  title: 'Kitbook Template',
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
  ],
  githubURL: 'https://github.com/jacob-8/kitbook/tree/main/packages/template',
  expandTree: true,
})
```

Then you can pass that to your Kitbook plugin:

```ts title="vite.config.ts" {4,8}
import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { kitbook } from 'kitbook/plugins/vite'
import kitbookConfig from './kitbook.config'

export default defineConfig({
  plugins: [
    kitbook(kitbookConfig),
    sveltekit(),
  ],
})
```