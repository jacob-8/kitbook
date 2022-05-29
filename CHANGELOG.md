# svelte-pieces

## 1.0.21

- - Removed header cell styling from `ResponsiveTable.svelte` and added `stickyHeading` and `stickyColumn` options.

## 1.0.13

### Hotfix
- - Downgrade SvelteKit to @sveltejs/kit@1.0.0-next.314 to avoid problem described in https://github.com/sveltejs/kit/issues/4764

## 1.0.12

### Patch Changes

- - Add changesets
  - Update SvelteKit package
  - [Breaking] Note: if you previously used `<Button form="primary"...` that attribute was changed to `<Button form="filled"` several versions back before changesets were in use (yes, semver isn't supposed to have breaking changes, but switch to 1.0.0 too soon).
