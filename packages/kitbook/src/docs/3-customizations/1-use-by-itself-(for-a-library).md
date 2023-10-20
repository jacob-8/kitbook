# Use Kitbook by Itself

If you are building a library and you want to use Kitbook by itself without a main app, you can do that. Just set the `kitbookRoute` property in your config to an empty string:

```js twoslash title="vite.config.js" {8}
import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { kitbook } from 'kitbook/plugins/vite'

export default defineConfig({
  plugins: [
    kitbook({
      kitbookRoute: '',
    }),
    sveltekit(),
  ],
})
```

## Filtering out variants and compositions files from your package

If you are using `svelte-package` and you don't want to add your stories and variants files to the output package, you can add a `.npmignore` file to your repo and add the following to it:

```
*.variants.ts
*.composition
**/*.md
*.svx
```


