import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { rehypeDisplayLinkTitles } from '@kitbook/rehype-display-link-titles';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeUrls from 'rehype-urls';
import { shikiTwoslashHighlighter } from '@kitbook/mdsvex-shiki-twoslash';
import { MDSVEX_EXTENSIONS } from '../constants';

const config = defineConfig({
  extensions: MDSVEX_EXTENSIONS,
  remarkPlugins: [],
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