# Add Component Variants

Example of a regular component variants file:

```ts title="Header.variants.ts"
import type { Variants } from 'kitbook';
import type Component from './Header.svelte';

export const variants: Variants<typeof Component> = [
  {
    name: 'active / desktop',
    description: 'Foo',
    width: 800,
    props: {
      activeURL: "/",
      githubURL: "/",
    },
    slots: [
      {
        content: 'My Workbench'
      }
    ],
  },
]
```

Example of a page variants file:

```ts title="_page.variants.ts"
import type { Variants } from 'kitbook';
import type Component from './+page.svelte';

export const variants: Variants<typeof Component> = [
  {
    name: 'First',
    description: 'Foo',
    props: {
      data: {
        // place data props here
      },
    },
  },
]
```