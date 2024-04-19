// @ts-check
import { writable } from 'svelte/store'

if (!inIframe())
  listen()

function inIframe() {
  try {
    return window.self !== window.top
  }
  catch (e) {
    return true
  }
}

function listen() {
  const components = createComponentStore()
  const elements = createElementsStore()

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

  // @ts-expect-error - global
  window.kitbook_ComponentFragment_to_ComponentWithChildren = components
  // @ts-expect-error - global
  window.kitbook_ElementDetail_to_ComponentFragment = elements
}

function createComponentStore() {
  /** @type {Map<ComponentFragment, ComponentWithChildren>} */
  const components = new Map()
  const { subscribe, set } = writable(components)

  /** @param {SvelteComponentDetail} detail */
  function registerComponent(detail) {
    const fragment = detail.component.$$.fragment

    const existingComponent = components.get(fragment)
    if (existingComponent) {
      existingComponent.componentDetail = detail
    }
    else {
      components.set(fragment, {
        componentDetail: detail,
        childComponents: new Set(),
        childElements: new Set(),
      })
    }

    set(components)
  }

  /**
   * @param {ComponentFragment} componentFragment
   * @param {ComponentFragment} parentFragment
   */
  function setParentComponent(componentFragment, parentFragment) {
    const component = components.get(componentFragment)
    if (!component)
      return
    component.parentComponent = parentFragment
    set(components)
  }

  /** @param {ComponentFragment} componentFragment */
  function getComponent(componentFragment) {
    return components.get(componentFragment)
  }

  /** @param {ComponentFragment} componentFragment */
  function removeComponent(componentFragment) {
    const deleted = components.delete(componentFragment)
    if (deleted)
      set(components)
  }

  return {
    subscribe,
    registerComponent,
    setParentComponent,
    getComponent,
    removeComponent,
  }
}

function createElementsStore() {
  /** @type {Map<SvelteElementDetail, ComponentFragment>} */
  const elements = new Map()
  const { subscribe, set } = writable(elements)

  /**
   * @param {SvelteElementDetail} detail
   * @param {ComponentFragment} parentFragment
   */
  function addElement(detail, parentFragment) {
    elements.set(detail, parentFragment)
    set(elements)
  }

  /** @param {SvelteElementDetail} detail */
  function removeElement(detail) {
    const deleted = elements.delete(detail)
    if (deleted)
      set(elements)
  }

  return {
    subscribe,
    addElement,
    removeElement,
  }
}
