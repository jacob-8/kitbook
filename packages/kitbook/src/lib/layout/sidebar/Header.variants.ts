import type { Variants } from '$lib';
import type Component from './Header.svelte';

export const variants: Variants<typeof Component> = [
  {
    // name: 'Not Expanded',
    props: {
      activeURL: "/foo",
    },
  },
  {
    name: 'active / desktop',
    width: 800,
    props: {
      activeURL: "/",
      githubURL: "/",
    },
  },
  {
    name: 'with slot',
    props: {
      activeURL: "/Somewhere",
    },
    slots: [
      {
        content: 'My Workbench'
      }
    ]
  },
]
