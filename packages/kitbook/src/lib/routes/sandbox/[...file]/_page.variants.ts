import type { Variant } from 'kitbook'
import type { SvelteComponent } from 'svelte'
import type Component from './+page.svelte'
import IndividualComponent from './mockComponents/IndividualComponent.svelte'

const shared_data = {
  pagesStore: null,
  pages: null,

  page: null,
  pageKey: '',

  canMount: true,
  darkMode: false,
  settings: null,
  rpc_client: null,
} satisfies Partial<Variant<Component>['data']>

export const Component_With_Props: Variant<Component> = {
  data: {
    ...shared_data,
    variantName: 'First',
    component: IndividualComponent as typeof SvelteComponent,
    variantsModule: {
      First: {
        name: 'Jim',
      },
    },
  },
}

export const Component_Without_Props: Variant<Component> = {
  data: {
    ...shared_data,
    variantName: 'Second',
    component: IndividualComponent as typeof SvelteComponent,
    variantsModule: {
      Second: {},
    },
  },
}
