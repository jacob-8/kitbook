import type { Variants, Viewport } from 'kitbook'
import type Component from './SearchResult.svelte'

export const viewports: Viewport[] = [
  {
    name: 'mobile',
    width: 320,
    height: 100,
  },
  {
    name: 'tablet',
    width: 768,
    height: 100,
  },
]

export const variants: Variant<Component>[] = [
  {
    name: 'README',
    props: {
      page: {
        extensions: [
          'md',
        ],
        name: 'README',
        path: '/README.md',
        url: '/README',
      },
    },
  },
  {
    name: 'README (active)',
    props: {
      page: {
        extensions: [
          'md',
        ],
        name: 'README',
        path: '/README.md',
        url: '/README',
      },
      active: true,
    },
  },
  {
    name: 'doc (active)',
    props: {
      page: {
        extensions: [
          'md',
        ],
        name: 'why kitbook',
        path: '/src/docs/0-why-kitbook.md',
        url: '/docs/0-why-kitbook',
      },
      active: true,
    },
  },
  {
    name: 'component with story and variants',
    props: {
      page: {
        extensions: [
          'svelte',
          'md',
          'variants.ts',
        ],
        name: 'Button',
        path: '/src/lib/a/Button.svelte',
        url: '/lib/a/Button',
      },
    },
  },
]
