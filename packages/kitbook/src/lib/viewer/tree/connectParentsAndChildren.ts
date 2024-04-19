export function connectParentsAndChildren(components: Map<ComponentFragment, ComponentWithChildren>, elements: Map<SvelteElementDetail, ComponentFragment>) {
  const componentsWithElementsAdded: Map<ComponentFragment, ComponentWithChildren> = new Map(components)
  const nodeComponents = new Set<ComponentWithChildren>()

  // find each component's parentComponent and add it to that parent's childComponents
  components.forEach((component, fragment) => {
    const parentComponent = componentsWithElementsAdded.get(component.parentComponent)
    if (!parentComponent)
      return
    parentComponent.childComponents.add(fragment)
  })

  // find each element's parentComponent and it to that parent's childElements unless their is a further up ancestor with a tag matching that element's file location
  elements.forEach((parentFragment, element) => {
    const parentComponent = componentsWithElementsAdded.get(parentFragment)
    if (!parentComponent)
      return

    const inNodeModules = element.__svelte_meta?.loc.file.includes('node_modules')
    if (parentComponent.isFromNodeModules !== true)
      parentComponent.isFromNodeModules = inNodeModules

    if (inNodeModules)
      nodeComponents.add(parentComponent)

    if (!inNodeModules && element.__svelte_meta?.loc.file)
      parentComponent.localFilenameUsedIn = element.__svelte_meta.loc.file

    let currentAncestorComponent = parentComponent
    while (currentAncestorComponent && !element.__svelte_meta.loc.file.includes(currentAncestorComponent.componentDetail.tagName)) {
      if (currentAncestorComponent.parentComponent)
        currentAncestorComponent = componentsWithElementsAdded.get(currentAncestorComponent.parentComponent)
      else
        currentAncestorComponent = undefined
    }

    if (currentAncestorComponent)
      currentAncestorComponent.childElements.add(element)
    else
      parentComponent.childElements.add(element)
  })

  nodeComponents.forEach((component) => {
    const parentComponent = componentsWithElementsAdded.get(component.parentComponent)

    let currentAncestorComponent = component.localFilenameUsedIn
      ? findAncestor(component, componentsWithElementsAdded)
      : parentComponent

    while (currentAncestorComponent?.isFromNodeModules)
      currentAncestorComponent = componentsWithElementsAdded.get(currentAncestorComponent.parentComponent)

    if (currentAncestorComponent)
      transferChildElements(component, currentAncestorComponent)
  })

  function findAncestor(component: ComponentWithChildren, componentsWithElementsAdded: Map<ComponentFragment, ComponentWithChildren>) {
    let currentAncestorComponent = componentsWithElementsAdded.get(component.parentComponent)
    while (currentAncestorComponent && !component.localFilenameUsedIn.includes(currentAncestorComponent.componentDetail.tagName)) {
      currentAncestorComponent = currentAncestorComponent.parentComponent
        ? componentsWithElementsAdded.get(currentAncestorComponent.parentComponent)
        : undefined
    }
    return currentAncestorComponent
  }

  function transferChildElements(fromComponent: ComponentWithChildren, toComponent: ComponentWithChildren) {
    fromComponent.childElements.forEach((element) => {
      toComponent.childElements.add(element)
    })
    fromComponent.childElements = new Set()
  }

  return componentsWithElementsAdded
}
