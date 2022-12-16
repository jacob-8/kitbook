# KitBook 

Documentation and Prototyping Workbench Tool for Svelte built with SvelteKit that lets you rapidly build, document, and test components. Most similar to Svench, but also with goodies inspired by [others](/docs/9-why.md).

## Features
- File-based sidebar tree structure
  - Optional prefixed numbers adjust ordering of markdown docs
- Stories load via SSR first and then are hydrated on Client
- Iframe isolation for easy media query testing
- MDSvex (Markdown + Svelte Components) to enable easy documenation as you build
- Easy knobs allow for adjusting a component's state (special thanks to [@rixo](https://github.com/rixo)'s [Svench](https://svench-docs.vercel.app/))
- Quickly create and compare numerous variants of a component via an array of auto-typed prop objects in a colocated typescript file that can also be used for testing.
- No need for SvelteKit shims as it is a SvelteKit app - all special SvelteKit imports are automatically avaiable

## Start Documenting and Prototyping Components

[Get Started](/1-get-started) or view some [examples](/8-examples) (spoiler alert: you're looking at one already)
