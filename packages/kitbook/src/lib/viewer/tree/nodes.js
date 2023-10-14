import { createComponentStore, createElementsStore } from './createStores'

export const components = createComponentStore()
export const elements = createElementsStore()

/** @type {ComponentFragment} */
let currentParentFragment

/** @type {Map<ComponentFragment, ComponentFragment>} */
const awaitFragmentsToParentComponent = new Map()

/** @type {ComponentFragment} */
let lastAwaitFragment

document.addEventListener('SvelteRegisterComponent', ({ detail }) => {
  components.registerComponent(detail)
})

document.addEventListener('SvelteRegisterBlock', ({ detail }) => {
  const { type, block } = detail

  if (type === 'component') {
    // mount
    if (block.m) {
      const original = block.m
      block.m = (target, anchor) => {
        components.setParentComponent(block, currentParentFragment)

        // store current parent in memory
        const parentComponentFragment = currentParentFragment
        // temporarily set currentParentFragment to this component
        currentParentFragment = block

        // run the mount
        original(target, anchor)

        // then reset the parent back to what it was
        currentParentFragment = parentComponentFragment
      }
    }

    // update
    if (block.p) {
      const original = block.p
      block.p = (ctx, dirty) => {
        // store current parent in memory
        const parentComponentFragment = currentParentFragment
        // temporarily set currentParentFragment to this component
        currentParentFragment = block

        // run the update
        original(ctx, dirty)

        // then reset the parent back to what it was
        currentParentFragment = parentComponentFragment
      }
    }

    // destroy
    if (block.d) {
      const original = block.d
      block.d = (detaching) => {
        components.removeComponent(block)
        original(detaching)
      }
    }
  }

  // because 'pending' await blocks are asynchronous, we have to store the parent component separately
  if (type === 'pending') {
    if (block.m) {
      const original = block.m
      block.m = (target, anchor) => {
        awaitFragmentsToParentComponent.set(block, currentParentFragment)
        original(target, anchor)
      }
    }

    if (block.d) {
      const original = block.d
      block.d = (detaching) => {
        lastAwaitFragment = awaitFragmentsToParentComponent.get(block)
        awaitFragmentsToParentComponent.delete(block)
        original(detaching)
      }
    }
  }
})

document.addEventListener('SvelteDOMInsert', ({ detail: { node } }) => {
  const isElement = node.nodeType === Node.ELEMENT_NODE
  if (!isElement)
    return
  elements.addElement(node, currentParentFragment || lastAwaitFragment)
})

document.addEventListener('SvelteDOMRemove', ({ detail: { node } }) => {
  const isElement = node.nodeType === Node.ELEMENT_NODE
  if (!isElement)
    return
  elements.removeElement(node)
})
