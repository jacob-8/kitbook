# Customization

Feel free to create your own custom load file:
And a `+layout.ts` file with:
- Pass in the title of your Kitbook, or alternatively use the `title` slot of the `Layout` component if you want to change more than just the string (to use a different icon or a logo for example)
- There is an optional `footer` slots in the sidebar which is placed beneath the navigation tree and above the "Created with Kitbook" link.
- See https://vitejs.dev/guide/features.html#glob-import to learn more about the glob import and note that you should adjust the `{md,svelte}` file endings to suit your purposes in accordance with how you've set up MDSvex extensions. As we are not resolving the returned Promise functions that would load each module, we don't need to be concerned about speed issues from using `import.meta.glob('./**/*.{md,svelte}')` when our Kitbook gets large.
