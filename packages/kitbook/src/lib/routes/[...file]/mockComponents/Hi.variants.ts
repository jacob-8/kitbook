import type { Variant } from 'kitbook'
import type Component from './Hi.svelte'

export const variants: Variant<Component>[] = [
  {
    description: 'I will 500 error because I am a sandbox in a sandbox but I am just here to show the current language. Try changing the language in the sidebar and use the multi-select feature.',
    props: {},
    viewports: [
      { width: 400, height: 80 },
    ],
  },
]
