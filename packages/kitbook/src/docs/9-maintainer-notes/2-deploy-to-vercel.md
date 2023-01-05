# Deploy to Vercel

Here's how we deployed Kitbook to Vercel written here for maintenance reference.

- Create a new Vercel project from this repo and choose the SvelteKit framework preset
- Set the root folder to `packages/kitbook`
- Add custom build command: `pnpm build`
- Add custom install command: `pnpm install`, *use `pnpm install --unsafe-perm` if you need svelte-kit sync to run in a separate library*.

## Ignoring unrelated updates in monorepo

- As explained in this [support article](https://vercel.com/support/articles/how-do-i-use-the-ignored-build-step-field-on-vercel), you can add `git diff --quiet HEAD^ HEAD .` to the Git/Ignored Build Step field to only deploy your Kitbook when its project has changes.
