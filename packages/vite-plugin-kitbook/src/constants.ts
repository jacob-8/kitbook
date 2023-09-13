export const MDSVEX_EXTENSIONS = ['.md', '.svx'];

export const VIRTUAL_MODULES_IMPORT_ID = 'virtual:kitbook-modules';
export const RESOLVED_VIRTUAL_MODULES_IMPORT_ID = '\0' + VIRTUAL_MODULES_IMPORT_ID;

export const DEFAULT_IMPORT_MODULE_GLOBS = ['/src/**/*.{md,svx,svelte,variants.ts}', '/README.md'];

export const VIRTUAL_SETTINGS_IMPORT_ID = 'virtual:kitbook-settings';
export const RESOLVED_VIRTUAL_SETTINGS_IMPORT_ID = '\0' + VIRTUAL_SETTINGS_IMPORT_ID;

export const DEFAULT_VIEWPORTS = [
  {name: 'mobile', width: 320, height: 568},
  // {name: 'tablet', width: 768, height: 1024},
  {name: 'desktop', width: 1024, height: 768},
]
