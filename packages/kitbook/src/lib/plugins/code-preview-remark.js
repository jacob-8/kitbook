import { visit } from 'unist-util-visit';
import prettier from 'prettier/esm/standalone.mjs';
import typescriptPlugin from 'prettier/esm/parser-typescript.mjs';
import sveltePlugin from 'prettier-plugin-svelte';
import Prism from 'prismjs';
import 'prism-svelte';

const { format } = prettier;

/**
 * Inject `code` prop to <Story>
 */
export function codePreview() {
  function visitor(node) {
    if (node.value.startsWith('<Story')) {
      node.value = placeContentIntoCodeAttribute(node.value);
    }
  }

  return (tree) => {
    visit(tree, 'html', visitor);
  };
}

import MagicString from 'magic-string';
import { parse, walk } from 'svelte/compiler';

export function placeContentIntoCodeAttribute(html, tagName = "Story") {
  const s = new MagicString(html);
  const ast = parse(html);

  walk(ast.html, {
    enter(node) {
      if (node.type === 'InlineComponent' && node.name === tagName) {
        const contentStart = node.children[0].start;
        const contentEnd = node.children[node.children.length - 1].end;
        const code = s.slice(contentStart, contentEnd);

        const formattedCode = format(code, {
          parser: 'svelte',
          plugins: [typescriptPlugin, sveltePlugin],
        });
        const highlightedCode = Prism.highlight(formattedCode, Prism.languages.svelte, 'svelte');

        const injectStart = node.start + '<'.length + tagName.length;
        s.appendLeft(injectStart, ` code={\`${highlightedCode.replace('`', '\\`').trim()}\`} `);
      }
    }
  })

  return s.toString();
}