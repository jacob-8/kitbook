// @ts-ignore - virtual import
import { pages, settings, variantsTemplate } from 'virtual:kitbook'
import { layoutLoad } from 'kitbook'
import type { LayoutLoad } from './$types'

export const load = layoutLoad({ pages, settings, variantsTemplate }) satisfies LayoutLoad
