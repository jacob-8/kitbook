import type { Variant, VariantMeta } from 'kitbook'
import type Component from './Toast.svelte'

export const shared_meta: VariantMeta = {
  viewports: [
    { width: 500, height: 100 },
  ],
}

const shared = {
  duration_ms: 'hold',
  on_hide: () => console.info('hidden'),
} satisfies Partial<Variant<Component>>

export const Notice: Variant<Component> = {
  ...shared,
  message: 'Hello World',
}

export const Has_Action: Variant<Component> = {
  ...shared,
  message: 'Do Something',
  dismissable: true,
  on_click: () => console.info('clicked'),
}

export const Error: Variant<Component> = {
  ...shared,
  message: 'Error: Something went wrong',
  type: 'error',
}

export const Two_Seconds: Variant<Component> = {
  ...shared,
  duration_ms: 2000,
  message: 'I fire on_hide function after 2 seconds - see console log.',
}
