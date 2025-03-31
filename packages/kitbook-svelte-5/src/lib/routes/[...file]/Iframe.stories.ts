import type { Story, StoryMeta } from 'kitbook'
import type Component from './Iframe.svelte'

export const shared_meta: StoryMeta = {
  viewports: [
    { width: 500, height: 100 },
  ],
}

const shared_props = {
  src: 'https://kitbook.dev',
} satisfies Partial<Story<typeof Component>['props']>

export const First: Story<typeof Component> = {
  props: {
    ...shared_props,
    block_scripts: true,
  },
}

export const Another: Story<typeof Component> = {
  props: {
    ...shared_props,
  },
}
