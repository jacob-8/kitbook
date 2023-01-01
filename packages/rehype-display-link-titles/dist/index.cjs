'use strict';

const unistUtilVisit = require('unist-util-visit');
const githubSlugger = require('github-slugger');

function rehypeDisplayLinkTitles(options = {}) {
  return (tree) => {
    unistUtilVisit.visit(tree, "element", visitor());
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
        const hasSectionHash = text?.includes("#");
        if (hasSectionHash) {
          const [filename, hash] = text.split("#");
          node.children = [{ type: "text", value: hash }];
          node.properties.title = `${title} (${filename})`;
          node.properties.href += `#${githubSlugger.slug(hash)}`;
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

exports.rehypeDisplayLinkTitles = rehypeDisplayLinkTitles;
