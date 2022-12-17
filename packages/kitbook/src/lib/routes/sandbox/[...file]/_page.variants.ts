import type { Variants } from 'kitbook';
import type Page from './+page.svelte';
import IndividualComponent from './IndividualComponent.svelte';
import StoryComponent from './StoryComponent.svx';

export const variants: Variants<typeof Page> = [
  {
    name: 'Individual Story',
    description: 'If there is a params.id (story ID), find the corresponding module matching params.file from data.modules, pass props being pulled from the query params, and hide all other content outside that Story using CSS',
    props: {
      data: {
        props: { age: 42 },
        loadedModules: {
          svx: StoryComponent,
        },
        storyId: 'showMe',
        page: null,
        pages: null,
        contexts: [],
      },
    },
  },
  {
    name: 'Component Variant',
    description: 'if no storyId query param, find the module matching params.file from data.modules and pass props found in the query params',
    props: {
      data: {
        props: { name: 'James' },
        loadedModules: {
          component: IndividualComponent,
        },
        storyId: null,
        page: null,
        pages: null,
        contexts: [],
      },
    },
  },
  {
    name: 'Component Variant',
    description: 'without props',
    props: {
      data: {
        props: null,
        loadedModules: {
          component: IndividualComponent,
        },
        storyId: null,
        page: null,
        pages: null,
        contexts: null, // test that this is optional
      },
    },
  },
]