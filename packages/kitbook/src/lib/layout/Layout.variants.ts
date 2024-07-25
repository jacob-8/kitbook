import type { Variant, VariantMeta } from 'kitbook'
import type Component from './Layout.svelte'
import { pages } from './mock-pages'

export const shared_meta: VariantMeta = {}

const shared = {
  pages,
  kitbookPath: '/',
  activePath: '/foo',
  settings: {
    githubURL: 'https://github.com',
    title: 'My Cool Kitbook',
    description: 'foo',
    viewports: [
      { name: 'Mobile', width: 320, height: 568 },
      { name: 'Desktop', width: 1024, height: 768 },
    ],
    // languages: [{ name: null, code: null }],
  },
} satisfies Partial<Variant<Component>>

export const Expanded_Menu: Variant<Component> = {
  ...shared,
  // pathname: '/foo',
  settings: {
    ...shared.settings,
    expandTree: true,
  },
  _meta: {
    description: 'All routes will be expanded in the tree view',
  },
}

export const Not_Expanded: Variant<Component> = {
  ...shared,
  // pathname: '/foo',
  _meta: {
    description: 'Only the active route will be expanded (since this is a Kitbook inside the Kitbook, it will be pulling the page to show from the parent Kitbook URL which renders a blank page if you click to other pages, it will break out of that variant and show a clone of the parent Kitbook)',
  },
}
