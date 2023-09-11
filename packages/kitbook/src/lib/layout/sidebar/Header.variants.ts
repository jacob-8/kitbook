import type { Variants } from '$lib';
import type Component from './Header.svelte';

export const variants: Variants<Component> = [
  {
    // name: 'Not Expanded',
    props: {
      kitbookPath: '',
      activePath: "/foo",
    },
  },
  {
    name: 'active / desktop',
    width: 800,
    props: {
      kitbookPath: '',
      activePath: "/",
    },
  },
  {
    name: 'with slot',
    props: {
      kitbookPath: '',
      activePath: "/somewhere",
    },
    slots: [
      {
        content: 'My Workbench'
      }
    ]
  },
].map(variant => {
  return {
    width: 600,
    ...variant,
  }
})
