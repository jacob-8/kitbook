# To-Do List

## Important before considering this a publicly shareable project
*(you have been warned, early-adopters)*

- install in projects already using Kitbook via copy folder method to flesh out basic documentation
- Story layout improvements
- solve over-applied global scrollbar css
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
