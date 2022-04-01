# Svelte Pieces
https://svelte-pieces.vercel.app/

## Breaking Changes
**Notice**: This package doesn't follow semantic versioning rules (!!) in that I inadvertently published a version greater than 1.0 before finishing making all my breaking changes. I will try to document future breaking changes but use at your own risk until I remove this notice.

- Thus far the only breaking change is that Button.svelte's `form="primary"` attribute is now `form="filled"`.

To install components run `npm i -D svelte-pieces` or `pnpm add -D svelte-pieces`

## To update NPM package
Run `npm version patch` which will bump from 1.0.2 to 1.0.3 for example and then commit the changes, and push changes to GitHub which will automatically fire off an NPM publish

## To develop using Kitbook (like Storybook)
`pnpm dev`

## Potential Issues
If you import a a component from the index entrypoint like `import { Button } from 'svelte-pieces';` then you may have errors if some of the CJS dependencies of other unused components are not included in the Vite config like so `optimizeDeps.include: ['he']` Using a deep import like `import Button from 'svelte-pieces/ui/Button.svelte';` solves the problem, but do be aware of the optional [prebundlesveltelibraries](https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#prebundlesveltelibraries) flag in the `svelte.config.js` if that is ever needed. (learning how to use these components as a published package is still in progress)

### TODO
- solve non-breaking errors in Header.svelte
- publish @ld/components for MediaStream and Recorder, then bump version
- Add CKEditor?