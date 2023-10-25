export function markdownToHtml(_code: string): string {
  return '<div>Markdown needs converted</div>'
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
