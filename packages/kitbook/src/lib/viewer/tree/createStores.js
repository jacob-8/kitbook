import { writable } from 'svelte/store'

export function createComponentStore() {
  /** @type {Map<ComponentFragment, ComponentWithChildren>} */
  const components = new Map()
  const { subscribe, set } = writable(components)

  /** @param {SvelteComponentDetail} detail */
  function registerComponent(detail) {
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

export function createElementsStore() {
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
