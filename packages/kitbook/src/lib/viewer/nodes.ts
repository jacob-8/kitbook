import { writable } from 'svelte/store'

// eslint-disable-next-line unused-imports/no-unused-vars
let svelteVersion: string
setup(window.document)

type ComponentFragment = SvelteComponentDetail['component']['$$']['fragment']

type ComponentWithElements = SvelteComponentDetail & {
  elements: SvelteElementDetail[]
}

function createComponentStore() {
  const components = new Map<ComponentFragment, ComponentWithElements>()
  const { subscribe, set } = writable(components)

  function addComponent(detail: SvelteComponentDetail) {
    components.set(detail.component.$$.fragment, { ...detail, elements: [] })
    set(components)
  }

  function removeComponent(componentFragment: ComponentFragment) {
    components.delete(componentFragment)
    set(components)
  }

  function addElement(componentFragment: ComponentFragment, element: SvelteElementDetail) {
    const component = components.get(componentFragment)
    if (!component)
      return
    component.elements.push(element)
    set(components)
  }

  return {
    subscribe,
    addComponent,
    removeComponent,
    addElement,
  }
}

function createArrayStore<T>() {
  const { subscribe, update } = writable<T[]>([])
  return {
    subscribe,
    add: (detail: T) => update(components => [...components, detail]),
    remove: (detail: T) => update(components => components.filter(c => c !== detail)),
  }
}
export const components = createArrayStore<SvelteComponentDetail>()

function setup(root: Document) {
  root.addEventListener('SvelteRegisterBlock', ({ detail }) => svelteVersion = detail.version, { once: true })

  root.addEventListener('SvelteRegisterComponent', ({ detail }) => {
    components.add(detail)
    const { component, tagName, options, version } = detail
    console.log({ [tagName]: detail })
  })
  root.addEventListener('SvelteRegisterBlock', ({ detail }) => {
    // if (detail.type !== 'component')
    //   return
    // if (!detail.block?.m)
    //   return
  })
  // root.addEventListener('SvelteDOMInsert', svelteDOMInsert)
  // root.addEventListener('SvelteDOMRemove', svelteDOMRemove)
}
