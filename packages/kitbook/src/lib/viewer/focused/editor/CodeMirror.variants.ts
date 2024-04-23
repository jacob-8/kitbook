import type { Variant, VariantMeta } from 'kitbook'
import type Component from './CodeMirror.svelte'

export const shared_meta: VariantMeta = {
  viewports: [
    { width: 700, height: 200 },
  ],
  ssr: false,
}

const shared = {
  on_change: (value: string) => console.info({ value }),
  tsCodeForTypes: `type Props = {
  someNumber: number
  fruit: 'apple' | 'banana'
}`,
} satisfies Partial<Variant<Component>>

export const Typescript: Variant<Component> = {
  ...shared,
  value: `const props: Props = {
  someNumber: 2,
  fruit: 'apple',
}
`,
}

export const Typescript_Error: Variant<Component> = {
  ...shared,
  value: `const props: Props = {
  someNumber: 5,
}
`,
  // _meta: {
  // description: 'Errors because of missing fruit prop.',
  // },
}
