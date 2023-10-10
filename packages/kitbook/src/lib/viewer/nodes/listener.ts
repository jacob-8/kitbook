const nodes: typeof listeners[] = []

export const listeners = {
  add(node: SvelteBlockDetail, anchor: SvelteBlockDetail) {
    nodes.forEach(({ add }) => add(node, anchor))
  },

  update(node: SvelteBlockDetail) {
    node && nodes.forEach(({ update }) => update(node))
  },

  remove(node: SvelteBlockDetail) {
    nodes.forEach(({ remove }) => remove(node))
  },
}
