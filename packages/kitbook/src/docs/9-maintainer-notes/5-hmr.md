# How Vite's HMR API Works for a Component Workbench

These are just brief notes and don't do justice to the topic but here's a start.

## Base Understanding

First understand Hot Module Reloading. Start by reading:
- [svelte-hmr](https://github.com/sveltejs/svelte-hmr/tree/master/packages/svelte-hmr#whats-hmr-by-the-way) (especially the "What's HMR, by the way?" section direct linked to)
- [@rixo's rollup-plugin-hot api](https://github.com/rixo/rollup-plugin-hot#the-hot-api)
- [Vite HMR API](https://vitejs.dev/guide/api-hmr.html) and [Vite's handleHotUpdate plugin hook](https://vitejs.dev/guide/api-plugin.html#handlehotupdate)

## Key Takeaways

### Svelte self-accept, TS/JS files do not self-accept hot updates

You need to understand that each file can either self-accept or not. If a file can't accept its hot update, the update bubbles up to whatever modules imported it and so on up the chain. If one of its import branches is never "caught" by being accepted and the update bubbles all the way up to the root module then a full page reload will be triggered ([svelte-hmr](https://github.com/sveltejs/svelte-hmr/tree/master/packages/svelte-hmr#whats-hmr-by-the-way)). At this point then, HMR has given us no benefit from a server without such feature. 

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

A major feature of our Kitbook is that we can quickly create component variants simply by editing an array of props objects in a Typescript file. On initial page load these are being imported in server side load functions to be able to do server side rendering of components. These are provided by a glob import:

```ts title="moduleGlobImport.ts"
export const modules = import.meta.glob(['/src/**/*.{md,svelte,variants.ts,composition}', '/README.md'])
```

Then we catch hot updates to these files and add them to a store which will replace the modules used on first load and smoothly avoid full page reloads.

```ts title="moduleGlobImport.ts" {1,5-9}
import { modulesForKitbookStore } from './hmrUpdatedModules'

export const modulesForKitbook = import.meta.glob(['/src/**/*.{md,svelte,variants.ts,composition}', '/README.md'])

if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    modulesForKitbookStore.set(newModule.modulesForKitbook)
  })
}
```

## The Final Piece: Extracting and Hot-Reloading Each Story from a stories file

So we now have hot reloading for Svelte files (like normal), for variants arrays provided by Typescript files (and incidentally raw strings of modules imported using `as: raw` also do not self-accept), but we haven't yet solved the problem of when a stories file is saved it has to reload all of it's children stories since they are iframes placed in children components. We add a function that takes the code of a stories file and saves an individual story file to `src/kitbook/stories`. On a stories file's first load this function is called by Vite's transform hook as the story is loaded, the value of that file without the stories is then saved to a map inside the plugin. The function is also called inside handleHotUpdate for that stories file where it will compare to check if something outside of a story has changed. If nothing the hook will return an empty array to negate hot reloading the stories file. It will have taken the internal changes to a particular story and update the corresponding file which will kick in HMR just for that story.

## A Gotcha

You can't add `import.meta.hot` to a file in a library that will be run from inside of node_modules. Vite caches those files and so hot updates will be useless. To workaround this we catch them in a virtual module.

## Review question

In an ordinary SvelteKit app would updating a Typescript file only imported in a Svelte file bubble up to a full page reload? No, *but it does cause that specific Svelte file to hot update itself which will cause children components to remount.*