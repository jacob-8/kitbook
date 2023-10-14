import { layoutLoad } from 'kitbook'
import { pages } from 'virtual:kitbook-modules'
import type { LayoutLoad } from './$types'

export const load = layoutLoad({ pages }) satisfies LayoutLoad
