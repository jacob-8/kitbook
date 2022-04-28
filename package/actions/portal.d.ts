/**
 * Usage: `<div use:portal>` or `<div use:portal={'#direction'}>`, add `hidden` if SSR rendered (requires updating action with node.hidden = false and true)
 */
export declare function portal(node: HTMLElement, target?: string): {
    destroy(): void;
};
