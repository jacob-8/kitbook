# mdsvex-shiki-twoslash

## Usage

- `npm i -D @kitbook/mdsvex-shiki-twoslash`

- Add to your `mdsvex.config.js`:

```js
import { defineMDSveXConfig as defineConfig } from 'mdsvex'
import { shikiTwoslashHighlighter } from '@kitbook/mdsvex-shiki-twoslash'

const config = defineConfig({
  // ...
  highlight: shikiTwoslashHighlighter({ themes: ['dark-plus'] }),
})

export default config
```

- Add the css to your project: `import "@kitbook/mdsvex-shiki-twoslash/shiki-twoslash.css";` (or import from https://www.unpkg.com/@kitbook/mdsvex-shiki-twoslash@0.0.3/src/shiki-twoslash.css) > I recommend you read through the entire CSS and adjust to your liking. It's been optimized for dark-plus, but as you'll see from the light-plus version, there's no border around the code. So it's a good starting point but you really should look it over and make it fit your needs.

## Themes

ShikiTwoslash will default to using the `dark-plus` and `light-plus` themes if you don't pass a theme/themes option. If you leave alone the themes option and let it spit out both dark and light versions, you can then use media queries to show the desired option depending on dark/light mode. To adjust themes you could simply look at the default ones found in the [themes folder of the shiki package](https://www.runpkg.com/?shiki@0.12.1/themes/dark-plus.json). See also the [Shiki-Twoslash docs](https://shikijs.github.io/twoslash/) and [Shiki docs](https://github.com/shikijs/shiki) for more about themes as it's very flexible in allowing you to add any VS Code theme or even create a new one via a json file.

## Other Helpful links

These initially got me going, but really in hindsight, just reading the the [Shiki-Twoslash docs](https://shikijs.github.io/twoslash/) and [Shiki docs](https://github.com/shikijs/shiki) right from the start would have been better.

- https://github.com/pngwn/MDsveX/issues/139#issuecomment-877842887
- https://rodneylab.com/sveltekit-shiki-syntax-highlighting/ 