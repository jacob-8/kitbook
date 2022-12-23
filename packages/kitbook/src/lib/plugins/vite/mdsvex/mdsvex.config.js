import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { codePreview } from '../../code-preview-remark/code-preview-remark.js';
import { rehypeDisplayLinkTitles } from '@kitbook/rehype-display-link-titles';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeUrls from 'rehype-urls';
import { shikiTwoslashHighlighter } from '@kitbook/mdsvex-shiki-twoslash';

const config = defineConfig({
  extensions: ['.md', '.svx'],
  remarkPlugins: [codePreview],
  rehypePlugins: [
    rehypeDisplayLinkTitles, // place first to save needless tests of heading links about to be created by following plugins
    [rehypeUrls, openExternalInNewTab],
    rehypeSlug,
    [rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: {
        class: 'heading-anchor',
      },
    }],
  ],
  highlight: shikiTwoslashHighlighter({ themes: ['dark-plus'] }),
});

export default config;

function openExternalInNewTab(url, node) {
  if (url.protocol?.startsWith('http')) {
    node.properties.target = '_blank'
    node.properties.rel = 'noopener';
    node.properties.rel = 'noreferrer';
  }
  // rehype-urls + this seems like a simpler approach than rehype-external-links
}