import { visit } from 'unist-util-visit'
import type { Visitor } from 'unist-util-visit/complex-types'
// import type { Plugin } from 'unified';

/** @type {import('unified').Plugin<[Options?]|void[], Root>} */
export function rehypeDisplayLinkTitles(options = {}): (tree: any, file: any) => void {
  const visitor: Visitor<Element> = (node) => {
    if (node.tagName === 'a') {
      const title = node.properties.title;
      const text = node.children?.[0]?.value;
      const hasAlias = text?.includes('|');
      if (hasAlias) {
        const [filename, alias] = text.split('|');
        node.children = [{ type: 'text', value: alias }];
        node.properties.title = `${title} (${filename})`;
        return;
      }

      if (title && text) {
        node.children = [{ type: 'text', value: title }];
        node.properties.title = text;
      }
    }
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