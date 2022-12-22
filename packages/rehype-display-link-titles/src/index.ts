import { visit } from 'unist-util-visit'
import type { BuildVisitor } from 'unist-util-visit/complex-types'
import type { Root } from 'hast';

/** @type {import('unified').Plugin<[Options?]|void[], Root>} */
export function rehypeDisplayLinkTitles(options = {}): (tree: any, file: any) => void {
  return (tree: Root) => {
    visit(tree, 'element', visitor())
  }

  function visitor(): BuildVisitor<Root, "element"> {
    return (node) => {
      if (node.tagName === 'a' && node.properties) {
        const title = node.properties.title as string;
        node.children;
        // @ts-ignore
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
    };
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
