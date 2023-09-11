import { layoutLoad } from 'kitbook';
// @ts-expect-error virtual module
import { pages } from 'virtual:kitbook-modules';
export const load = layoutLoad({ pages });
