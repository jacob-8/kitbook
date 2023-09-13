import type { LayoutLoad } from './$types';
import { layoutLoad } from 'kitbook';
import { pages } from 'virtual:kitbook-modules';
export const load = layoutLoad({ pages }) satisfies LayoutLoad;