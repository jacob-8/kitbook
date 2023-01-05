# Add UnoCSS

[UnoCSS](https://uno.antfu.me/) in [svelte-scoped](https://github.com/unocss/unocss/tree/main/packages/vite#sveltesveltekit-scoped-mode) mode lets us use TailwindCSS style utility classes but takes things a step further by allowing us to have all styles scoped to their particular component. This guarantees we'll never have a large bloated CSS file as our web app grows. Sure, some common styles like `.m-1` will be duplicated but that's better than the mental fatigue of trying to decide if it's worth using some obscure class like `.md:h-[100vh-20px]` in some obscure component knowing that now every page of the site will have to load down that CSS.

If all you want to do is use UnoCSS in your app, then see the [svelte-scoped](https://github.com/unocss/unocss/tree/main/packages/vite#sveltesveltekit-scoped-mode) docs.

## Using UnoCSS in a component library

UnoCSS in Svelte is by default a Vite plugin, but `svelte-package` doesn't look at your Vite config and so if you want to use UnoCSS in a component library then you must add it as a svelte preprocessor in your `svelte.config.js` file. Then those classes will be compiled upon package time. Since Kitbook uses `svelte-package` we added UnoCSS to our `svelte.config.js` instead of `vite.config.js`:

```js twoslash title="svelte.config.js"
import UnoCSS from 'temp-s-p-u'; // will change to @kitbook/svelte-preprocess-unocss in future, UnoCSS maintainers didn't want to add yet another way to use UnoCSS in Svelte projects as svelte-package may one day support using preprocessors from Vite plugins.
/** @type {import('@sveltejs/kit').Config} */
// ---cut---
const config = {
  preprocess: [
    UnoCSS({ options: { classPrefix: 'kb-' } }),
  ],
};
```

The custom class prefix is optional but can helps distinguish between projects. At present the UnoCSS extension is a little bit buggy without the presence of a `uno.config.ts` file and so defining the config here makes everything easier:

```ts twoslash title="uno.config.ts"
import { defineConfig, presetUno, presetIcons } from 'unocss'

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
Currently, using UnoCSS in `svelte-scoped` mode doesn't provide support for plugins like prose classes because these are global by nature. In the meantime Kitbook uses a modified set of `.prose` classes from Tailwind in the `tw-prose.css` file.
