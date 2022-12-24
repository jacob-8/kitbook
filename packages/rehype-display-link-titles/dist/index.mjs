import { visit } from 'unist-util-visit';

function rehypeDisplayLinkTitles(options = {}) {
  return (tree) => {
    visit(tree, "element", visitor());
  };
  function visitor() {
    return (node) => {
      if (node.tagName === "a" && node.properties) {
        const title = node.properties.title;
        node.children;
        const text = node.children?.[0]?.value;
        const hasAlias = text?.includes("|");
        if (hasAlias) {
          const [filename, alias] = text.split("|");
          node.children = [{ type: "text", value: alias }];
          node.properties.title = `${title} (${filename})`;
          return;
        }
        if (title && text) {
          node.children = [{ type: "text", value: title }];
          node.properties.title = text;
        }
      }
    };
  }
}

export { rehypeDisplayLinkTitles };
