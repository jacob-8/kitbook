# Get Started: How to Create a KitBook


## Add [MDSvex](https://mdsvex.pngwn.io/) 
  - Run `npx svelte-add@latest mdsvex` or refer to the [MDSvex docs](https://mdsvex.pngwn.io/docs) to add in the manner you desire.
  - Set up your extensions in `mdsvex.config.js`, I use `['.md', '.svelte']`
  - If using other extensions such as `.svx` you can add `"files.associations": { "*.svx": "svelte" }` to your VSCode `settings.json` file for proper intellisense and highlighting.

## Choose a folder in your `src/routes` directory
   - A Kitbook can be either a new SvelteKit app--run `npm init svelte@next` and start in `src/routes`--or it can be put in a sub-route of an existing app (e.g. `src/routes/kitbook`). 
     - *If you have a monorepo and want to create a new component library using Kitbook, create a new folder with the name of your component library (e.g. `packages/components`) and run `pnpm init svelte@next`. [Building Svelte Society: Monorepos with Pngwn](https://youtu.be/gKxz7R9dX0w) helped me understand how this could be helpful in certain situations where code needs to be shared across projects.*

## Set Up Your Sidebar

- In your chosen folder, add a `__layout.svelte` file with the following code which will get a list of your pages, and pass them to Kitbook's `Layout` component:

```svelte
<script lang="ts" context="module">
  import { parsePages, type Page } from 'kitbook/sidebar/pages';
  const modules = import.meta.glob('./**/*.{md,svelte}');
  
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async () => {
    return { props: { pages: parsePages(modules) } };
  };
</script>

<script lang="ts">
  import Layout from 'kitbook/Layout.svelte';
  export let pages: Page[];
</script>

<Layout {pages}>
  <svelte:fragment slot="header">Kitbook</svelte:fragment>
  <slot />
  <div class="p-3 text-sm font-semibold" slot="footer">View Repo</div>
</Layout>
```

### Sidebar Notes
- See https://vitejs.dev/guide/features.html#glob-import to learn more about the glob import and note that you should adjust the `{md,svelte}` file endings to suit your purposes in accordance with how you've set up MDSvex extensions. As we are not resolving the returned Promise functions that would load each module, we don't need to be concerned about speed issues from using `import.meta.glob('./**/*.{md,svelte}')` when our Kitbook gets large.
- The `header` and `footer` slots are optional. They provide good places to put a title or Github repo links.

## Add styles that will be used for your components.  
- This could be as simple as importing a css file in your `__layout.svelte` file depending on how you do styles.
- Kitbook's components use [Windicss](https://windicss.org/) and [Unocss icons](https://antfu.me/posts/icons-in-pure-css). See [Building Kitbook / Add Windicss](/[1]building-kitbook/add-windicss) if you'd like to know how to do that. *Skip the Typography/prose parts unless you want to also use those in your components and not just your documentation.*

## Add your first page

- Create a `foo.svelte`, `foo.md`, or `foo.svx` file depending on the extension you choose and start documenting and prototyping your first component. 
  - Consider using `.md` extensions when doing more writing and wanting VSCode's formatting and intellisense to help you with Markdown, then use `.svelte` (or `.svx` if that's your flavor) when doing more coding as the Svelte's intellisense and formatting will then kick in allowing for import completion, type checking and such. Because MDSVex allows you to write Markdown in Svelte components and vice versa, the extension really doesn't matter and you can switch it back and forth depending on your needs.
- Name your file according to how you want it shown in the sidebar, use the `#-foo-bar.extentsion` schema to sort the sidebar navigation. `1-get-started.md` will be displayed as `Get Started` and will show up before `2-page-header.svelte` which will be displayed as `Page Header`.
  - Folder naming follows the same conventions. `0-components` will show up as `Components` and all pages within that folder will automatically be nested in the sidebar.
- Document what you are about to build (it's a good habit to start right from the beginning), create the component, and then import it:
```svelte
<script lang="ts">
  import Button from 'kitbook/Button.svelte';
</script>

Here's a basic button:
<Button>Hello Kitbook</Button>

TODO: Add props
```
  - Note how you don't even need a "Story" or "View" component wrapper to document your component library. You can start with just documentation and simple imports. *But that's not why you're here, so let's get to the good stuff.*

- Add the `Story` component to access the prototyping features:
```svelte
<script lang="ts">
  import Story from 'kitbook';
</script>

<Story name="Default Button" knobs={{ name: 'John'}} let:knobs={{ name }}>
  <Button>Hello {name}</Button>
</Story>
```

- Use knobs
- Document your component and add more stories for each situation as seen here:

...TODO...

## Customization

The default Kitbook components are relatively simple. If you'd like to create your own theme please do so. If you think others will benefit from your improvements, please fork the repo and submit a pull request.