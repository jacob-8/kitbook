# Roadmap

The API is stable and the project is in **beta**. You can use this in production if you are not bothered by some bugs relating to the UI and features that have not yet been finished. I know there are important features missing, but it's good enough to be incredibly helpful.

**Please feel free to [create an issue](https://github.com/jacob-8/kitbook/issues/new) and discuss what you may be able to contribute!**

## Next Up
- make sure docs are up to date, fix examples, and update docs/fix bugs as things are found
- cut release, explaining breaking change with Variants type
- create variant from current state
- Viewer displays page variants (adjust file title)
- Viewer displays compositions
- show source code for each component using code editor
- handle Viewer for users not able to use the bleeding edge Document Picture-in-Picture, Chrome only feature
- Use module graph to allow easy jumping up and down the graph tree easily from component to related component
- Double-check the add page variants component reference is _ and not + in all locations
- update templates to detect props
- handle variant type when there are no component props
- html snapshot regression via Vitest+happydom which stores baseline and comparisons in a single file in the static folder on build
- snapshot compositions also
- Add full-screen focus view for sandbox
- Next and Previous pages (Docusaurus/Vitepress style)
- save selected languages in URL for easy sharing
- Orama search index for full-text search

## Rough edges 

- fix ViewBody width on small screens overflowing region by about 25px
- Get file location from Vite module graph from component tagName when it has no elements so that Kitbook can know which Svelte file to create variants, compositions, and markdowns for.
- throw error if setting both csr and ssr to false
- on build don't show folders that have no components with Kitbook files 
- show compositions in viewer
- hide jump to vscode buttons when not in dev using check for import.meta.hot
- responsive iframes shrink to keep interior resolution
- keep sidebar active page in view
  - menu item should be expanded when linked to (currently not visible if parent folder was manually closed and then it was jumped to via a wikilink)
- shouldn't crash upon finding oddly placed file like `/src/+layout.svelte` or `src/ind.md`
- Scrollspy TOC in sidebar (maybe client-side only for setup simplicity) - look at svelte-put toc
- accept whichever w/h dimension is given last either via resize or by prompt
- distinguish between Index and README in search if both exist
- fix shiki-twoslash highlight not scrolling on small screens by learning from https://histoire.dev/guide/svelte3/controls.html
- catch when a variants file exists by itself and inform how to use variants

## Later

- automatically analyze component for props
  - `import { svelte2tsx } from 'svelte2tsx';`
  - `import FolderRaw from './Folder.svelte?raw';`
  - display a default variant for components without variants by using default props
  - document how to adjust glob to be able to gradually include components
- add visual regression comment if no changed snapshots
- improve search to include raw string content with fuzzy search https://github.com/sveltejs/kit/blob/master/sites/kit.svelte.dev/src/lib/search/search.js
- more keyboard shortcuts, https://zendeskgarden.github.io/react-components/index.html?path=/story/packages-avatars-readme--page
- [admonitions](https://docusaurus.io/docs/markdown-features/admonitions)
- backlinks/connections graph (see Foam examples)
- display meta tags of iframe when rendering +page.svelte components
- optional Stackblitz/Codeflow/Gitpod links

## Helpful Future Inspiration

- Nuxt DevTools, Vue DevTools, [vite-plugin-devtools](https://github.com/pheno-agency/vite-plugin-devtools)
- [KitDocs](https://kit-docs.svelteness.dev/) 
- [svelte-knobby](https://github.com/Rich-Harris/svelte-knobby)
- svelte-headlessui
- https://github.com/importantimport/urara
