# To-Do List

## Important before considering this a publicly shareable project
*(you have been warned, early-adopters)*

- Easily adjust screen size use full-screen view
- Story layout improvements (learn from svench and https://bookit.leveluptutorials.com/book/A%20Parent-Basic and implement own ideas)
- Bake prism css into Layout w/ optional flag (currently in app.html)
- update to SvelteKit 1.0
- add a `create-kitbook` option using `prompt` npm package and learning from `create-svelte`
- update docs

## Nice to Have
- Next and Previous pages (see Docusaurus/Vitebook)
- Easy markdown bookmark hyperlinks
  - FoamBubble like linking, backlinks, and connections graph
- Scrollspy TOC in sidebar (maybe client-side only for setup simplicity)
- solve over-applied global scrollbar css
- use svelte-knobby to beef up knobs, show to the right side and change to show knobs for all visible stories as user scrolls
- pass in component's code to view in a story
- consider setting up an options object that can be passed to kitbook via stuff to make future additions easy to implement
  - for example: optional stackblitz icon to quickly open a kitbook in stackblitz (will only work for kitbooks that don't depend on packages in other parts of a monorepo) 
- could refactor to use activePage instead of activeUrl to make code simpler
- dynamic slots: https://github.com/sveltejs/svelte/issues/2588 && https://github.com/sveltejs/svelte/pull/4296
- edit on Gitpod link?
- Dark mode
- Investigate [Histoire plugin](https://github.com/histoire-dev/histoire/tree/main/packages/histoire-plugin-screenshot) or [Viteshot](https://viteshot.com/) for visual regression screenshot testing
