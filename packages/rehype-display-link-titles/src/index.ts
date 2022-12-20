import { visit } from 'unist-util-visit'
import type { Visitor } from 'unist-util-visit/complex-types'
import { Plugin } from 'unified';

/** @type {import('unified').Plugin<[Options?]|void[], Root>} */
export function rehypeDisplayLinkTitles(options = {}): Plugin {
  const visitor: Visitor<Element> = (node) => {
    if (node.tagName === 'a') {
      const title = node.properties.title;
      const text = node.children?.[0]?.value;
      if (title && text) {
        node.children = [{ type: 'text', value: title }];
        node.properties.title = text;
      }
    } else return 'skip'
  }

  return (tree, file) => {
    visit(tree, 'element', visitor)
  }
}

type Element = {
  type: 'element',
  tagName: 'a',
  properties: { href: string, title?: string },
  children: { type: 'text', value: string }[]
}

// Leaving as a dummy for learning purposes (from rehype-autolink-headings)
type Options = {
  // [key: string]: any
}