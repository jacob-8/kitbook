# KitBook 

A documentation/prototyping workbook for SvelteKit that lets you create components using **Documentation Driven Development** (DDD).

## Why?

**[Svench](https://svench-docs.vercel.app/)**, **[Storybook](https://codingcat.dev/tutorial/integrating-storybook-with-sveltekit)**, and **[Vitebook](https://vitebook.dev/)** fail to meet my needs. While each is built by people much smarter than I, none work well for building a simple documentation and prototyping tool for [SvelteKit](https://kit.svelte.dev/) apps and component libraries. The reasons in brief:

- **Svench** often breaks on Windows, sometimes requires me to try starting the dev server twice before success, and has other quirks that have left me without the ability to use my workbench. I attribute these problems simply due to the fact that 1.0 was built long before SvelteKit and while 2.0 will work great when it's polished, @rixo is waiting for SvelteKit to hit 1.0 before doing that as things are still in flux. *I can't wait for an undefined future date.*

- **Storybook**, even though it works with Vite now for better  speed, is too **bloated** and still too slow. Plus it's very buggy with SvelteKit still from my experience.

- **Vitebook** is great but currently doesn't deploy to Vercel and doesn't work in Windows...

- Additionally, because they all originate outside of SvelteKit, many often wonder how to mock/shim SvelteKit imports like `import { browser } from "$app/env";`?

## The Solution
- Since all the roadblocks I've run into with each of these tools come from trying to use a tool that is **outside** of the SvelteKit box look inwards (Svench and Vitebook often struggle with the differences in how Windows handles file paths because neither developer uses a PC), the only guaranteed solution for a tool which keeps up with the pre-1.0 changes is to **use SvelteKit itself**! I will never have to shim SvelteKit imports, nor will I have issues with the API changes that come on the road to 1.0.

## Features
Mix-and-match: All are optional, depending on what you're looking for. Here's what I've built and documented:
- Route-based navigation, automatically displayed in a sidebar and can be ordered by `[#]` file-name prefixes.
- [MDSvex](https://mdsvex.pngwn.io/) (Markdown + Svelte Components) to enable easy documenation as you build
- Easy knobs (thanks @rixo and Svench!)
- Easily adjust screen size
- Quickly compare a single component with a variety of inputs
- Scrollspy TOC
- Visual regression testing (Playwright or Viteshot)

[Get Started >>](./%5B1%5Dget-started)