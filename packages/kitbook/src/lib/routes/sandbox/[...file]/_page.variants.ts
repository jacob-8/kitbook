import type { Variants } from 'kitbook'
import type { SvelteComponent } from 'svelte'
import type Component from './+page.svelte'

import IndividualComponent from './mockComponents/IndividualComponent.svelte'

export const variants: Variants<Component> = [
  {
    name: 'Individual Story',
    description: 'If there is a params.id (story ID), find the corresponding module matching params.file from data.modules, pass props being pulled from the query params, and hide all other content outside that Story using CSS',
    props: {
      data: {
        variant: {
          props: { age: 42 },
        },
        variantIdx: '0',
        pageKey: '',
        editedProps: null,
        loadedModules: {
        },
        storyId: 'showMe',
        page: null,
        pages: null,
      },
    },
  },
  {
    name: 'Component Variant',
    description: 'if no storyId query param, find the module matching params.file from data.modules and pass props found in the query params',
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
        storyId: null,
        page: null,
        pages: null,
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
        storyId: null,
        page: null,
        pages: null,
      },
    },
  },
]
