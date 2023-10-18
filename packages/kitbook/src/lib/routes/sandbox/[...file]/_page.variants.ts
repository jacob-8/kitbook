import type { Variant } from 'kitbook'
import type { SvelteComponent } from 'svelte'
import type Component from './+page.svelte'

import IndividualComponent from './mockComponents/IndividualComponent.svelte'

export const variants: Variant<Component>[] = [
  {
    name: 'Component Variant',
    props: {
      data: {
        variant: {
          props: { name: 'James' },
        },
        variantIdx: '0',
        pageKey: '',
        editedProps: null,
        loadedModules: {
        },
        page: null,
        pages: null,
        settings: null,
        pagesStore: null,
      },
    },
  },
  {
    name: 'Component Variant',
    description: 'without props',
    props: {
      data: {
        variant: null,
        variantIdx: 0,
        pageKey: '',
        editedProps: null, // test that this is optional
        loadedModules: {
          component: IndividualComponent as typeof SvelteComponent,
        },
        page: null,
        pages: null,
        settings: null,
        pagesStore: null,
      },
    },
  },
]
