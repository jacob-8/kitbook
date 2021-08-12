# Svelte-Ui
To install components I use across projects run `npm i -D @jwrunner/svelte-ui` though svelte-kit package is still buggy with not all components being typed properly (see Store.svelte w/ the Generic type for example)

## To update NPM package
Run `npm version patch` which will bump from 1.0.2 to 1.0.3 for example and then commit the changes, and push changes to GitHub which will automatically fire off an NPM publish

## To develop using Svench (like Storybook)
Run `npx svench`

## Preview
Run `npx svench build` and `npx sirv-cli /.svench/build` to preview locally or view at __________.

### Components TODO
CKEditor
