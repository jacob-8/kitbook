import { visit } from 'unist-util-visit'
import type { Code, Html, Root } from 'mdast'
import type { Transformer } from 'unified'

/**
 * Accepts any MDSVex Highlighter
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export function remarkHighlighter({ highlighter }: Options = logHighlighter()): void | Transformer<Root> {
  return async (tree) => {
    const nodesToTransform: Code[] = []
    visit(tree, 'code', (node) => {
      nodesToTransform.push(node)
    })

    await Promise.all(
      nodesToTransform.map(async (node) => {
        node.value = await highlighter(
          node.value,
          node.lang,
          node.meta,
        );
        (node as unknown as Html).type = 'html'
      }),
    )
  }
}

function logHighlighter(_settings = {}): { highlighter: MDSvexHighlighter } {
  return {
    highlighter: async (code, lang, meta) => {
      console.info({ code, lang, meta })
      return code
    },
  }
}

interface Options {
  highlighter: MDSvexHighlighter
}

type MDSvexHighlighter = (code: string, lang: string | undefined, metastring: string | undefined) => string | Promise<string>
