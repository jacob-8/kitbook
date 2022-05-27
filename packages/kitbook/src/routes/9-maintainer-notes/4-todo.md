# To-Do List

## Important before considering this a publicly shareable project
*(you have been warned, early-adopters)*

- instruct people to Kitbook type to Stuff definitions
- close sidebar when mobile navigation happens
- Story layout improvements (learn from svench and https://bookit.leveluptutorials.com/book/A%20Parent-Basic and implement own ideas)
- solve over-applied global scrollbar css
- try svelte-pathfinder for query params store (https://github.com/sveltetools/svelte-pathfinder or https://github.com/sveltejs/kit/issues/969)
- Easily adjust screen size use full-screen view
- Scrollspy TOC on right hand side
- Easy markdown bookmark hyperlinks
- Bake prism css into Layout w/ optional flag (currently in app.html)
- Next and Previous pages (see Docusaurus/Vitebook)
  - requires ordering pages and finding active page index
- Indicate in the header when on the homepage

## Nice to Have
- consider setting up an options object that can be passed to kitbook via stuff to make future additions easy to implement
  - for example: optional stackblitz icon to quickly open a kitbook in stackblitz (will only work for kitbooks that don't depend on packages in other parts of a monorepo) 
- could refactor to use activePage instead of activeUrl to make code simpler
- edit on Gitpod link?
- Dark mode
- Investigate Playwright or [Viteshot](https://viteshot.com/) for visual regression screenshot testing
