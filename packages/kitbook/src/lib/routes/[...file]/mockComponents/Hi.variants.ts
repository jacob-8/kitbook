import type { DeprecatedVariant } from 'kitbook'
import type Component from './Hi.svelte'

export const variants: DeprecatedVariant<Component>[] = [
  {
    description: 'I will have a variant for each language',
    props: {},
    viewports: [
      { width: 400, height: 80 },
    ],
  },
  {
    name: 'Single-language',
    description: 'I will just be the first current language since my languages prop is an empty array',
    languages: [],
    props: {},
    viewports: [
      { width: 400, height: 80 },
    ],
  },
]
