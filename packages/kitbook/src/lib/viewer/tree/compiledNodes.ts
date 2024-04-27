import { type Writable, derived, readable } from 'svelte/store'
import { connectParentsAndChildren } from './connectParentsAndChildren'

declare global {
  interface Window {
    kitbook_ComponentFragment_to_ComponentWithChildren: Writable<Map<ComponentFragment, ComponentWithChildren>>
    kitbook_ElementDetail_to_ComponentFragment: Writable<Map<SvelteElementDetail, ComponentFragment>>
  }
}
const components = window.kitbook_ComponentFragment_to_ComponentWithChildren || readable(new Map())
const elements = window.kitbook_ElementDetail_to_ComponentFragment || readable(new Map())

export const componentsWithChildren = derived([components, elements], ([$components, $elements], set) => {
  const componentsWithElementsAdded = connectParentsAndChildren($components, $elements)
  set(componentsWithElementsAdded)
}, new Map<ComponentFragment, ComponentWithChildren>())

// flips the above for easy lookups of components by element
export const elementsToParentComponent = derived(componentsWithChildren, ($componentsWithChildren, set) => {
  const elements: Map<SvelteElementDetail, ComponentFragment> = new Map()

  $componentsWithChildren.forEach((component, fragment) => {
    component.childElements.forEach((element) => {
      elements.set(element, fragment)
    })
  })

  set(elements)
}, new Map<SvelteElementDetail, ComponentFragment>())

// function LogComponents(components: Map<ComponentFragment, ComponentWithChildren>) {
//   components.forEach((component, _fragment) => {
//     console.log(component.componentDetail.tagName, { props: component.componentDetail.options.props })
//   })
// }

// function logElements(elements: Map<SvelteElementDetail, ComponentFragment>, components: Map<ComponentFragment, ComponentWithChildren>) {
//   elements.forEach((_fragment, element) => {
//     console.log({ tagName: components.get(_fragment)?.componentDetail.tagName, nodeName: element.nodeName, file: element.__svelte_meta.loc.file })
//   })
// }

// function LogConnected(components: Map<ComponentFragment, ComponentWithChildren>) {
//   components.forEach((component, _fragment) => {
//     console.log({ tagName: component.componentDetail.tagName, childComponents: Array.from(component.childComponents).map(component => components.get(component).componentDetail.tagName), childElements: Array.from(component.childElements).map(element => `${element.nodeName}__${element.__svelte_meta.loc.file}`) })
//   })
// }
