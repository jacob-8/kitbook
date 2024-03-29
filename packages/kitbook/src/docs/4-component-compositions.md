# Component Compositions

When you're prototyping and documentation needs go beyond simply passing props, context, or a string or component into the default slot, you can use compositions. From any Kitbook page documenting a Svelte component, you can click the "Add Composition" button to create a new composition file. This will create a new file with the same name as the component you're documenting, but with the `composition` extension instead of `svelte`. For example, if you're documenting `MyComponent.svelte`, the first composition file will be `MyComponent.composition`. If you want to create further compositions, click the button again and provide a name. If you choose `foo`, the file will be `MyComponent.foo.composition`. The template documents itself and will help you get started. To look at an example, this Kitbook's [[SearchResult]] page also has a simple composition.

To get these files with the `.composition` extension to work, you'll need to update the extensions property in your svelte config:

```js twoslash title="svelte.config.js" {2}
const config = {
  extensions: ['.svelte', '.composition'],
  // ...
}

export default config
```

Add this VSCode setting:

```json title=".vscode/settings.json"
{
  "files.associations": {
    "*.composition": "svelte"
  }
}
```

You can also create a composition beside a corresponding markdown documentation page as you see in [[complex-examples]] (look at the source code). In cases when you have no companion Svelte component and just markdown, there's no quick button to add a composition but you can still add one manually by creating a new file with the same name, using the `composition` extension instead of `md`.

## Render only on client or only on server

Inside your `.composition` file's context script block you can set either `csr` or `ssr` to false, but not both.

```svelte
<script context="module" lang="ts">
  export const csr = false
// export const ssr = false
</script>
```

Even though components that are only SSR rendered and don't hydrate on the client usually can't have HMR, Kitbook will automatically reload an SSR-only composition (`export const csr = false`) on every change.

## Not for pages or layouts
There are no such things as `+page.svelte` or `+layout.svelte` compositions as these are always root level and just receive props. You never place these inside others components. *Yes, you can pass an actual component to the default slot of a layout so you don't need a composition for this*

Now that you have a composition in place, learn how to [[5-write-documentation|document your components]], including sprinkling in compositions where helpful.

[//begin]: # "Autogenerated link references for markdown compatibility"
[SearchResult]: ../lib/layout/sidebar/search/SearchResult.md "SearchResult"
[complex-examples]: 2-compositions/complex-examples.md "Advanced Composition Use Cases"
[5-write-documentation|document your components]: 5-write-documentation.md "Write Documentation"
[//end]: # "Autogenerated link references"