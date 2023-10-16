# Deploy to Vercel

Here's how we deployed Kitbook to Vercel written here for maintenance reference.

- Create a new Vercel project from this repo and choose the SvelteKit framework preset
- Set the root folder to `packages/kitbook`
- Add custom build command: `pnpm build`
- Add custom install command: `pnpm install`, *use `pnpm install --unsafe-perm` if you need svelte-kit sync to run in a separate library*.

