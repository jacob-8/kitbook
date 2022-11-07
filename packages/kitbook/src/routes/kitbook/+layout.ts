export { layoutLoad as load } from '$lib';

// Write your own load function if you want to customize file endings and/or directories to scan. See https://vitejs.dev/guide/features.html#glob-import for help writing glob imports.

// import type { LayoutLoad } from './$types';
// export const load: LayoutLoad = async ({ url }) => {
	// const modules = import.meta.glob(['/src/**/*.{md,svx,svelte,variants.ts}',]);
	// const modulesRaw = import.meta.glob(['/src/**/*.{md,svx,svelte,variants.ts}'], { as: 'raw' });

	// return {
	// 	modules,
	// 	modulesRaw,
	// };
// };
