import type { Variant, VariantMeta } from 'kitbook'
import type Component from './ConnectToTools.svelte'

export const shared_meta: VariantMeta = {
  viewports: [
    { width: 500, height: 200 },
  ],
  ssr: false,
}

const shared = {
  width: 600,
  height: 400,
  toolsRoute: '/tools',
} satisfies Partial<Variant<Component>>

const svelteElement = {
  __svelte_meta: {
    loc: {
      file: 'src/lib/Foo.svelte',
      char: 1,
      line: 1,
      column: 1,
    },
  },
} as SvelteElementDetail

export const First: Variant<Component> = {
  ...shared,
  openToolsIn: 'popup',
  selectedComponent: {
    componentDetail: {
      tagName: 'Foo',
      options: {
        props: {
          baz: 'bar',
        },
      },
      // @ts-expect-error - not mocking rest of component
      component: {
        $capture_state: () => ({
          baz: 'changed',
          local: 'this is not a prop',
        }),
      },
      id: 'create_fragment',
    },
    childComponents: null,
    childElements: new Set([svelteElement]),
  },
}
