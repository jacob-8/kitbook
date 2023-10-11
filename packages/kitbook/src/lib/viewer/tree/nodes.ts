import { derived, writable } from 'svelte/store'

function createComponentStore() {
  const components = new Map<ComponentFragment, ComponentWithChildren>()
  const { subscribe, set } = writable(components)

  function registerComponent(detail: SvelteComponentDetail) {
    const fragment = detail.component.$$.fragment

    const existingComponent = components.get(fragment)
    if (existingComponent) {
      console.info('component already exists')
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

  function setParentComponent(componentFragment: ComponentFragment, parentFragment: ComponentFragment) {
    const component = components.get(componentFragment)
    if (!component)
      return
    component.parentComponent = parentFragment
    set(components)
  }

  function getComponent(componentFragment: ComponentFragment) {
    return components.get(componentFragment)
  }

  function removeComponent(componentFragment: ComponentFragment) {
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
  const elements = new Map<SvelteElementDetail, ComponentFragment>()
  const { subscribe, set } = writable(elements)

  function addElement(detail: SvelteElementDetail, parentFragment: ComponentFragment) {
    elements.set(detail, parentFragment)
    set(elements)
  }

  function removeElement(detail: SvelteElementDetail) {
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

const components = createComponentStore()
export const elementsToParentComponent = createElementsStore()
export const componentsWithChildren = derived([components, elementsToParentComponent], ([$components, $elements], set) => {
  const componentsWithElementsAdded: Map<ComponentFragment, ComponentWithChildren> = $components

  $components.forEach((component, fragment) => {
    const parentComponent = componentsWithElementsAdded.get(component.parentComponent)
    if (!parentComponent)
      return
    parentComponent.childComponents.add(fragment)
  })

  $elements.forEach((parentComponent, element) => {
    const component = componentsWithElementsAdded.get(parentComponent)
    if (!component)
      return

    component.childElements.add(element)
  })

  set(componentsWithElementsAdded)
}, new Map<ComponentFragment, ComponentWithChildren>())

let currentParentFragment: ComponentFragment

const awaitFragmentsToParentComponent = new Map<ComponentFragment, ComponentFragment>()
let lastAwaitFragment: ComponentFragment

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
  elementsToParentComponent.addElement(node, currentParentFragment || lastAwaitFragment)
})

document.addEventListener('SvelteDOMRemove', ({ detail: { node } }) => {
  const isElement = node.nodeType === Node.ELEMENT_NODE
  if (!isElement)
    return
  elementsToParentComponent.removeElement(node)
})
