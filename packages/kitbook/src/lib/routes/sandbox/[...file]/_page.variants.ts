import type { Variant } from 'kitbook'
import type { SvelteComponent } from 'svelte'
import type Component from './+page.svelte'
import IndividualComponent from './mockComponents/IndividualComponent.svelte'

type ComponentVariant = Variant<Component>

export const ComponentWithProps: ComponentVariant = {
  data: {
    pagesStore: null,
    pages: null,

    page: null,
    pageKey: '',

    variantName: 'First',
    component: IndividualComponent as typeof SvelteComponent,
    variant: {
      name: 'James',
    },
    variantsConfig: null,

    darkMode: false,
    settings: null,
  },
}

export const Component_Without_Props: ComponentVariant = {
  data: {
    pagesStore: null,
    pages: null,

    page: null,
    pageKey: '',

    variantName: 'Second',
    component: IndividualComponent as typeof SvelteComponent,
    variant: null,
    variantsConfig: null,

    darkMode: false,
    settings: null,
  },
}
