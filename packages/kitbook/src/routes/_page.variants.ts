import type { Variants } from '$lib';
import type Page from './+page.svelte';

export const variants: Variants<typeof Page> = [
  {
    name: 'First',
    props: {
      data: {
        name: 'Jim'
      },
    },
  },
  {
    name: 'Second',
    props: {
      data: {
        name: 'James'
      },
    },
  }
]