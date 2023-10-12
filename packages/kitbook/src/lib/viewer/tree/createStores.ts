import { derived, writable } from 'svelte/store'

export function createComponentStore() {
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

export function createElementsStore() {
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
