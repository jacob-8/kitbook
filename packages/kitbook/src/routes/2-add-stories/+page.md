# Stories

Still needs documented, but the [Svelte-Pieces directory](https://github.com/jacob-8/kitbook/tree/main/packages/svelte-pieces/src/routes) has some good examples for the moment.

## Display a Story's Code
To make it easy to learn and copy from a `Story`, add the following to your `mdsvex.config.js`:

```diff
import { defineMDSveXConfig as defineConfig } from 'mdsvex';
+import { codePreview } from 'kitbook/plugins/code-preview-remark.js';

const config = defineConfig({
  extensions: ['.md', '.svx'],
+  remarkPlugins: [codePreview],
  rehypePlugins: [],
});

export default config;
```

Add the `showCode` prop to the `Story` component to already start showing code.