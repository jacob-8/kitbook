import type { Variants } from 'kitbook';
import type Component from './+page.svelte';

import IndividualComponent from './mockComponents/IndividualComponent.svelte';
import StoryComponent from './mockComponents/StoryComponent.svx';

export const variants: Variants<typeof Component> = [
  {
    name: 'Individual Story',
    description: 'If there is a params.id (story ID), find the corresponding module matching params.file from data.modules, pass props being pulled from the query params, and hide all other content outside that Story using CSS',
    props: {
      data: {
        variant: {
          props: { age: 42 },
        },
        editedProps: null,
        loadedModules: {
          svx: StoryComponent,
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
        editedProps: null,
        loadedModules: {
          component: IndividualComponent,
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
        editedProps: null, // test that this is optional
        loadedModules: {
          component: IndividualComponent,
        },
        storyId: null,
        page: null,
        pages: null,
      },
    },
  },
]