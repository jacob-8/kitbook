export const MDSVEX_EXTENSIONS = ['.md', '.svx'];
export const AUGMENT_FUNCTION_TEXT = `import { augmentSvelteConfigForKitbook } from 'kitbook/plugins/vite'; 
export default augmentSvelteConfigForKitbook(config)`;

export const VIRTUAL_MODULES_IMPORT_ID = 'virtual:kitbook-modules';
export const RESOLVED_VIRTUAL_MODULES_IMPORT_ID = '\0' + VIRTUAL_MODULES_IMPORT_ID;

export const DEFAULT_IMPORT_MODULE_GLOBS = ['/src/**/*.{md,svx,svelte,variants.ts}', '/README.md'];
