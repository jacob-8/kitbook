import { UserConfig, Plugin } from 'vite';
import { MdsvexOptions } from 'mdsvex';
import { Config } from '@sveltejs/kit';

/**
 * Creates a Vite plugin that enables Kitbook mode for SvelteKit projects.
 * @param {string[]} [options.fileGlobs] - An array of Vite glob patterns for building your Kitbook. See https://vitejs.dev/guide/features.html#multiple-patterns. Defaults to ['/src/**_/*.{md,svx,svelte,variants.ts}', '/README.md']. Adjust this to be able to incrementally adopt Kitbook into your project. << ignore the underscore in the glob pattern, it's just there to make the JSDoc comment work.
 * @param {UserConfig} [options.viteConfigAdjustments] - Adjust the Vite Config when running Kitbook. Useful for changing settings like the port that you don't want changed in your regular app.
 * @param {MdsvexOptions} [options.mdsvexConfig] - Override the default Kitbook MdsvexConfig with your own.
*/
declare function kitbookPlugin({ fileGlobs: importModuleGlobs, viteConfigAdjustments, mdsvexConfig }?: {
    fileGlobs?: string[];
    viteConfigAdjustments?: UserConfig;
    mdsvexConfig?: MdsvexOptions;
}): Plugin;

declare function augmentSvelteConfigForKitbook(config: Config, kitbookOptions?: Config): Record<string, any>;

declare const MDSVEX_EXTENSIONS: string[];

export { MDSVEX_EXTENSIONS, augmentSvelteConfigForKitbook, kitbookPlugin as kitbook };
