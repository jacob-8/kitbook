# To-Do List

## Important before considering this a publicly shareable project
*(you have been warned, early-adopters)*

- make pages composed of insertable components so they are simple to copy into a new Kitbook
- fix side menu backdrop
- fix svelte-pieces a11y warnings
- Easily adjust screen size
- layout variants in a way that makes sense
- Add full-screen view for sandbox
- use in some packages
- add a `create-kitbook` option using `prompt` npm package and learning from `create-svelte`
- use in rest of my packages and update docs 
- update to SvelteKit 1.0
- publish

## Nice to Have
- Story layout improvements (learn from svench and https://bookit.leveluptutorials.com/book/A%20Parent-Basic and implement own ideas)
- Bake prism css into Layout w/ optional flag (currently in app.html)
- Next and Previous pages (see Docusaurus/Vitebook)
- Easy markdown bookmark hyperlinks, using FoamBubble like linking, backlinks, and connections graph
- use svelte-knobby to beef up knobs, show to the right side and change to show knobs for all visible stories as user scrolls
- pass in component's code to view in a story
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
