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
export const selected = writable<SvelteBlockDetail>()
export const hovered = writable<SvelteBlockDetail>(undefined)
export const root = writable<DebugNode[]>([])
