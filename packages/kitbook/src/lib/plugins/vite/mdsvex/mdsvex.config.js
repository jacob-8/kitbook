import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { codePreview } from '../../code-preview-remark/code-preview-remark.js';
import { rehypeDisplayLinkTitles } from '@kitbook/rehype-display-link-titles';

const config = defineConfig({
  extensions: ['.md', '.svx'],
  remarkPlugins: [codePreview],
  rehypePlugins: [rehypeDisplayLinkTitles],
});

export default config;
