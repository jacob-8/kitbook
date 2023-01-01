import { Plugin } from 'vite';
import { MdsvexOptions } from 'mdsvex';
import { Config } from '@sveltejs/kit';

declare function kitbookPlugin({ routes, mdsvexConfig }?: {
    routes?: string;
    mdsvexConfig?: MdsvexOptions;
}): Plugin;

declare function augmentSvelteConfigForKitbook(config: Config, { kitbookOptions }?: {
    kitbookOptions?: Config;
}): Config;

declare const MDSVEX_EXTENSIONS: string[];

export { MDSVEX_EXTENSIONS, augmentSvelteConfigForKitbook, kitbookPlugin as kitbook };
