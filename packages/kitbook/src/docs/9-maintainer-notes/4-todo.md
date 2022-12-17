# To-Do Lists

## Important before considering this a publicly usable project
*(you have been warned, early-adopters)*

- publish beta version to npm to get css up and then delete css from assets folder

- filterOutUnwantedKitbookPaths in layout based on what it sees is it's own directory unless if turned off by a flag (for Kitbook's usage itself or if anyone modifies their Kitbook routes and wants to do such in their own Kitbook)
- use in svelte-pieces
- fix side menu backdrop
- fix svelte-pieces a11y warnings
- set iframe height
- use in ld package
- improve message for pages in sidebar w/o any stories or variants until component props are automatically detected
- Easily adjust screen size
- Add full-screen view for sandbox
- lay out variants better
- use in rest of my packages and update docs as I go
- publish

## Important before encouraging others to use
- custom meta-tags
- add a `create-kitbook` option using `prompt` npm package and learning from `create-svelte`
- Bake prism css into Layout w/ optional flag (currently in app.html)
- Next and Previous pages (see Docusaurus/Vitebook)
- automatically analyze component for props
- catch when a variants file exists by itself and inform how to use variants
- Enable customizing the kitbook routes directory such that filterOutUnwantedKitbookPaths can filter it out
- search from https://github.com/sveltejs/kit/blob/master/sites/kit.svelte.dev/src/lib/search/search.js

## Nice to Have
- add changesets
- use svelte-knobby to beef up knobs, show to the right side and change to show knobs for all visible stories as user scrolls
- pass in component's code to view in a story
- Story layout improvements (learn from svench and https://bookit.leveluptutorials.com/book/A%20Parent-Basic and implement own ideas)
- Easy markdown bookmark hyperlinks, using FoamBubble like linking, backlinks, and connections graph
- add optional stackblitz icon to quickly open a kitbook in stackblitz (will only work for kitbooks that don't depend on packages in other parts of a monorepo) 
- dynamic slots: https://github.com/sveltejs/svelte/issues/2588 && https://github.com/sveltejs/svelte/pull/4296
- Scrollspy TOC in sidebar (maybe client-side only for setup simplicity)
- Dark mode (both for Kitbook and for individual sandboxes - or be able to show light and dark side by side)
- Investigate [Histoire plugin](https://github.com/histoire-dev/histoire/tree/main/packages/histoire-plugin-screenshot) or [Viteshot](https://viteshot.com/) for visual regression screenshot testing
- edit on Gitpod link?

## At some point
- could refactor to use activePage instead of activeUrl to make code simpler
- add option to easily hide a directory (and refactor out hardcoded hide of 'routes for copying')
- global scrollbar css will affect stories not using sandbox (is this even an issue?)
