<p align="center">
<img src="https://raw.githubusercontent.com/jacob-8/kitbook/b96f77da81309a6ccd06693beb0f06ba8fdc0a2b/packages/kitbook/static/kitbook.svg" height="80" style="padding: 20px; 0">
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

# Kitbook Features

- Route-based navigation
- MDSvex (Markdown + Svelte Components) to enable easy documenation as you build
- Easy knobs (thanks @rixo and Svench!)
- Quickly compare a single component with a variety of inputs

## Why?

While **[Svench](https://svench-docs.vercel.app/)**, **[Storybook](https://codingcat.dev/tutorial/integrating-storybook-with-sveltekit)**, and **[Vitebook](https://vitebook.dev/)** are each great tools, none work well for building a simple documentation and prototyping tool for [SvelteKit](https://kit.svelte.dev/) apps and component libraries. The reasons in brief:

- **Svench** often breaks on Windows, sometimes requiring the dev server to be started twice before success, and has other quirks that have left me without the ability to use my workbench. I attribute these problems simply due to the fact that 1.0 was built long before SvelteKit and while 2.0 will work great when it's polished, @rixo is waiting for SvelteKit to hit 1.0 before doing that as things are still in flux. *I can't wait for an undefined future date.*

- **Storybook**, even though it works with Vite now for better speed, it is still **way** too large and slow. Plus it's very buggy with SvelteKit still from my experience.

- **Vitebook** is what I thought was the missing answer and I was using it in Gitpod with much delight until I found it doesn't even work in Windows... While very extendable, I find it much better suited for documentation and not for prototyping.

- Additionally, none have a good solution to how to mock/shim SvelteKit imports like `import { browser } from "$app/env";`?

## The Solution
- Since all the roadblocks I've run into with each of these tools come from trying to use a tool that is outside of the SvelteKit box and which looks inside (Svench and Vitebook often struggle with the differences in how Windows handles file paths because neither developer uses a PC), the only guaranteed solution for a tool which keeps up with the pre-1.0 changes is to **use SvelteKit itself**! I will never have to shim SvelteKit imports, nor will I have issues with the API changing before 1.0.

## Examples

| Example | Source | Playground |
| ------- | ------ | ---------- |
| [Kitbook's Kitbook](https://kitbook.vercel.app/)  | [GitHub](https://github.com/jacob-8/kitbook/tree/main/packages/kitbook)  | [Play Online](https://stackblitz.com/github/jacob-8/kitbook/tree/main/packages/kitbook) |
| [Svelte Pieces' Kitbook](https://svelte-pieces.vercel.app/) (also in this repo)  | [GitHub](https://github.com/jacob-8/kitbook/tree/main/packages/svelte-pieces)  | [Play Online](https://stackblitz.com/github/jacob-8/kitbook/tree/main/packages/svelte-pieces) |
| [Living Dictionaries' Kitbook](https://ld-parts.vercel.app/)  | [GitHub](https://github.com/livingtongues/living-dictionaries/tree/main/packages/parts)  | [Play Online](https://stackblitz.com/github/livingtongues/living-dictionaries/tree/main/packages/parts) |

## TODO

- Easily adjust screen size
- Scrollspy TOC
- Playwright visual regression testing
- Bake prism css into Layout w/ optional flag (currently in app.html)
- Dark mode

## Contributing

Contributions are welcome! After cloning down monorepo, with pnpm installed on your machine, run `pnpm i` and `pnpm dev` to get started.