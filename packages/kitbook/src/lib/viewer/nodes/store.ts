import { writable } from 'svelte/store'

export const visibility = writable<{ [key: string]: boolean }>({
  component: true,
  element: true,
  block: true,
  iteration: true,
  slot: true,
  text: true,
  anchor: false,
})

type DebugNode = Omit<SvelteBlockDetail, 'parent' | 'children'> & {
  invalidate(): void
  expanded: boolean

  tagName: string
  parent: DebugNode
  children: DebugNode[]
  dom?: HTMLLIElement
}

export const root = writable<DebugNode[]>([])

export const selected = writable<SvelteBlockDetail>()
export const hovered = writable<SvelteBlockDetail>()

export const selectedElement = writable<SvelteHTMLElement>()
export const hoveredElement = writable<SvelteHTMLElement>()
