import type { Plugin } from 'vite';
import { type MdsvexOptions } from 'mdsvex';
export declare function kitbookPlugin({ routes, mdsvexConfig }?: {
    routes?: string;
    mdsvexConfig?: MdsvexOptions;
}): Plugin;
