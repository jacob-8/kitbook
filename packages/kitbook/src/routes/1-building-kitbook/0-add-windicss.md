# Add Windicss to SvelteKit

[Windicss](https://windicss.org/) lets us use TailwindCSS style utility classes but takes things a step further by allowing us to have all styles scoped to their particular component. This guarantees we'll never have a large bloated CSS file as our web app grows. Sure, some common styles like `.m-1` will be duplicated but that's better than the mental fatigue of trying to decide if it's worth using some obscure class in some obscure component knowing that now every page of the site will have to load down that CSS.

## Install and Config

- Install `svelte-windicss-preprocess@~4.1.0` (set to `4.1.0` due to a [bug](https://github.com/windicss/svelte-windicss-preprocess/issues/431) in more recent versions).
- Install `windicss` to be able to define a `windi.config.js` file to customize your theme or pull in needed plugins as desired *(optional)*.
- Add to `svelte.config.js`:
```diff
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
+ import { windi } from "svelte-windicss-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [...mdsvexConfig.extensions],
  preprocess: [
    preprocess(),
    mdsvex(mdsvexConfig),
+    windi({
+      configPath: './windi.config.js', // automatic windi config discovery may struggle in a monorepo with multiple windi.config.js files
+      experimental: {
+        icons: {
+          prefix: 'i-',
+          extraProperties: {
+            'display': 'inline-block',
+            'vertical-align': 'middle',
+          }
+        }
+      }
+    }),
  ],
  kit: {
    adapter: adapter(),
  },
};
export default config;
```

- That `experimental.icons` option seen above enables [Pure CSS Icons](https://antfu.me/posts/icons-in-pure-css) from [Iconify](https://iconify.design/). Icons can now be added with `<span class="i-ic-round-chevron-right" />` Use the [Icônes web app](https://icones.js.org/) or the equivalent VSCode [Icônes extension](https://github.com/afzalsayed96/vscode-icones) to quickly search for icons and copy using the appropriate `i-` prefix.


## Styles Reset
To include a styles reset add to the root `__layout.svelte`:
```html
<style windi:preflights:global>
</style>
```

## ~~Add Typography Plugin~~ (skipped due to Windicss + typography build issue + lack of `.not-prose` support)
- Install `windicss` to gain access to the [typography plugin](https://windicss.org/plugins/official/typography.html).
- Add `windi.config.js` with the following code to import the typography plugin and add `'prose'` to the `safelist` to make the styles work globally:
```js
import { defineConfig } from 'windicss/helpers';
import typhography from 'windicss/plugin/typography';

export default defineConfig({
  safelist: ['prose'],
  plugins: [typhography()],
});
```
- Add `windi:safelist:global` to the same style block where you previously add `windi:preflights:global`
- Wrap the layout `<slot />` with an element containing `.prose`.
- If your typography elements in your pages remain unstyled as mine did upon adding a second windi.config.js file to my monorepo, you may need to tell `svelte-windicss-preprocess` where to find your config by passing the path manually with: `windi({configPath: './windi.config.js'})`

## Add Typography via CSS import
- As an alternative, I copied current `.prose` classes from Tailwind into `tw-prose.css` because they include `.not-prose` and imported it into the `Windi.svelte` component.
- Changed to `.tw-prose` class for clarity that it's a custom class and wrapped the layout `<slot />` with an element containing `.tw-prose`. The `Story.svelte` component wraps slotted content with `.not-prose` to keep typography styles from leaking into component stories.

## Add PrismJS to highlight code blocks properly
- Choose your style from [PrismJS's standard themes](https://prismjs.com/#examples) or a few [extra themes](https://github.com/PrismJS/prism-themes) they provide. Then import the styles; I've chosen to use **unpkg** and have added `<link href="https://unpkg.com/prismjs@1.27.0/themes/prism-tomorrow.css" rel="stylesheet" />` to the end of the `body` tag in `app.html`.

## Ignore Errors thrown if using `@apply` inside `<style>` blocks
- Add `'svelte3/ignore-styles': () => true,` to the `settings` object in your `.eslintrc.cjs` file.
- Add `--diagnostic-sources js,svelte` to your `svelte-check` commands to tell it to skip checking CSS
- Add `"css.lint.unknownAtRules": "ignore"` to your `.vscode/settings.json` file if using `@apply` inside style blocks.

## Further Styles Improvements
- Improved code blocks on mobile to go to the horizontal edges with `:global(pre) { @apply !-mx-3 md:!mx-0 !rounded-none md:!rounded-md; }`
- ~~Adjusted the look of inline code blocks by adding to my `windi.config.js`:~~ 
```js
theme: {
  extend: {
    typography: {
      DEFAULT: {
        css: {
          code: {
            background: '#e6e6e6',
            padding: '1px 4px',
            'border-radius': '4px',
          },
          'code::before': {
            content: '""',
          },
          'code::after': {
            content: '""',
          },
        }
      }
    }
  }
},
```
- Adjusted the look of inline code blocks by updating my custom `tw-prose.css` stylesheet:
```diff
.tw-prose :where(code):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-code);
  font-weight: 600;
  font-size: 0.875em;
+  background: #e6e6e6; 
+  padding: '1px 4px';
+  border-radius: '4px';
}
.tw-prose :where(code):not(:where([class~="not-prose"] *))::before {
-  content: "`";
}
.tw-prose :where(code):not(:where([class~="not-prose"] *))::after {
-  content: "`";
}
```

## Future Enhancements
Could enable dark mode - learn from https://github.com/dansvel/sveltekit-windi