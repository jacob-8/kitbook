# Deploy to Vercel

**Here's how we deployed Kitbook to Vercel. This is only for maintenance reference, but you can also implement in your repo if desired.**

- Create a new Vercel project from this repo and choose the SvelteKit framework preset
- Set the root folder to `packages/kitbook`
- Add custom build command: `pnpm build`
- Add custom install command: `pnpm install`, use `pnpm install --unsafe-perm` if you need svelte-kit sync to run in a separate library.
- As explained in this [support article](https://vercel.com/support/articles/how-do-i-use-the-ignored-build-step-field-on-vercel), add `git diff --quiet HEAD^ HEAD .` to the Git/Ignored Build Step field to only deploy Kitbook when the `packages/kitbook` folder has changes.
  - Note that in a monorepo where your site and components library are both in a shared `packages/` directory, for example, you can use `git diff --quiet HEAD^ HEAD .` in a Vercel project which relies on a sibling package. This will run your deployment if a sibling package is also updated. 
