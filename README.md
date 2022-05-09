<p align="center">
<img src="packages/kitbook/static/kitbook.svg" height="80">
</p>

<p align="center">
Documentation and Prototyping Workbench Tool for SvelteKit apps built with SvelteKit.
<p>
<p align="center">
  <a href="https://www.npmjs.com/package/kitbook"><img src="https://img.shields.io/npm/v/kitbook?color=729B1B&label="></a>
<p>

<p align="center">
 <a href="https://kitbook.vercel.app/">View the Kitbook used to document and build Kitbook itself</a>
</p>

<br>

# Kitbook Features

- Route-based navigation
- MDSvex (Markdown + Svelte Components) to enable easy documenation as you build
- Easy knobs (thanks @rixo and Svench!)
- Quickly compare a single component with a variety of inputs
- TODO: Easily adjust screen size
- TODO: Scrollspy TOC
- TODO: Playwright visual regression testing

## Why?

While **[Svench](https://svench-docs.vercel.app/)**, **[Storybook](https://codingcat.dev/tutorial/integrating-storybook-with-sveltekit)**, and **[Vitebook](https://vitebook.dev/)** are each great tools, none work well for building a simple documentation and prototyping tool for [SvelteKit](https://kit.svelte.dev/) apps and component libraries. The reasons in brief:

- **Svench** often breaks on Windows, sometimes requiring the dev server to be started twice before success, and has other quirks that have left me without the ability to use my workbench. I attribute these problems simply due to the fact that 1.0 was built long before SvelteKit and while 2.0 will work great when it's polished, @rixo is waiting for SvelteKit to hit 1.0 before doing that as things are still in flux. *I can't wait for an undefined future date.*

- **Storybook**, even though it works with Vite now for better speed, it is still **way** too large and slow. Plus it's very buggy with SvelteKit still from my experience.

- **Vitebook** is what I thought was the missing answer and I was using it in Gitpod with much delight until I found it doesn't even work in Windows... While very extendable, I find it much better suited for documentation and not for prototyping.

- Additionally, none have a good solution to how to mock/shim SvelteKit imports like `import { browser } from "$app/env";`?

## The Solution
- Since all the roadblocks I've run into with each of these tools come from trying to use a tool that is outside of the SvelteKit box and which looks inside (Svench and Vitebook often struggle with the differences in how Windows handles file paths because neither developer uses a PC), the only guaranteed solution for a tool which keeps up with the pre-1.0 changes is to **use SvelteKit itself**! I will never have to shim SvelteKit imports, nor will I have issues with the API changing before 1.0.

## Examples
- [Kitbook's Kitbook](https://kitbook.vercel.app/)
- [Living Dictionaries Kitbook](https://ld-parts.vercel.app/)
- [Svelte Pieces](https://svelte-pieces.vercel.app/) (contained in this monorepo, see below)

# Svelte-Pieces
https://svelte-pieces.vercel.app/

<a href="https://www.npmjs.com/package/svelte-pieces"><img src="https://img.shields.io/npm/v/svelte-pieces?color=729B1B&label="></a>

To install components run `npm i -D svelte-pieces` or `pnpm add -D svelte-pieces`

## To update NPM package

Run `pnpm version patch` which will bump from 1.0.2 to 1.0.3 for example and then commit the changes, and push changes to GitHub which will automatically fire off an NPM publish

## To develop
- `pnpm i` and `pnpm dev`

## Potential Issues

If you import a a component from the index entrypoint like `import { Button } from 'svelte-pieces';` then you may have errors if some of the CJS dependencies of other unused components are not included in the Vite config like so `optimizeDeps.include: ['he']` Using a deep import like `import Button from 'svelte-pieces/ui/Button.svelte';` solves the problem, but do be aware of the optional [prebundlesveltelibraries](https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#prebundlesveltelibraries) flag in the `svelte.config.js` if that is ever needed. (learning how to use these components as a published package is still in progress)

### TODO

- solve non-breaking errors in Header.svelte
- publish @living-dictionaries/parts for MediaStream and Recorder, then bump version
