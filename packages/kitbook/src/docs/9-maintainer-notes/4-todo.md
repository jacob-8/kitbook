# To-Do List

## Important before considering this a publicly usable project
*(you have been warned, early-adopters)*

- use in svelte-pieces
- allow passing config to plugin to let main routes folder be the folder if KITBOOK_ROUTE = "src/routes"
- fix side menu backdrop
- fix svelte-pieces a11y warnings
- hide pages from sidebar w/o any stories or variants until component props are automatically detected
- consolidate story around style imports (tw-reset.css imported in app.html so it comes first, prism and tw-prose are in Layout.svelte, also look at kitbook global styles - where to put?)
- Easily adjust screen size
- Add full-screen view for sandbox
- lay out variants better
- use in ld package
- use in rest of my packages and update docs as I go
- publish

## Important before encouraging others to use
- custom meta-tags
- add a `create-kitbook` option using `prompt` npm package and learning from `create-svelte`
- Bake prism css into Layout w/ optional flag (currently in app.html)
- Next and Previous pages (see Docusaurus/Vitebook)
- automatically analyze component for props
- catch when a variants file exists by itself and inform how to use variants

## Nice to Have
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
