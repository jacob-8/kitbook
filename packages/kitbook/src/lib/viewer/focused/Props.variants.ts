import type { DeepPartial, Variant, VariantMeta } from 'kitbook'
import type Component from './Props.svelte'

export const shared_meta: VariantMeta = {
  viewports: [
    { width: 500, height: 200 },
  ],
}

const shared = {
  resizeTo: (width, height) => console.info({ width, height }),
} satisfies Partial<Variant<Component>>

export const First: DeepPartial<Variant<Component>> = {
  ...shared,
  selectedComponent: {
    componentDetail: {
      options: {
        props: {
          greeting: 'hi - but I will not show as state wins',
          number: 2,
          func: (value: string) => value.toUpperCase(),
          notInCurrentState: 'will not be included',
        },
      },
      component: {
        $capture_state: () => ({
          greeting: 'hello',
          number: 2,
          func: (value: string) => value.toUpperCase(),
          notAProp: 'will not be included',
        }),
        $set(props: Record<string, any>) {
          console.info({ props })
        },
      },
    },
  },
}
