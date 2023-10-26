import { unified } from 'unified'
import remarkParse from 'remark-parse'
import rehypeSlug from 'rehype-slug'
import remarkToc from 'remark-toc'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import { rehypeDisplayLinkTitles } from '@kitbook/rehype-display-link-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeUrls from 'rehype-urls'
import { shikiTwoslashHighlighter } from '@kitbook/mdsvex-shiki-twoslash'
import { remarkHighlighter } from './remarkHighlighter.js'

// import remarkGfm from 'remark-gfm'

const processor = unified()
  .use(remarkParse)
  // .use(remarkGfm) // not yet
  .use(remarkToc)
  .use(remarkHighlighter, shikiTwoslashHighlighter({ themes: ['dark-plus'] })) // requires async
  .use(remarkRehype, { allowDangerousHtml: true }) // allowDangerousHtml lets shikied html pass through
  .use(rehypeDisplayLinkTitles) // place first to save needless checking of heading links about to be created by following plugins
  .use(rehypeUrls, openExternalInNewTab)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: 'wrap',
    properties: {
      class: 'heading-anchor',
    },
  })
  .use(rehypeFormat) // pretty print
  .use(rehypeStringify, { allowDangerousHtml: true })

export async function markdownToHtml(code: string): Promise<string> {
  return (await processor.process(code)).value as string
}

// rehype-urls plus this function seems like a simpler approach than rehype-external-links
function openExternalInNewTab(url, node) {
  if (url.protocol?.startsWith('http')) {
    node.properties.target = '_blank'
    node.properties.rel = 'noopener'
    node.properties.rel = 'noreferrer'
  }
}
