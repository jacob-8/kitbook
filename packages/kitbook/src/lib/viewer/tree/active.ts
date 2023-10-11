import { writable } from 'svelte/store'

export const selectedComponent = writable<ComponentFragment>()
export const hoveredComponent = writable<ComponentFragment>()

export const selectedElement = writable<SvelteElementDetail>()
export const hoveredElement = writable<SvelteElementDetail>()
