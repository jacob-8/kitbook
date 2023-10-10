let current_block: undefined | SvelteBlockDetail
let pointer = 0

export const nodes = {
  root: [] as SvelteBlockDetail[],

  map: new Map() as Map<any, SvelteBlockDetail>,

  add({ node, target, anchor }: { node: SvelteBlockDetail; target?: Node; anchor?: Node }) {
    this.map.set(node.id, node)
    this.map.set(node.detail, node)

    let map_target = target && this.map.get(target)
    if (!map_target || map_target.parentBlock !== node.parentBlock)
      map_target = node.parentBlock

    node.parent = map_target

    const map_anchor = this.map.get(anchor)

    if (map_target) {
      const index = map_target.children.findIndex(n => n === map_anchor)
      if (index === -1)
        map_target.children.push(node)
      else map_target.children.splice(index, 0, node)
    }
    else {
      this.root.push(node)
    }
  },

  remove(node: SvelteBlockDetail) {
    if (!node)
      return

    this.map.delete(node.id)
    this.map.delete(node.detail)

    if (node.parent) {
      node.parent.children = node.parent.children.filter(n => n !== node)
      node.parent = undefined
    }
  },
}

document.addEventListener('SvelteRegisterComponent', ({ detail }) => {
  const { component, tagName } = detail

  const node = nodes.map.get(component.$$.fragment)
  if (node) {
    nodes.map.delete(component.$$.fragment)

    node.detail = component
    node.tagName = tagName
  }
  else {
    nodes.map.set(component.$$.fragment, {
      type: 'component',
      detail: component,
      tagName,
    })
  }
})

let last_promise: any
document.addEventListener('SvelteRegisterBlock', ({ detail }) => {
  const { type, id, block, ...rest } = detail
  const current_node_id = pointer++

  if (block.m) {
    const original = block.m
    block.m = (target, anchor) => {
      const parent = current_block

      const node = /** @type {SvelteBlockDetail} */ ({
        id: current_node_id,
        type: 'block',
        detail: rest,
        tagName: type === 'pending' ? 'await' : type,
        parentBlock: parent,
        children: [],
      })

      switch (type) {
        case 'then':
        case 'catch':
          if (!node.parentBlock)
            node.parentBlock = last_promise
          break

        case 'slot':
          node.type = 'slot'
          break

        case 'component': {
          const component = nodes.map.get(block)
          if (component) {
            nodes.map.delete(block)
            Object.assign(node, component)
          }
          else {
            node.type = 'component'
            node.tagName = 'Unknown'
            node.detail = {}
            nodes.map.set(block, node)
          }

          // Promise.resolve().then(() => {
          //   const invalidate = node.detail.$$?.bound || {}
          //   Object.keys(invalidate).length && listeners.update(node)
          // })
          break
        }
      }

      if (type === 'each') {
        const group
          = (parent && nodes.map.get(parent.id + id))
					/** @type {SvelteBlockDetail} */ || ({
            version: '',
            id: pointer++,
            type: 'block',
            tagName: 'each',
            parentBlock: parent,
            children: [],
            detail: {
              ctx: {},
              source: detail.source,
            },
          })
        parent && nodes.map.set(parent.id + id, group)
        nodes.add({ node: group, target, anchor })

        node.parentBlock = group
        node.type = 'iteration'

        // @ts-expect-error - overloaded nodes
        nodes.add({ node, target: group, anchor })
      }
      else {
        nodes.add({ node, target, anchor })
      }

      current_block = node

      original(target, anchor)

      current_block = parent
    }
  }

  if (block.p) {
    const original = block.p
    block.p = (changed, ctx) => {
      const parent = current_block
      current_block = nodes.map.get(current_node_id)
      // current_block && listeners.update(current_block)

      original(changed, ctx)

      current_block = parent
    }
  }

  if (block.d) {
    const original = block.d
    block.d = (detaching) => {
      const node = nodes.map.get(current_node_id)
      if (node) {
        if (node.tagName === 'await')
          last_promise = node.parentBlock

        nodes.remove(node)
      }

      original(detaching)
    }
  }
})

document.addEventListener('SvelteDOMInsert', ({ detail }) => {
  deep_insert(detail) // { node, target, anchor }

  function deep_insert({ node: element, target, anchor }: Omit<DocumentEventMap['SvelteDOMInsert']['detail'], 'version'>) {
    const type
      = element.nodeType === Node.ELEMENT_NODE
        ? 'element'
        : element.nodeValue && element.nodeValue !== ' '
          ? 'text'
          : 'anchor'

    nodes.add({
      anchor,
      target,
      // @ts-expect-error - missing properties are irrelevant
      node: {
        id: pointer++,
        type,
        detail: element,
        tagName: element.nodeName.toLowerCase(),
        parentBlock: current_block,
        children: [],
      },
    })

    element.childNodes.forEach((child) => {
      !nodes.map.has(child) && deep_insert({ node: child, target: element })
    })
  }
})

document.addEventListener('SvelteDOMRemove', ({ detail }) => {
  const node = nodes.map.get(detail.node)
  if (node)
    nodes.remove(node)
})

