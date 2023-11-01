// Kitbook no longer uses MDSvex but this is kept here for historical purposes, particulary for demonstration of how to use @kitbook/mdsvex-shiki-twoslash

import { defineMDSveXConfig } from 'mdsvex'
import { rehypeDisplayLinkTitles } from '@kitbook/rehype-display-link-titles'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeUrls from 'rehype-urls'
import { shikiTwoslashHighlighter } from '@kitbook/mdsvex-shiki-twoslash'

export { mdsvex } from 'mdsvex'
export const MDSVEX_EXTENSIONS = ['.svx']

export const KITBOOK_MDSVEX_CONFIG = defineMDSveXConfig({
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
})

function openExternalInNewTab(url, node) {
  if (url.protocol?.startsWith('http')) {
    node.properties.target = '_blank'
    node.properties.rel = 'noopener'
    node.properties.rel = 'noreferrer'
  }
  // rehype-urls + this seems like a simpler approach than rehype-external-links
}
