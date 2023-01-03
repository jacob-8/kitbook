/**
 * `initFunction` is an optional async function that will be called before the layout is loaded. This is useful for things like setting up i18n before loading your Kitbook.
 *
 * The default modules glob import used by Kitbook is this
 * ```js
 * const modules = import.meta.glob(['/src/**\/*.{md,svx,svelte,variants.ts}', '/README.md']);
 * ```
 * `{md,svx}` = Kitbook Story Files
 *
 * `{svelte,variants.ts}` = Automatically create a default Story for each component w/ variants automatically being populated by colocated files `*.variants.ts` files (Foo.svelte and Foo.variants.ts; +page.svelte and _page.variants.ts)
 *
 * Presently Kitbook supported extensions are customizable but it wouldn't be too hard to support custom extensions if a strong case can be made for why it's needed. If that happens then you can run that `import.meta.glob` function seen above with your custom glob import and pass it into the `modules` parameter of this function. In that case you can see https://vitejs.dev/guide/features.html#glob-import for help writing glob imports if needed.
 */
export declare function layoutLoad({ initFunction, modules }?: {
    initFunction?: () => Promise<void>;
    modules?: Record<string, () => Promise<unknown>>;
}): () => Promise<{
    pages: import("..").GroupedPageMap;
}>;
