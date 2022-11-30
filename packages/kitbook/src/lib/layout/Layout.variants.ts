import type { Variants } from '$lib';
import type Layout from './Layout.svelte';

// TODO: Use props array to automatically create variant stories for a particular Svelte file
export const variants: Variants<typeof Layout> = [
  {
    name: 'Not Expanded',
    description: 'This is a sample description',
    props: {
      expanded: false,
      githubURL: 'https://github.com',
      title: 'My Cool Kitbook'
    },
  },
  {
    name: 'Expanded',
    props: {
      expanded: true,
      githubURL: 'https://github.com',
      title: 'My Other Kitbook'
    },
  },
]
