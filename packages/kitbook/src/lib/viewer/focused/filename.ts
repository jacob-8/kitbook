export function getFirstElementFilename(component: ComponentWithChildren) {
  const element = component.childElements.values().next().value as SvelteElementDetail
  return element?.__svelte_meta?.loc.file || ''
}
