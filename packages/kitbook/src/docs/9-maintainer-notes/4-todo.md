# To-Do Lists

## Important before considering this a publicly usable project
*(you have been warned, early-adopters)*

- use in living-dictionaries and update docs as I go
- change from let:props to let:knobs to open way for automatic props in future
- don't show Kitbook tip to pass in props if it's a variant for a component without props
- comb back through SvelteFireTS after improving knobs and wikilinks sections and denest {kitbookOptions}
- make sure all docs are up-to-date, even if not fully written
- merge to main 
- improve knob sub-components
- don't show grayed out empty stories for components with details on build
- DRY things out
  - esbuild minify and don't place things into one folder (unbuild)
- show Story and Variant code in sidebar
  - fetch raw code strings via store

## Important before encouraging others to use
- solve template usage of unbuilt (and thus styles not working) version of svelte-pieces when run locally in this repo
- `npm publish --tag beta`
- share mdsvex-shiki-twoslash w/ orta
- send alpha test question to discord query person
- search from https://github.com/sveltejs/kit/blob/master/sites/kit.svelte.dev/src/lib/search/search.js
- move css package to this repo and update with latest settings
- make main section scrollable so jumping pages doesn't leave you partway down
- automatically analyze component for props
- Next and Previous pages (see Docusaurus/Vitebook)
- improve message for pages in sidebar w/o any stories or variants until component props are automatically detected
- Allow for titling documentation with `1a` as well as `1` and not have the `a` show up in the sidebar
- Add full-screen view for sandbox
- update meta-tags based on current page
- shouldn't crash upon finding oddly placed file like `/src/+layout.svelte` or `src/ind.md`
- catch when a variants file exists by itself and inform how to use variants
- keep sidebar active page in view
- menu item should be expanded when linked to (currently not visible if parent folder was manually closed and then it was jumped to via a wikilink)
- be able to automatically change any props for a component inside a Story by using the plugin to rewrite things a bit. Also, also setting start value directly on the component

## Nice to Have
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