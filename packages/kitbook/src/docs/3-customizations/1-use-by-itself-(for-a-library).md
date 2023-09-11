# Use Kitbook by Itself

If you are building a library and you want to use Kitbook by itself without a main app, that's fine. Still create a `src/routes/kitbook` folder and you will have the inconvenience of the unneeded `kitbook/` addition in your urls until the Kitbook location can be made a custom Vite plugin option. 

## Filtering out stories and variants files from your package

If you are using `svelte-package` and you don't want to add your stories and variants files to the output package, you can add a `.npmignore` file to your repo and add the following to it:

```
*.variants.ts
**/*.md
*.svx
```


