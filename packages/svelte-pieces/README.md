# Svelte-Pieces
<a href="https://www.npmjs.com/package/svelte-pieces"><img src="https://img.shields.io/npm/v/svelte-pieces?color=729B1B&label="></a>

[Read the Documentation and try out the components using Kitbook](https://svelte-pieces.vercel.app/) 

## Usage

- Install: `npm i -D svelte-pieces` or `pnpm add -D svelte-pieces`
- Import desired component, e.g. `import Button from 'svelte-pieces/ui/Button.svelte';`

## Contributing
- Start by running `pnpm i`, then `pnpm dev` - feel free to submit a pull request, though I advise creating an issue first to discuss your addition.

## Potential Import Issue

If you import a a component from the index entrypoint like `import { Button } from 'svelte-pieces';` then you may have errors if some of the CJS dependencies of other unused components are not included in the Vite config like so `optimizeDeps.include: ['he']` Using a deep import like `import Button from 'svelte-pieces/ui/Button.svelte';` solves the problem, but do be aware of the optional [prebundlesveltelibraries](https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#prebundlesveltelibraries) flag in the `svelte.config.js` if that is ever needed. (learning how to use these components as a published package is still in progress)
