import { writable } from 'svelte/store'
import type { GroupedPageMap } from 'kitbook'

export const pagesStore = writable<GroupedPageMap>({})
