export { combineModulesIntoPages, parseModules, type Modules } from './layout/pages';
export type { Variants } from './kitbook';

export { default as Layout } from './layout/Layout.svelte';
export { default as Story } from './stories/Story.svelte';

export { layoutLoad } from './kitbook-routes/+layout'
export { mainPageLoad } from './kitbook-routes/(main)/[...file]/+page'
export { sandboxPageLoad } from './kitbook-routes/sandbox/[...id]/+page'
