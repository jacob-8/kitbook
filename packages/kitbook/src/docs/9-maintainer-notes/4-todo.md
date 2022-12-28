# To-Do Lists

## Important before considering this a publicly usable project
*(you have been warned, early-adopters)*

- merge to main and `npm publish --tag alpha`
- use in rest of my packages and update docs as I go
- send alpha test question to discord query person
- share mdsvex-shiki-twoslash w/ orta

## Important before encouraging others to use
- improve adjustment for iframe width and height (and clarify where borders are)
- DRY things out
- show Story and Variant code in sidebar
  - fetch raw code strings via store
- automatically analyze component for props
- Next and Previous pages (see Docusaurus/Vitebook)
- improve message for pages in sidebar w/o any stories or variants until component props are automatically detected
- Allow for titling documentation with `1a` as well as `1` and not have the `a` show up in the sidebar
- search from https://github.com/sveltejs/kit/blob/master/sites/kit.svelte.dev/src/lib/search/search.js
- Add full-screen view for sandbox
- update meta-tags based on current page
- shouldn't crash upon finding oddly placed file like `/src/+layout.svelte`
- catch when a variants file exists by itself and inform how to use variants
- keep sidebar active page in view

## Nice to Have
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