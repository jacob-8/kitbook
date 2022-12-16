## Kitbook utilizes [MDSvex](https://mdsvex.pngwn.io/) 
- Extensions in `mdsvex.config.js` are set to `['.md', '.svx']` to allow for a powerful combination:
  - Use the `.md` extension when you want markdown intellisense and highlighting
    - I recommend using the [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) extension to allow for easy pasting of links into markdown and such.
  - Use the `.svx` extension when you want svelte intellisense and highlighting. *Using `.svx`* for Svelte files you want MDSvex to process is a nice way to keep MDSvex from having to process your regular Svelte components (and helps avoid potential bugs)
  <!-- - Notice the icons in the sidebar tell you which files are `.md` files (<span class="i-simple-icons-markdown" />) and which are `.svx` files (<span class="i-simple-icons-svelte" />). -->
- When using extensions such as `.svx` you should add `"files.associations": { "*.svx": "svelte" }` to your VSCode `settings.json` file for proper intellisense and highlighting.