import type { PageStory, StoryMeta } from 'kitbook'
import type Component from './+page.svelte'

export const shared_meta: StoryMeta = {
  viewports: [
    { width: 500, height: 100 },
  ],
}

const shared_props = {
  page_key: 'foo/A',
  parsed_module_sets: {},
} satisfies Partial<PageStory<typeof Component>['props']>

export const First: PageStory<typeof Component> = {
  props: {
    ...shared_props,
  },
}

export const Another: PageStory<typeof Component> = {
  props: {
    ...shared_props,
  },
}
