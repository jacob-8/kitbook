# Roadmap

The API is stable and the project is in **beta**. You can use this in production if you are not bothered by some bugs relating to the UI and features that have not yet been finished. There are important features missing, but it's good enough to be incredibly helpful.

**Please feel free to [create an issue](https://github.com/jacob-8/kitbook/issues/new) and discuss what you may be able to contribute!**

## Currently working on
- Update all examples to latest api

## Planned Features (or improvements to half-baked features)

- create variant from current state
- Viewer displays compositions
- show source code for each component using code editor
- analyze component for props using svelte2tsx
- customizable templates
- Use module graph to allow easy jumping up and down the graph tree easily from component to related component
- update templates to detect props
- html snapshot regression via Vitest+happydom which stores baseline and comparisons in a single file in the static folder on build
- snapshot compositions also
- Add full-screen focus view for sandbox
- Next and Previous pages (Docusaurus/Vitepress style)
- save selected languages in URL for easy sharing
- Orama search index for full-text search; can also learn from https://github.com/sveltejs/kit/blob/master/sites/kit.svelte.dev/src/lib/search/search.js
- more keyboard shortcuts, https://zendeskgarden.github.io/react-components/index.html?path=/story/packages-avatars-readme--page
- [admonitions](https://docusaurus.io/docs/markdown-features/admonitions)
- display meta tags of iframe when rendering +page.svelte components
- optional Stackblitz/Codeflow/Gitpod links
- backlinks/connections graph (see Foam examples)

## Rough edges 

- enlarge menu items on mobile
- make Typescript just a peerdependency
- Viewer doesn't work in Stackblitz
- Improve Main Page buttons on small screens
- order variants by order written in file, not alphabetical
- handle Viewer for users not able to use the bleeding edge Document Picture-in-Picture, Chrome only feature
- Viewer displays page variants (adjust file title)
- Double-check the add page variants component reference is _ and not + in all locations
- on build don't show folders that have no components with Kitbook files 
- document how to adjust glob to be able to gradually include components
- fix ViewBody width on small screens overflowing region by about 25px
- Get file location from Vite module graph from component tagName when it has no elements so that Kitbook can know which Svelte file to create variants, compositions, and markdowns for.
- throw error if setting both csr and ssr to false
- show compositions in viewer
- hide jump to vscode buttons when not in dev using check for import.meta.hot
- responsive iframes shrink to keep interior resolution
- keep sidebar active page in view
  - menu item should be expanded when linked to (currently not visible if parent folder was manually closed and then it was jumped to via a wikilink)
- shouldn't crash upon finding oddly placed file like `/src/+layout.svelte` or `src/ind.md`
- Scrollspy TOC in sidebar (maybe client-side only for setup simplicity) - look at svelte-put toc and https://beartocode.github.io/carta/introduction
- accept whichever w/h dimension is given last either via resize or by prompt
- distinguish between Index and README in search if both exist
- fix shiki-twoslash highlight not scrolling on small screens by learning from https://histoire.dev/guide/svelte3/controls.html
- catch when a variants file exists by itself and inform how to use variants
- add visual regression comment if no changed snapshots
- include page in sidebar when only have a `.composition` file (like when demonstrating some `.ts` helper function)
- don't include Kitbook route files in the sidebar when using Kitbook by itself for a component library (like svelte-pieces)
- sidebar isn't truly alphabetical if there are varieties of file types

## Helpful Future Inspiration

- [KitDocs](https://kit-docs.svelteness.dev/) 
- svelte-headlessui
- [Urara](https://github.com/importantimport/urara)

## Dependency Graph inspiration
- Nuxt DevTools, Vue DevTools, [vite-plugin-devtools](https://github.com/pheno-agency/vite-plugin-devtools)
- https://github.com/tkskto/vue-component-analyzer
- https://github.com/pahen/madge
