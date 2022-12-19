import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { codePreview } from '../../code-preview-remark/code-preview-remark.js';

// import { join, dirname } from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const path_to_layout = join(__dirname, "./MDSveXLayout.svelte");

const config = defineConfig({
  extensions: ['.md', '.svx'],
  remarkPlugins: [codePreview],
  rehypePlugins: [],
  // layout: path_to_layout,
});

export default config;
