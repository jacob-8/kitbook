# How to Use Kitbook by Itself

If you look in [Kitbook's source code](https://github.com/jacob-8/kitbook/tree/main/packages/kitbook) or [Svelte Pieces' source code](https://github.com/jacob-8/kitbook/tree/main/packages/svelte-pieces) you'll see a `src/routes` folder and no `src/kitbook` folder.

When you are only building a library and not an app, there is no main app to run Kitbook alongside, so then your Kitbook becomes your main app.

You could just delete your `src/routes` folder and leave Kitbook alone in it's default `src/kitbook` folder. However, if for clarity or some other reason you want to adjust where Kitbook lives (e.g. `src/routes`) you can pass the path to the Kitbook plugin:

```diff
// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import { kitbook } from 'kitbook/plugins/vite';

const config = {
	plugins: [
+		kitbook({routes: 'src/routes'}),
		sveltekit(),
	],
};

export default config;
```

Then add some custom Kitbook-only Svelte config options in your svelte config:

```js
// svelte.config.js
const options = { 
  kitbookOptions: { 
    kit: { 
      files: { 
        routes: 'src/routes';
      },
      outDir: '.svelte-kit',
    }
  }
}
export default augmentSvelteConfigForKitbook(config, options);
```

You may be asking why not just leave `svelte.config.js` alone and remove `augmentSvelteConfigForKitbook` altogether? That function is needed to add other important items such as the default `app.html` for your Kitbook, as well as `MDSvex`.

