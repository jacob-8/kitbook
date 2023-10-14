import { type Writable, derived } from 'svelte/store'

// import { isFromNodeModules } from '../focused/filename'

declare global {
  interface Window {
    kitbookSvelteComponents: Writable<Map<ComponentFragment, ComponentWithChildren>>
    kitbookSvelteElements: Writable<Map<SvelteElementDetail, ComponentFragment>>
  }
}
const components = window.kitbookSvelteComponents
const elements = window.kitbookSvelteElements

// TODO: handle node_modules components better
// const nodeComponents = new Set<ComponentWithChildren>()

export const componentsWithChildren = derived([components, elements], ([$components, $elements], set) => {
  const componentsWithElementsAdded: Map<ComponentFragment, ComponentWithChildren> = new Map($components)

  $components.forEach((component, fragment) => {
    // from each component, find its parent component and add it to that parent's childComponents
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

  // componentsWithElementsAdded.forEach((component) => {
  //   const fromNodeModules = isFromNodeModules(component)
  //   if (fromNodeModules)
  //     nodeComponents.add(component)
  // })

  // nodeComponents.forEach((component) => {
  //   const parentComponent = componentsWithElementsAdded.get(component.parentComponent)
  //   console.log({ parent: parentComponent.componentDetail.tagName })
  //   // needs made recursive
  //   if (parentComponent) {
  //     component.childElements.forEach((element) => {
  //       parentComponent.childElements.add(element)
  //     })
  //     component.childElements = new Set()
  //   }
  // })

  set(componentsWithElementsAdded)
}, new Map<ComponentFragment, ComponentWithChildren>())

export const elementsToLocalParentComponent = derived(componentsWithChildren, ($componentsWithChildren, set) => {
  const elements: Map<SvelteElementDetail, ComponentFragment> = new Map()

  $componentsWithChildren.forEach((component, fragment) => {
    component.childElements.forEach((element) => {
      elements.set(element, fragment)
    })
  })

  set(elements)
}, new Map<SvelteElementDetail, ComponentFragment>())
