# Add the Kitbook Extension

This is NOT PUBLISHED YET but will be once it's ready: Add the "jacob-8.kitbook-vscode" extension to receive a few editing convenience helpers:

- Press `alt+x` to toggle on and off the following setting:
```json title=".vscode/settings.json" {2}
"files.associations": {
  "*.md": "svelte"
}
```

This allows you to easily switch between using markdown language services (and convenient markdown features like making a selection **bold** upon pressing `ctrl+b` if you have the [Markdown All in One extension](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) installed) or svelte language services depending on whether you are authoring text or a `<Story>`.

## Future plans

It would be very easy to update the extension to be able to easily add Story or Variant files next to existing Svelte components without having to write out the little bit of boilerplate these files require. This would be similar to how the Svelte extension lets you easily add route files from the "SvelteKit Files" context menu option.