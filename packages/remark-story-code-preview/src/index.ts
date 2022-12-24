// From https://github.com/techniq/svelte-ux/blob/master/src/lib/plugins/remark.js
import { visit } from 'unist-util-visit'
import type { BuildVisitor } from 'unist-util-visit/complex-types'
import type { Root } from 'mdast';
import MagicString from 'magic-string';
import { parse, walk } from 'svelte/compiler';
import type { Element } from 'svelte/types/compiler/interfaces';
import { escapeSvelte } from "mdsvex";
import { highlight } from './highlight';

import prettier from 'prettier/esm/standalone.mjs';
import typescriptPlugin from 'prettier/esm/parser-typescript.mjs';
import sveltePlugin from 'prettier-plugin-svelte';
const { format } = prettier;

/** @type {import('unified').Plugin<[Options?]|void[], Root>} */
export function remarkCodePreview({ componentName } = { componentName: 'Story' }): (tree: any) => void {
  return (tree: Root) => {
    visit(tree, 'html', visitor())
  }

  function visitor(): BuildVisitor<Root, "html"> {
    return (node) => {
      if (node.value.startsWith(`<${componentName}`)) {
        node.value = placeContentIntoCodeAttribute(node.value, componentName);
      }
    };
  }
}

export function placeContentIntoCodeAttribute(html: string, componentName: string) {
  const s = new MagicString(html);
  const ast = parse(html);

  walk(ast.html, {
    enter(node: Element) {
      if (node.type === 'InlineComponent' && node.name === componentName && node.children) {
        const contentStart = node.children[0].start;
        const contentEnd = node.children[node.children.length - 1].end;
        const code = s.slice(contentStart, contentEnd);

        const formattedCode = format(code, {
          parser: 'svelte',
          plugins: [typescriptPlugin, sveltePlugin],
          bracketSameLine: true,
        });
        const highlightedCode = highlight(formattedCode);

        const injectStart = node.start + '<'.length + componentName.length;
        s.appendLeft(injectStart, ` code={\`${escapeSvelte(highlightedCode).trim()}\`}`);
      }
    }
  })

  return s.toString();
}

// Leaving as a dummy for learning purposes (from rehype-autolink-headings)
type Options = {
  componentName: string
}
