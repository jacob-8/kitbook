import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkSlug from 'remark-slug'
import remarkToc from 'remark-toc'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'

const processor = unified()
  .use(remarkParse)
  .use(remarkSlug)
  .use(remarkToc)
  .use(remarkRehype)
  .use(rehypeFormat) // pretty print
  .use(rehypeStringify)

export function markdownToHtml(code: string): string {
  const html = processor.processSync(code).value as string
  return html
}

// import MarkdownIt from 'markdown-it'

// https://github.com/markdown-it/markdown-it

// export interface PluginOptions {
//   markdown?: (body: string) => string
//   markdownIt?: MarkdownIt | MarkdownIt.Options
// }

// export function markdownCompiler(options: PluginOptions): MarkdownIt | { render: (body: string) => string } {
//   if (options.markdownIt) {
//     if (options.markdownIt instanceof MarkdownIt || (options.markdownIt?.constructor?.name === 'MarkdownIt'))
//       return options.markdownIt as MarkdownIt
//     else if (typeof options.markdownIt === 'object')
//       return MarkdownIt(options.markdownIt)
//   }
//   else if (options.markdown) {
//     return { render: options.markdown }
//   }
//   return MarkdownIt({ html: true })
// }
