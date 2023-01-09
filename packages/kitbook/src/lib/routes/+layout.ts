import type { LayoutLoad } from './$types';
import { layoutLoad } from 'kitbook';
import { pages } from './moduleImports';
export const load = layoutLoad({ pages }) satisfies LayoutLoad;