import { defineMDSveXConfig as defineConfig } from 'mdsvex';

const config = defineConfig({
  extensions: ['.md', '.svx', '.svelte'],
  remarkPlugins: [],
  rehypePlugins: [],
});

export default config;
