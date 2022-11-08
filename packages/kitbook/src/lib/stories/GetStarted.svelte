By default Kitbook will try to display your project's README.md file as it's home page if no src/docs/index.md (.svx) file exists.<br /><br />

To allow serving files from one level up to the project root you must add to your Vite config:<br />

<pre>server.fs.allow: ['..']</pre>