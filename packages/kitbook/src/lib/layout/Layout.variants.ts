import type { KitbookSettings, Variant } from 'kitbook'
import type Component from './Layout.svelte'
import { pages } from './mock-pages'

const settings: KitbookSettings = {
  githubURL: 'https://github.com',
  title: 'My Cool Kitbook',
  description: 'foo',
  expandTree: false,
  viewports: [
    { name: 'Mobile', width: 320, height: 568 },
    { name: 'Desktop', width: 1024, height: 768 },
  ],
  languages: [{ name: null, code: null }],
}

export const variants: Variant<Component>[] = [
  {
    name: 'Not Expanded',
    description: 'Only the active route will be expanded (since this is a Kitbook inside the Kitbook, it will be pulling the page to show from the parent Kitbook URL which renders a blank page if you click to other pages, it will break out of that variant and show a clone of the parent Kitbook)',
    props: {
      pages,
      pathname: '/foo',
      settings,
    },
  },
  {
    name: 'Expanded menu',
    props: {
      pages,
      pathname: '/foo',
      settings: {
        ...settings,
        expandTree: true,
      },
    },
  },
]
