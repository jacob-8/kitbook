import type { Variant } from 'kitbook'
import type { SvelteComponent } from 'svelte'
import type Component from './+page.svelte'

import IndividualComponent from './mockComponents/IndividualComponent.svelte'

export const variants: Variant<Component>[] = [
  {
    name: 'Component Variant',
    props: {
      data: {
        pagesStore: null,
        page: null,
        pageKey: '',

        variantIndex: '0',
        component: IndividualComponent as typeof SvelteComponent,
        variant: {
          props: { name: 'James' },
        },
        // editedProps: null,

        pages: null,
        settings: null,
        darkMode: false,
      },
    },
  },
  {
    name: 'Component Variant',
    description: 'without props',
    props: {
      data: {
        pagesStore: null,
        page: null,
        pageKey: '',

        variantIndex: '0',
        component: IndividualComponent as typeof SvelteComponent,
        variant: null,
        // editedProps: null, // test that this is optional

        pages: null,
        settings: null,
        darkMode: false,
      },
    },
  },
]
