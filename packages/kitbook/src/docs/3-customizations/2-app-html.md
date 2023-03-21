# Customizing app.html

By default, when your run your Kitbook (`vite dev --mode kitbook`) the `augmentSvelteConfigForKitbook` will update your `svelte.config.js` to point to an `app.html` file and assets folder contained in the kitbook package (in your node_modules folder), like this: 

```ts twoslash {5-6}
import type { Config } from '@sveltejs/kit';
const MDSVEX_EXTENSIONS = ['.md', '.svx'];

// ---cut---
const DEFAULT_KITBOOK_OPTIONS: Config = {
  extensions: ['.svelte', ...MDSVEX_EXTENSIONS],
  kit: {
    files: {
      appTemplate: 'node_modules/kitbook/dist/app.html',
      assets: 'node_modules/kitbook/dist/assets',
    },
  }
}
```

If you would like to provide your own `app.html` file or point to the same one used by your main app then you can simply pass a few options to the `augmentSvelteConfigForKitbook` function which will overwrite Kitbook defaults.

```js twoslash title="svelte.config.js" {6-7, 12}
import { augmentSvelteConfigForKitbook } from '@kitbook/vite-plugin-kitbook'; 
/** @type {import('@sveltejs/kit').Config} */
let config = {};

// ---cut---
//...
/** @type {import('@sveltejs/kit').Config} */
const kitbookOptions = {
  kit: {
    files: {
      appTemplate: 'src/app.html',
      assets: 'static',
    },
  }
}

export default augmentSvelteConfigForKitbook(config, kitbookOptions);

```


If you do this, ensure you have a styles reset loaded in your `app.html` file above `%sveltekit.head%`. Tailwind and many other CSS frameworks include this. If you don't have one yet, you can copy the `kitbook/styles/tw-reset.css` file into your static directory and link to it in your `app.html`: `<link rel="stylesheet" href="%sveltekit.assets%/tw-reset.css">`.