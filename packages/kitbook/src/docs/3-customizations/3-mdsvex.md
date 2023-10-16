# Kitbook Uses [MDSvex](https://mdsvex.pngwn.io/) 

Kitbook automatically uses MDSvex to preprocess stories files. You'll notice the extensions you previously imported in your `svelte.config.js` are set to `['.md', '.svx']`. As well, you'll notice the presence of a few rehype plugins to help with links, and shiki-twoslash for code highlighting. If you want to process your markdown differently you can pass your own config to the `mdsvex` plugin.

*Do note that if you use an MDSvex layout file then you can't use `lang='ts'` in your stories files.*

## Using Prettier

Be aware that if you use prettier and run the `Format Document` command when a file is being treated as a Svelte file you may need to add `<!--prettier-ignore>` above sections of markdown and want to avoid the code from being collapsed into a single paragraph.

