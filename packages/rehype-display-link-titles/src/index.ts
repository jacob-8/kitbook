import { visit } from 'unist-util-visit'
import type { BuildVisitor } from 'unist-util-visit/complex-types'
import type { Element as HAST_Element, Root } from 'hast'

import { slug } from 'github-slugger' // https://github.com/rehypejs/rehype-slug uses this to generate heading ids this function must match it

/** @type {import('unified').Plugin<[Options?]|void[], Root>} */
export function rehypeDisplayLinkTitles(_options = {}): void | import('unified').Transformer<import('hast').Root, import('hast').Root> {
  return (tree) => {
    visit(tree, 'element', visitor())
  }

  function visitor(): BuildVisitor<Root, 'element'> {
    return (node) => {
      if (node.tagName === 'a' && node.properties) {
        removeMarkdownExtensionFromHref(node as AnchorElement)

        const title = node.properties.title as string
        // @ts-expect-error - value exists
        const text = node.children?.[0]?.value

        const hasAlias = text?.includes('|')
        if (hasAlias) {
          const [filename, alias] = text.split('|')
          node.children = [{ type: 'text', value: alias }]
          node.properties.title = `${title} (${filename})`
          return
        }

        const hasSectionHash = text?.includes('#')
        if (hasSectionHash) {
          const [filename, hash] = text.split('#')
          node.children = [{ type: 'text', value: hash }]
          node.properties.title = `${title} (${filename})`
          node.properties.href += `#${slug(hash)}`
          return
        }

        if (title && text) {
          node.children = [{ type: 'text', value: title }]
          node.properties.title = text
        }
      }
    }
  }
}

interface AnchorElement extends HAST_Element {
  tagName: 'a'
  properties: { href: string; title?: string }
  children: { type: 'text'; value: string }[]
}

// Leaving as a dummy for learning purposes (from rehype-autolink-headings)
interface Options {
  [key: string]: any
}

function removeMarkdownExtensionFromHref(node: AnchorElement) {
  if (node.properties.href)
    node.properties.href = node.properties.href.replace(/\.md$/, '')
}
