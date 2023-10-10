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

export function addListener(listener: typeof nodes[number]) {
  nodes.push(listener)
}

export function removeListener(listener: typeof nodes[number]) {
  const index = nodes.indexOf(listener)
  if (index === -1)
    return false
  return !!nodes.splice(index, 1)
}
