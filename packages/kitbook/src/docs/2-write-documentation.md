# Write Documentation

You can create a folder with any name under your `/src` folder and begin writing documentation in markdown. This Kitbook has a `docs` folder, which is where this file exists as can be seen in the sidebar navigation. Since `mdsvex` is activated on all `.md` and `.svx` files you can also include Svelte components as needed.

## Kitbook Index

By default Kitbook will display your project's README.md file as it's home/index page, but you can override this by using a `src/docs/index.{md|svx}` file.

## Naming Conventions

- Name your file according to how you want it shown in the sidebar, use the `#-foo-bar.extension` schema to sort the sidebar navigation. `1-get-started.md` will be displayed as `Get Started` and will show up before `2-button.svelte` which will be displayed as `Button`.
  - Folder naming follows the same conventions. `0-components` will show up as `Components` and all pages within that folder will automatically be nested in the sidebar.


