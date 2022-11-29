- run a `create-kitbook` command to:
  - add a docs folder w/ a sample doc
  - add a Kitbook folder w/ Kitbook routes
  - add mdsvex
  - add `kitbook.vite.config.js` files
  - add if kitbook section to svelte.config.js
  - leave a URL to documentation

## Notes

By default Kitbook will try to display your project's README.md file as it's home page if no src/docs/index.md (.svx) file exists.<br /><br />

To allow serving files from one level up to the project root, the Kitbook adjusted Vite config includes this setting:<br />

<pre>server.fs.allow: ['..']</pre>