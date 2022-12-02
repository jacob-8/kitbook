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
        component: StoryComponent,
        storyId: 'showMe',
        modules: null,
        modulesRaw: null,
        pages: null,
      },
    },
  },
  {
    name: 'Component Variant',
    description: 'if no storyId query param, find the module matching params.file from data.modules and pass props found in the query params',
    props: {
      data: {
        props: { name: 'James' },
        component: IndividualComponent,
        storyId: null,
        modules: null,
        modulesRaw: null,
        pages: null,
      },
    },
  },
  {
    name: 'Component Variant',
    description: 'without props',
    props: {
      data: {
        props: null,
        component: IndividualComponent,
        storyId: null,
        modules: null,
        modulesRaw: null,
        pages: null,
      },
    },
  },
]