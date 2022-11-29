# Get Started: How to Create a KitBook

- Install [Kitbook](https://www.npmjs.com/package/kitbook), `npm i -D kitbook` or `pnpm add -D kitbook`

## Copy Kitbook routes folder
Copy the ____ folder in the `kitbook` package into `src/kitbook`. This contains:

- root `+layout.ts` to get list of app files via glob import
- sandboxed iframe route that only shows 1 particular story in an isolated context, ready to be imported into story pages
- `+layout.svelte` wrapper for the main view, separated from the sandboxed page via a `(main)` group
- a main page that accepts a file param to know which story page to show

## Add [MDSvex](https://mdsvex.pngwn.io/) 
- Run `npx svelte-add@latest mdsvex` or refer to the [MDSvex docs](https://mdsvex.pngwn.io/docs) to add in the manner you desire.
- Set your extensions in `mdsvex.config.js` to `['.md', '.svx']` to allow for a powerful combination:
  - Use the `.md` extension when you want markdown intellisense and highlighting
    - I recommend using the [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) extension to allow for easy pasting of links into markdown and such.
  - Use the `.svx` extension when you want svelte intellisense and highlighting. *Using `.svx`* for Svelte files you want MDSvex to process is a nice way to keep MDSvex from having to process your regular Svelte components (and helps avoid potential bugs)
  <!-- - Notice the icons in the sidebar tell you which files are `.md` files (<span class="i-simple-icons-markdown" />) and which are `.svx` files (<span class="i-simple-icons-svelte" />). -->
- If using extensions such as `.svx` you should add `"files.associations": { "*.svx": "svelte" }` to your VSCode `settings.json` file for proper intellisense and highlighting.

## Add Environment variables

Add the following optional variables to your `.env` file:

```toml
PUBLIC_KITBOOK_TITLE=Fantastic App Kitbook
PUBLIC_GITHUB_URL=https://github.com/jacob-8/kitbook/tree/main/packages/kitbook
```
- If you pass in your githubURL, an icon to your repo will be placed in the Kitbook header

## Add Prism styles
NEED to make this baked in, and able to change if desired [prism](https://prismjs.com/) theme css to `app.html`. `<link href="https://unpkg.com/prismjs@1.27.0/themes/prism-tomorrow.css" rel="stylesheet" />` for example.

## Add styles that will be used for your components.  
- This could be as simple as importing a css file in your `__layout.svelte` file depending on how you do styles.
- Kitbook's components use [UnoCSS](https://github.com/unocss/unocss) but the classes have already been compiled into hashed names. You can use whatever styles framework you like.

## Add your first page

- Create a `foo.md` or `foo.svx` file (or could be something else depending on the extensions you chose) and start documenting and prototyping your first component. 
  - Consider using `.md` extensions when doing more writing and wanting VSCode's formatting and intellisense to help you with Markdown, then use `.svx` when doing more coding as Svelte's intellisense and formatting will then kick in allowing for import completion, type checking and such. Because MDSVex allows you to write Markdown in Svelte components and vice versa, the extension really doesn't matter and you can switch it back and forth depending on your needs. Do know that you may need to add `<!--prettier-ignore>` above sections of markdown `.svx` files if you use prettier and want to avoid the code from being collapsed into a single paragraph.
- Name your file according to how you want it shown in the sidebar, use the `#-foo-bar.extension` schema to sort the sidebar navigation. `1-get-started.md` will be displayed as `Get Started` and will show up before `2-button.svelte` which will be displayed as `Button`.
  - Folder naming follows the same conventions. `0-components` will show up as `Components` and all pages within that folder will automatically be nested in the sidebar.
- Document what you are about to build (it's a good habit to start right from the beginning), create the component, and then import it:
```svelte
<script lang="ts">
  import Button from '$lib/Button.svelte';
</script>

Here's a basic button:

<Button>Hello Kitbook</Button>

TODO: Add props
```
  - Note how you don't even need the `Story` component wrapper to document your component library. You can start with just documentation and simple imports. *But that's not why you're here, so let's get to the good stuff.*

- Add the `Story` component to access the prototyping features:
```svelte
<script lang="ts">
  import { Story } from 'kitbook';
</script>

<Story name="Fancy Button" knobs={{ name: 'John'}} let:props={{ name }}>
  <Button>Hello {name}</Button>
</Story>
```

- Now try editing the name knob
- Continue to document your component and [add stories](/2-add-stories) for each situation as seen in this repo and the other [examples](/3-examples).
