# Svelte Pieces
To install components run `npm i -D svelte-pieces`

## To update NPM package
Run `npm version patch` which will bump from 1.0.2 to 1.0.3 for example and then commit the changes, and push changes to GitHub which will automatically fire off an NPM publish

## To develop using Svench (like Storybook)
Run `npx svench` - note that sometimes you have to run `npx svench` a couple times before it will fire up (bug). Do note that if it just hangs with no luck after multiple tries, then you have induced a syntax error. It won't tell you about the error but if you undo your changes and things fire up then you just have to dig in and find the error.

## Preview
Run `npx svench build` and `npx sirv-cli /.svench/build` to preview locally or view at https://svelte-ui-three.vercel.app/

## Potential Issues
If you import a a component from the index entrypoint like `import { Button } from 'svelte-pieces/ui/Button.svelte';` then you may have errors if some of the CJS dependencies of other unused components are not included in the Vite config like so `optimizeDeps.include: ['he']` Using a deep import like `import Button from 'svelte-pieces/ui/Button.svelte';` solves the problem but do be aware of the optional [prebundlesveltelibraries](https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#prebundlesveltelibraries) flag in the `svelte.config.js` if that is ever needed. (learning how to use these components as a published package is still in progress)

### TODO
- Add CKEditor
- upgrade Tailwind and don't make components have to depend on Tailwind