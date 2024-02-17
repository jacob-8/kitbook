# Roadmap

The API is stable and so the project is in **beta**. You can use this in production if you are not bothered by some bugs that need fixed and some important features still missing.

**Please feel free to [create an issue](https://github.com/jacob-8/kitbook/issues/new) and discuss what you may be able to contribute!**

## Before 1.0

- add templates
- improve: viewer's component tree when components from packages are used which have slots
- html snapshot regression via Vitest+happydom which stores baseline and comparisons in a single file in the static folder on build
- set languages cookie by project
- snapshot compositions also
- save selected languages in URL for easy sharing
- toggleable padding around variants
- full-screen focus view for sandbox
  - show source code using code editor <!-- i-tabler-code"-->
- automatically analyze component for props
  - `import { svelte2tsx } from 'svelte2tsx';`
  - `import FolderRaw from './Folder.svelte?raw';`
  - display a default variant for components without variants by using default props
  - document how to adjust glob to be able to gradually include components
- Next and Previous pages (see Docusaurus/Vitebook)
- movable viewer and adjustable shortcuts
- show compositions in viewer
- auto-adjusting iframe height
- hoist compositions into documentation when referenced, parse for links to compositions and just create an ID that can be targeted by composition. May need .not-prose when hoisted
- editable props for variants and compositions

## Rough edges 

- responsive iframes shrink to keep interior resolution
- keep sidebar active page in view
  - menu item should be expanded when linked to (currently not visible if parent folder was manually closed and then it was jumped to via a wikilink)
- shouldn't crash upon finding oddly placed file like `/src/+layout.svelte` or `src/ind.md`
- on build don't show folders that have no components with Kitbook files 
- Scrollspy TOC in sidebar (maybe client-side only for setup simplicity) - look at svelte-put toc
- accept whichever w/h dimension is given last either via resize or by prompt
- could refactor to use activePage instead of activeUrl to make code simpler
- distinguish between Index and README in search if both exist
- fix shiki-twoslash highlight not scrolling on small screens by learning from https://histoire.dev/guide/svelte3/controls.html
- catch when a variants file exists by itself and inform how to use variants

## Post 1.0

- add visual regression comment if no changed snapshots
- improve search to include raw string content with fuzzy search https://github.com/sveltejs/kit/blob/master/sites/kit.svelte.dev/src/lib/search/search.js
- more keyboard shortcuts, https://zendeskgarden.github.io/react-components/index.html?path=/story/packages-avatars-readme--page
- Dark mode (both for Kitbook and for individual sandboxes - or be able to show light and dark side by side) learn from https://github.com/dansvel/sveltekit-windi
- [admonitions](https://docusaurus.io/docs/markdown-features/admonitions)
- backlinks/connections graph (see Foam examples)
- display meta tags of iframe when rendering +page.svelte components
- optional Stackblitz/Codeflow/Gitpod links? 

## Helpful Future Inspiration

- Nuxt DevTools, Vue DevTools, [vite-plugin-devtools](https://github.com/pheno-agency/vite-plugin-devtools)
- [KitDocs](https://kit-docs.svelteness.dev/) 
- [svelte-knobby](https://github.com/Rich-Harris/svelte-knobby)
- svelte-headlessui
- https://github.com/importantimport/urara
