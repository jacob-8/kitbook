import type { Variant } from 'kitbook'
import type Component from './Template.svelte'

export const variants: Variant<Component>[] = [
  {
    name: 'Situation A',
    description: 'Add optional information about this variant',
    props: {},
    viewports: [
      { name: 'Desktop', width: 800, height: 600 },
    ],
    // contexts: [
    //   {
    //     key: 'settings',
    //     context: { foo: 'baz' },
    //   },
    // ],
    // slots: {
    //   default: 'My Workbench', // can pass a string or a Svelte component - presently we can only mock the default slot and not named slots until Svelte supports dynamically named slots since Kitbook needs to have the dynamically named slots feature to be able to mock named slots
    // },
  },
]

// Tip: This is just a TypeScript file so you can be as creative as you want with the variants array using mock data imports, .map(), etc, to quickly create variants. If you have multiple different views that display the same data then each variants.ts file can import the same mock data to test all your views against the same use cases.
