# Svelte-Ui
To install components that I use across projects you can run `npm i -D @jwrunner/svelte-ui` though because svelte-kit package is still buggy with not all components being typed properly (Store.svelte use of the new $$Generic type cause the type-creator to skip that component for example), I presently just copy components into a mirrored `src/shared` directory in my projects to use components.

## To update NPM package
Run `npm version patch` which will bump from 1.0.2 to 1.0.3 for example and then commit the changes, and push changes to GitHub which will automatically fire off an NPM publish

## To develop using Svench (like Storybook)
Run `npx svench` - note that sometimes you have to run `npx svench` a couple times before it will fire up (bug). Do note that if it just hangs with no luck after multiple tries, then you have induced a syntax error. It won't tell you about the error but if you undo your changes and things fire up then you just have to dig in and find the error.

## Preview
Run `npx svench build` and `npx sirv-cli /.svench/build` to preview locally or view at https://jwrunner-svelte-ui.vercel.app/.

### Components TODO
CKEditor
