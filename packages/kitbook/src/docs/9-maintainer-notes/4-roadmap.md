# Roadmap

**This project is still in alpha and the API is still being shaped.**
*(you have been warned, early-adopters)*

## Alpha features I have already planned out and just need to implement - hold your horses
- visual regression testing
  - using Playwright but do note VitestPreview, [Histoire plugin](https://github.com/histoire-dev/histoire/tree/main/packages/histoire-plugin-screenshot) and [Viteshot](https://viteshot.com/)
- auto-adjusting iframe height
- i18n
- use remark+rehype for basic html instead of mdsvex
  - compositions display in documentation when referenced, update the MDSvex to parse for links to compositions and just create an ID that can be targeted by composition
  - May need .not-prose when hoisted into documentation

## Beta - please feel free to open issues and discuss what you may be able to contribute!
- responsive iframes shrink to keep interior resolution
- movable viewer and adjustable shortcuts
- show compositions in viewer
- full-screen focus view for sandbox
  - show source code using code editor <!-- i-tabler-code"-->
- automatically analyze component for props
- editable props 
- start automatically displaying components without stories by using default props
  - document how to adjust glob to be able to gradually include components
  - `import { svelte2tsx } from 'svelte2tsx';`
  - `import FolderRaw from './Folder.svelte?raw';`
- more keyboard shortcuts, https://zendeskgarden.github.io/react-components/index.html?path=/story/packages-avatars-readme--page
- keep sidebar active page in view
  - menu item should be expanded when linked to (currently not visible if parent folder was manually closed and then it was jumped to via a wikilink)
- update meta-tags based on current page
- Next and Previous pages (see Docusaurus/Vitebook)
- add copy button to code blocks
- expand search to include raw string content with fuzzy search https://github.com/sveltejs/kit/blob/master/sites/kit.svelte.dev/src/lib/search/search.js
- it's all focused on Typescript users, but someone could adjust things to make it work for a JavaScript only user

## Rough edges to contribute - please ask how you can help
- catch when a variants file exists by itself and inform how to use variants
- shouldn't crash upon finding oddly placed file like `/src/+layout.svelte` or `src/ind.md`
- on build don't show folders that have no components with Kitbook files 
- Scrollspy TOC in sidebar (maybe client-side only for setup simplicity) - look at svelte-put toc
- accept whichever w/h dimension is given last either via resize or by prompt
- could refactor to use activePage instead of activeUrl to make code simpler
- distinguish between Index and README in search if both exist
- fix shiki-twoslash highlight not scrolling on small screens by learning from https://histoire.dev/guide/svelte3/controls.html

## Post 1.0
- [admonitions](https://docusaurus.io/docs/markdown-features/admonitions)
- Dark mode (both for Kitbook and for individual sandboxes - or be able to show light and dark side by side) learn from https://github.com/dansvel/sveltekit-windi
- backlinks/connections graph
- display meta tags of iframe when rendering +page.svelte components
- dynamic slots?
- optional Stackblitz/Codeflow/Gitpod links? 

## Helpful Future Inspiration

- [KitDocs](https://kit-docs.svelteness.dev/) 
- [svelte-knobby](https://github.com/Rich-Harris/svelte-knobby)
- svelte-headlessui
- https://github.com/importantimport/urara
- Nuxt, Vue DevTools, https://github.com/pheno-agency/vite-plugin-devtools
