import type { Variant, VariantMeta } from 'kitbook'
import type Component from './Sidebar.svelte'

export const shared_meta: VariantMeta = {}

const shared = {
} satisfies Partial<Variant<Component>>

export const GIVE_ME_A_NAME: Variant<Component> = {
  ...shared,
  activePath: 'foo',
  folder: null,
  kitbookPath: '/foo',
  title: 'Give me a name',
  _meta: {
    description: 'This is a description',
  },
}
