import { UserConfig, Plugin } from 'vite';
import { MdsvexOptions } from 'mdsvex';
import { Config } from '@sveltejs/kit';

declare function kitbookPlugin({ userSpecifiedViteConfigAdjustments, mdsvexConfig }?: {
    userSpecifiedViteConfigAdjustments?: UserConfig;
    mdsvexConfig?: MdsvexOptions;
}): Plugin;

declare function augmentSvelteConfigForKitbook(config: Config, kitbookOptions?: Config): Record<string, any>;

declare const MDSVEX_EXTENSIONS: string[];

export { MDSVEX_EXTENSIONS, augmentSvelteConfigForKitbook, kitbookPlugin as kitbook };
