# Roadmap

## Important before considering this a publicly usable project
*(you have been warned, early-adopters)*

- Add full-screen focus view for sandbox
  - make instrument panel show on mobile
 
- show Story and Variant code in instrument panel using code editor: {data.loadedModules.svxRaw}
  - <!-- i-tabler-code"-->

- automatically analyze component for props
  - be able to pass filter option to layout load so that certain pages which will break without proper initialization won't be shown in Kitbook - after this we can start automatically displaying components without stories
  - `import { svelte2tsx } from 'svelte2tsx';` `import FolderRaw from './Folder.svelte?raw';`

- improve knob sub-components, maybe use svelte-knobby to help 

- revisit items in iframe with top padding causing iframe scroll (edit in Github button)
- shouldn't crash upon finding oddly placed file like `/src/+layout.svelte` or `src/ind.md`
- catch when a variants file exists by itself and inform how to use variants
- understand why main.css imported in Layout.svelte gets passed to the iframe as well (don't want `<pre>` elements in the iframe to have negative x margins)
- solve template usage of unbuilt (and thus styles not working) version of svelte-pieces when run locally in this repo

- publish Kitbook extension

- `npm publish --tag beta`
- share mdsvex-shiki-twoslash w/ orta
- send test question to discord query person

## Beta
- update meta-tags based on current page
- don't show grayed out empty stories for components with details on build
- figure out easier way to reference types inside of Kitbook
- Allow for titling documentation with `1a` as well as `1` and not have the `a` show up in the sidebar
- keep sidebar active page in view
- menu item should be expanded when linked to (currently not visible if parent folder was manually closed and then it was jumped to via a wikilink)
- Next and Previous pages (see Docusaurus/Vitebook)
- move css package to this repo and update with latest settings
- be able to automatically change any props for a component inside a Story by using the plugin to rewrite things a bit. Also, also setting start value directly on the component
- expand search to include raw string content https://github.com/sveltejs/kit/blob/master/sites/kit.svelte.dev/src/lib/search/search.js
- add quick QRCode for easy opening of an iframed example on phone
- add ability to pass a route and use the same Frame component as a Story (useful in SvelteFireTS to show)
- add button to iframe to open separately in new window
- add a simple Story that doesn't use an iframe but still allows for easy introspection code implementation
- Vite server middleware to update/add stories from browser
- Vite server middleware to update/add variants from browser
- add changesets
- Story layout improvements (learn from svench and https://bookit.leveluptutorials.com/book/A%20Parent-Basic and implement own ideas)
- dynamic slots: https://github.com/sveltejs/svelte/issues/2588 && https://github.com/sveltejs/svelte/pull/4296
- Scrollspy TOC in sidebar (maybe client-side only for setup simplicity) - look at svelte-put toc
- use plugin to automatically give IDs to stories
- Investigate [Histoire plugin](https://github.com/histoire-dev/histoire/tree/main/packages/histoire-plugin-screenshot) or [Viteshot](https://viteshot.com/) for visual regression screenshot testing
- Dark mode (both for Kitbook and for individual sandboxes - or be able to show light and dark side by side) learn from https://github.com/dansvel/sveltekit-windi
- backlinks
- esbuild minify and don't place things into one folder (unbuild)
- support `variants.js`
- accept whichever w/h dimension is given last either via resize or by prompt

## Post 1.0
- snap side panels to 0 if within x pixels.
- add option to easily hide a directory (and refactor out hardcoded hide of 'routes for copying')
- add optional stackblitz icon to quickly open a kitbook in stackblitz (will only work for kitbooks that don't depend on packages in other parts of a monorepo) 
- connections graph
- could refactor to use activePage instead of activeUrl to make code simpler
- edit on Gitpod link?
- consider scaling down iframe when it's larger than the viewport
- global scrollbar css will affect stories not using sandbox (is this even an issue?)
- learn more about - at moment it keeps svelte-pieces from directly accessing kitbook:
```json
"publishConfig": {
  "directory": "src/lib", // try this instead of package to avoid additional import strings in neighbor packages
  "linkDirectory": true
},
```

 Additionally, the following could also be helpful sources of inspiration in the future:

- [KitDocs](https://kit-docs.svelteness.dev/) 
- [svelte-knobby](https://github.com/Rich-Harris/svelte-knobby)
- svelte-headlessui
- https://github.com/importantimport/urara


## dynamic slots scratch notes

