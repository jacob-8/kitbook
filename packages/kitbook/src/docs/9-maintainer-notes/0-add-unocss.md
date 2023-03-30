# Add UnoCSS

[UnoCSS](https://uno.antfu.me/) via [svelte-scoped-uno](https://github.com/jacob-8/svelte-scoped-uno) lets us use TailwindCSS style utility classes but takes things a step further by allowing us to have all styles scoped to their particular component. This guarantees we'll never have a large bloated CSS file as our web app grows. Sure, some common styles like `.m-1` will be duplicated but that's better than the mental fatigue of trying to decide if it's worth using some obscure class like `.md:h-[100vh-20px]` in some obscure component knowing that now every page of the site will have to load down that CSS.

## Using [svelte-scoped-uno](https://github.com/jacob-8/svelte-scoped-uno) in a component library

[svelte-scoped-uno](https://github.com/jacob-8/svelte-scoped-uno) is by default a Vite plugin, but since `svelte-package` doesn't look use the Vite config you can use  [svelte-preprocess-unocss](https://github.com/jacob-8/svelte-scoped-uno/tree/main/packages/svelte-preprocess-unocss). After installing, add it as a svelte preprocessor in your `svelte.config.js` file, then utility classes will be compiled at packaging time. Since Kitbook uses `svelte-package` we add update our `svelte.config.js` like this:

```js twoslash title="svelte.config.js"
import { PreprocessUnocss } from 'svelte-preprocess-unocss'
/** @type {import('@sveltejs/kit').Config} */
// ---cut---
const config = {
  preprocess: [
    PreprocessUnocss({ classPrefix: 'kb-' }),
  ],
};
```

We then add a `uno.config.ts` file:

```ts twoslash title="uno.config.ts"
import { defineConfig, presetUno, presetIcons } from 'svelte-preprocess-unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      prefix: 'i-',
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
})
```

## Icons

That `presetIcons` option seen above enables [Pure CSS Icons](https://antfu.me/posts/icons-in-pure-css) from [Iconify](https://iconify.design/). Icons can now be added with `<span class="<prefix>-ic-round-chevron-right" />`, replacing `<prefix` with the chosen prefix, `i` in the code above. Use the [Icônes web app](https://icones.js.org/) or the equivalent VSCode [Icônes extension](https://github.com/afzalsayed96/vscode-icones) to quickly search for icons and copy using the appropriate prefix.

## Add Typography via CSS import
Currently, using `svelte-preprocess-unocss` doesn't provide support for plugins like prose classes because these are global by nature. In the meantime Kitbook uses a modified set of `.prose` classes from Tailwind in the `tw-prose.css` file.
