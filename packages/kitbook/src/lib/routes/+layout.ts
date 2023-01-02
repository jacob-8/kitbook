import type { LayoutLoad } from './$types';
import { layoutLoad } from 'kitbook';
export const load = layoutLoad() satisfies LayoutLoad;