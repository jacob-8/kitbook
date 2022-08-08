import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { codePreview } from './src/lib/plugins/code-preview-remark.js';

const config = defineConfig({
  extensions: ['.md', '.svx'],
  remarkPlugins: [codePreview],
  rehypePlugins: [],
});

export default config;
