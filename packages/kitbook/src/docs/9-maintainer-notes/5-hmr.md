# How Vite's HMR API Works for a Component Workbench

These are just brief notes and don't do justice to the topic but here's a start.

## Base Understanding

First understand Hot Module Reloading. Start by reading:
- [svelte-hmr](https://github.com/sveltejs/svelte-hmr/tree/master/packages/svelte-hmr#whats-hmr-by-the-way) (especially the "What's HMR, by the way?" section direct linked to)
- [@rixo's rollup-plugin-hot api](https://github.com/rixo/rollup-plugin-hot#the-hot-api)
- [Vite HMR API](https://vitejs.dev/guide/api-hmr.html) and [Vite's handleHotUpdate plugin hook](https://vitejs.dev/guide/api-plugin.html#handlehotupdate)

## Key Takeaways

### Svelte files self-accept, TS/JS files do not self-accept hot updates

You need to understand that each file can either self-accept or not. If a file can't accept its hot update, the update bubbles up to whatever modules imported it and so on up the chain. If one of its import branches is never "caught" by being accepted and the update bubbles all the way up to the root module then a full page reload will be triggered ([svelte-hmr](https://github.com/sveltejs/svelte-hmr/tree/master/packages/svelte-hmr#whats-hmr-by-the-way)). At this point then, HMR has given us no benefit over a server without such feature. 

Thanks to `vite-plugin-svelte` and `svelte-hmr`, Svelte files accept their own hot updates and apply appropriately (in your developer console's "Sources" tab you can inspect your compiled Svelte files and see the HMR additions). Children components have to be remounted however as it's too difficult to programmatically know how to hot swap them.

Typescript files do not self accept of their own accord however and will trigger a full reload if no one catches them. If they are imported by a Svelte file, then that Svelte file will catch their update saving you from a full reload. If they are imported by a `layout.ts` or `page.ts` file for example, then any changes will trigger a full reload. Since Kitbook utilizes Vite's [glob imports](https://vitejs.dev/guide/features.html#glob-import) feature, then if the HMR for these glob imported files is not caught, then a full reload would be triggered every time a variant is updated, leading to a horrible experience. Other workbench tools don't struggle with this issue because they go through the work of analyzing the file tree themselves. But that takes a lot of code and Vite has already done the work for us so why not take advantage of it?

Before going further, add a simple plugin to log hot updates in a simple Vite project (I suggest using Stackblitz) and see in action what you've been reading about:

```ts title="vite.config.js"
import type { Plugin } from 'vite'

function logHotUpdate(): Plugin {
  return {
    name: 'log-hot-update',
    handleHotUpdate({ modules }) {
      console.log({ modules })
    }
  }
}
```

If you edit a typescript file you notice `isSelfAccepting: false` but if you edit a svelte file you'll see it is `true`.

### You can manually accept hot updates

A major feature of our Kitbook is that we can quickly create [[3-component-variants]] simply by editing exported props objects in a Typescript file. On initial page load these are imported in server side load functions to be able to do server side rendering of components. Kitbook receives load functions for each of these modules via Vite glob imports like this:

```ts title="+layout.js"
const components = import.meta.glob(['/src/**/*.svelte'])
```

Then we catch hot updates to these files and add them to a store which will replace the modules used on first load and smoothly avoid full page reloads.

```ts title="+layout.js"
if (import.meta.hot) {
  import.meta.hot.accept((module) => {
    if (module?._pages)
      pagesStore.set(module._pages)
  })
}
```

See the `src/routes/kitbook/+layout.js` file that Kitbook added to your app for the full version.

So we now have hot reloading for Svelte files (like normal), for variants and compositions provided by Typescript files (and the raw strings of modules imported using `as: raw` also as they do not self-accept).

## A Gotcha

You can't add `import.meta.hot` to a file in a library that will be run from inside of `node_modules`. It will work great when developing on Kitbook, but then won't work when Kitbook is used in other apps. Vite caches files in `node_modules` and so hot updates caught anywhere inside of `node_modules` will be useless. We could use Vite's virtual modules, you say - nope, tried that and for some odd reason Svelte's CSS files won't be available for the server rendering part leading to ugly flashes of unstyled content. So that is why Kitbook adds a `routes/kitbook/+layout.js` file to your app, so that all HMR catching is done within your app where it will work properly.

## Review question

In an ordinary SvelteKit app would updating a Typescript file only imported in a Svelte file bubble up to a full page reload? No, *but it does cause that specific Svelte file to hot update itself which will cause children components to remount.*

[//begin]: # "Autogenerated link references for markdown compatibility"
[3-component-variants]: ../3-component-variants.md "Component Variants"
[//end]: # "Autogenerated link references"