import { writable } from 'svelte/store'
import { listeners } from './listener.js'

function createNodesStore() {
  const roots: SvelteBlockDetail[] = []
  const { subscribe, set, update } = writable(roots)

  const map: Map<any, SvelteBlockDetail> = new Map()

  function add({ node, target, anchor }: { node: SvelteBlockDetail; target?: Node; anchor?: Node }) {
    map.set(node.id, node)
    map.set(node.detail, node)

    let map_target = target && map.get(target)
    if (!map_target || map_target.parentBlock !== node.parentBlock)
      map_target = node.parentBlock

    node.parent = map_target

    const map_anchor = map.get(anchor)

    if (map_target) {
      const index = map_target.children.findIndex(n => n === map_anchor)
      if (index === -1)
        map_target.children.push(node)
      else map_target.children.splice(index, 0, node)
    }
    else {
      update(nodes => [...nodes, node])
    }

    listeners.add(node, map_anchor)
  }

  function remove(node: SvelteBlockDetail) {
    if (!node)
      return

    map.delete(node.id)
    map.delete(node.detail)

    if (node.parent) {
      node.parent.children = node.parent.children.filter(n => n !== node)
      node.parent = undefined
    }

    listeners.remove(node)
  }

  return { subscribe, set, add, remove }
}
