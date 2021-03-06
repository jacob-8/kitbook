# kitbook

## 0.0.16

- - Add color knob, shown when a value similar to `#000000` is used

## 0.0.15

- - Using `<ResponsiveSlideover>` for sidebar menu and improved header styling


# svelte-pieces

## 1.0.31

- - Added `<BottomSheet>` component

## 1.0.24

- - Added `<Slideover>` and `<ResponsiveSlideover>` components

## 1.0.23

- - Added `createPersistedStore`, `createQueryParamStore`, and `<QueryParam>` component

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
