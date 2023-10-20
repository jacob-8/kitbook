// @ts-ignore - virtual import
import { pages, settings } from 'virtual:kitbook'
import { layoutLoad } from 'kitbook'
import type { LayoutLoad } from './$types'

export const load = layoutLoad({ pages, settings }) satisfies LayoutLoad
