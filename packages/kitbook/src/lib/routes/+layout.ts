import type { LayoutLoad } from './$types';
import { layoutLoad } from '../layout/layoutLoad';
// @ts-expect-error virtual module
import { pages, initFunction } from 'virtual:kitbook-modules';
export const load = layoutLoad({ pages, initFunction }) satisfies LayoutLoad;