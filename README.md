# Svelte Pieces
To install components run `npm i -D svelte-pieces`

## To update NPM package
Run `npm version patch` which will bump from 1.0.2 to 1.0.3 for example and then commit the changes, and push changes to GitHub which will automatically fire off an NPM publish

## To develop using Svench (like Storybook)
Run `npx svench` - note that sometimes you have to run `npx svench` a couple times before it will fire up (bug). Do note that if it just hangs with no luck after multiple tries, then you have induced a syntax error. It won't tell you about the error but if you undo your changes and things fire up then you just have to dig in and find the error.

## Preview
Run `npx svench build` and `npx sirv-cli /.svench/build` to preview locally or view at https://svelte-ui-three.vercel.app/

### TODO
- Add CKEditor
- upgrade Tailwind and don't make components have to depend on Tailwind