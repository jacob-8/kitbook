import type { Variant } from 'kitbook'
import type Component from './Hi.svelte'

export const All_Languages: Variant<Component> = {
  _meta: {
    description: 'I will have a variant for each language',
    viewports: [
      { width: 400, height: 80 },
    ],
  },
}

export const Single_Language: Variant<Component> = {
  _meta: {
    description: 'I will just be the first current language since my languages prop is an empty array',
    languages: [],
    viewports: [
      { width: 400, height: 80 },
    ],
  },
}
