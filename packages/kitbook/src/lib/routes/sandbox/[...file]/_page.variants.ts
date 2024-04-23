import type { Variant } from 'kitbook'
import type { SvelteComponent } from 'svelte'
import type Component from './+page.svelte'
import IndividualComponent from './mockComponents/IndividualComponent.svelte'

export const Component_With_Props: Variant<Component> = {
  data: {
    pagesStore: null,
    pages: null,

    page: null,
    pageKey: '',

    variantName: 'First',
    component: IndividualComponent as typeof SvelteComponent,
    variantsModule: {
      First: {
        name: 'Jim',
      },
    },

    darkMode: false,
    settings: null,
  },
}

export const Component_Without_Props: Variant<Component> = {
  data: {
    pagesStore: null,
    pages: null,

    page: null,
    pageKey: '',

    variantName: 'Second',
    component: IndividualComponent as typeof SvelteComponent,
    variantsModule: {
      Second: {},
    },

    darkMode: false,
    settings: null,
  },
}
