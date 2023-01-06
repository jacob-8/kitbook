import type { Variants } from 'kitbook';
import type Component from './SearchResult.svelte';
export const variants: Variants<typeof Component> = [
  {
    name: 'README',
    height: 100,
    props: {
      page: {
        "extensions": [
          "md",
        ],
        "loadSvx": {
          "loadModule": null,
        },
        "name": "README",
        "path": "/README.md",
        "url": "/README",
      }
    },
  },
  {
    name: 'README (active)',
    height: 100,
    props: {
      page: {
        "extensions": [
          "md",
        ],
        "loadSvx": {
          "loadModule": null,
        },
        "name": "README",
        "path": "/README.md",
        "url": "/README",
      },
      active: true,
    },
  },
  {
    name: 'doc (active)',
    height: 100,
    props: {
      page: {
        "extensions": [
          "md",
        ],
        "loadSvx": {
          "loadModule": null,
        },
        "name": "why kitbook",
        "path": "/src/docs/0-why-kitbook.md",
        "url": "/docs/0-why-kitbook",
      },
      active: true,
    },
  },
  {
    name: 'component with story and variants',
    height: 100,
    props: {
      page: {
        "extensions": [
          "svelte",
          "md",
          "variants.ts",
        ],
        "loadComponent": {
          "loadModule": null,
        },
        "loadSvx": {
          "loadModule": null,
        },
        "loadVariants": {
          "loadModule": null,
        },
        "name": "Button",
        "path": "/src/lib/a/Button.svelte",
        "url": "/lib/a/Button",
      },
    },
  },
]