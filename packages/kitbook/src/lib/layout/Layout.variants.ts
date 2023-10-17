import type { KitbookSettings, Variant } from 'kitbook'
import type Component from './Layout.svelte'

const settings: KitbookSettings = {
  githubURL: 'https://github.com',
  title: 'My Cool Kitbook',
  description: 'foo',
  expandTree: false,
  viewports: [
    { name: 'Mobile', width: 320, height: 568 },
    { name: 'Desktop', width: 1024, height: 768 },
  ],
}

export const variants: Variant<Component>[] = [
  {
    name: 'Not Expanded',
    description: 'Only the active route will be expanded (since this is a Kitbook inside the Kitbook, it will be pulling the page to show from the parent Kitbook URL which renders a blank page if you click to other pages, it will break out of that variant and show a clone of the parent Kitbook)',
    contexts: [
      {
        key: 'kitbook-settings',
        context: settings,
      },
    ],
  },
  {
    name: 'Expanded menu',
    contexts: [
      {
        key: 'kitbook-settings',
        context: { ...settings, expandTree: true },
      },
    ],
  },
]
