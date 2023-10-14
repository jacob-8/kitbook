import { writable } from 'svelte/store'

export const selectedComponent = writable<ComponentWithChildren>()
export const hoveredComponent = writable<ComponentWithChildren>()

export const selectedElement = writable<SvelteElementDetail>()
export const hoveredElement = writable<SvelteElementDetail>()
