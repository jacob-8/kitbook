# To-Do Lists

## Important before considering this a publicly usable project
*(you have been warned, early-adopters)*

- use in living-dictionaries and update docs as I go 
  - don't show Kitbook tip to pass in props if it's a variant for a component without props
- make main section scrollable so jumping pages doesn't leave you partway down
- show Story and Variant code in instrument panel
  - fetch raw code strings via store
- automatically analyze component for props
  - be able to pass filter option to layout load so that certain pages which will break without proper initialization won't be shown in Kitbook - after this we can start automatically displaying components without stories
- improve message for pages in sidebar w/o any stories or variants until component props are automatically detected
- understand why main.css imported in Layout.svelte gets passed to the iframe as well (don't want `<pre>` elements in the iframe to have negative x margins)
- update meta-tags based on current page
- shouldn't crash upon finding oddly placed file like `/src/+layout.svelte` or `src/ind.md`
- catch when a variants file exists by itself and inform how to use variants
- improve knob sub-components
- solve template usage of unbuilt (and thus styles not working) version of svelte-pieces when run locally in this repo
- make sure all docs are accurate, even if not complete
- merge to main and `npm publish --tag beta`
- share mdsvex-shiki-twoslash w/ orta
- send test question to discord query person

## After sharing
- don't show grayed out empty stories for components with details on build
- Allow for titling documentation with `1a` as well as `1` and not have the `a` show up in the sidebar
- Add full-screen view for sandbox
- keep sidebar active page in view
- menu item should be expanded when linked to (currently not visible if parent folder was manually closed and then it was jumped to via a wikilink)
- Next and Previous pages (see Docusaurus/Vitebook)
- esbuild minify and don't place things into one folder (unbuild)
- move css package to this repo and update with latest settings
- be able to automatically change any props for a component inside a Story by using the plugin to rewrite things a bit. Also, also setting start value directly on the component
- expand search to include raw string content https://github.com/sveltejs/kit/blob/master/sites/kit.svelte.dev/src/lib/search/search.js
- add quick QRCode for easy opening of an iframed example on phone
- add ability to pass a route and use the same Frame component as a Story (useful in SvelteFireTS to show)
- add button to iframe to open separately in new window
- add a simple Story that doesn't use an iframe but still allows for easy introspection code implementation
- consider scaling down iframe when it's larger than the viewport
- Vite server middleware to update/add stories from browser
- Vite server middleware to update/add variants from browser
- add changesets
- use svelte-knobby to beef up knobs, show to the right side and change to show knobs for all visible stories as user scrolls
- Story layout improvements (learn from svench and https://bookit.leveluptutorials.com/book/A%20Parent-Basic and implement own ideas)
- add optional stackblitz icon to quickly open a kitbook in stackblitz (will only work for kitbooks that don't depend on packages in other parts of a monorepo) 
- dynamic slots: https://github.com/sveltejs/svelte/issues/2588 && https://github.com/sveltejs/svelte/pull/4296
- Scrollspy TOC in sidebar (maybe client-side only for setup simplicity) - look at svelte-put toc
- use plugin to automatically give IDs to stories
- Investigate [Histoire plugin](https://github.com/histoire-dev/histoire/tree/main/packages/histoire-plugin-screenshot) or [Viteshot](https://viteshot.com/) for visual regression screenshot testing
- edit on Gitpod link?
- Dark mode (both for Kitbook and for individual sandboxes - or be able to show light and dark side by side)
- backlinks
- connections graph

## At some point
- could refactor to use activePage instead of activeUrl to make code simpler
- add option to easily hide a directory (and refactor out hardcoded hide of 'routes for copying')
- global scrollbar css will affect stories not using sandbox (is this even an issue?)
- learn more about - at moment it keeps svelte-pieces from directly accessing kitbook:
```json
"publishConfig": {
  "directory": "src/lib", // try this instead of package to avoid additional import strings in neighbor packages
  "linkDirectory": true
},
```