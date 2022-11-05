export { layoutLoad as load } from '$lib';

// Write your own load function if you want to customize file endings and/or directories to scan. See https://vitejs.dev/guide/features.html#glob-import for help writing glob imports.

// import type { LayoutLoad } from './$types';
// export const load: LayoutLoad = async ({ url }) => {
// const svxModules = import.meta.glob('/src/**/*.{md,svx}');
// const svxModulesRaw = import.meta.glob('/src/**/*.{md,svx}', { as: 'raw' });

  
//     // Kitbook automatically creates a default story for all non page/layout svelte files
// const componentModules = import.meta.glob(['/src/**/*.svelte', '!/**/*+**.svelte']);
// const componentModulesRaw = import.meta.glob(['/src/**/*.svelte', '!/**/*+**.svelte'], { as: 'raw' });

//     console.log({url})

//     return {
//         modules: { svxModules, svxModulesRaw, componentModules, componentModulesRaw, url }
//     };
// };
