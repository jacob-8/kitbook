# To-Do List

## Important before considering this a publicly shareable project
*(you have been warned, early-adopters)*

- debug why root is not being passed down
- debug why Folder, Page, and Sidebar are not working
- rename page routes using folder name
- Add component docs with sveld
- iframe
- Easily adjust screen size use full-screen view
- Next and Previous pages (see Docusaurus/Vitebook)
  - requires ordering pages and finding active page index
- Story layout improvements (learn from svench and https://bookit.leveluptutorials.com/book/A%20Parent-Basic and implement own ideas)
- Scrollspy TOC in sidebar (maybe client-side only for setup simplicity)
- Easy markdown bookmark hyperlinks
  - FoamBubble like linking, backlinks, and connections graph
- Bake prism css into Layout w/ optional flag (currently in app.html)

## Nice to Have
- solve over-applied global scrollbar css
- use svelte-knobby to beef up knobs, show to the right side and change to show knobs for all visible stories as user scrolls
- pass in component's code to view in a story
- consider setting up an options object that can be passed to kitbook via stuff to make future additions easy to implement
  - for example: optional stackblitz icon to quickly open a kitbook in stackblitz (will only work for kitbooks that don't depend on packages in other parts of a monorepo) 
- could refactor to use activePage instead of activeUrl to make code simpler
- edit on Gitpod link?
- Dark mode
- Investigate [Histoire plugin](https://github.com/histoire-dev/histoire/tree/main/packages/histoire-plugin-screenshot) or [Viteshot](https://viteshot.com/) for visual regression screenshot testing
