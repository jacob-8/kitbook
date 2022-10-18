# svelte-pieces

Warning: `svelte-pieces` does not follow semver as I inadvertently made it version 1.0 too soon.

## 1.0.46

- - Update Button external links to include `noopener noreferrer`

## 1.0.44

- - Switch to using UnoCSS compiled styles for building components.

## 1.0.43

- - Update `<BottomSheet>` to not auto-calculate max-height from content. If content is loading in while the sheet opens, it will be very janky on mobile.

## 1.0.42

- - Stores created with `createdPersistedStore` now remove window storage event listener (as they should) when last subscriber unsubscribes.

## 1.0.41

- - Fix missing `portalTarget` prop in `Header`'s `Menu` component

## 1.0.40

- - Add `QrCode` component

## 1.0.38

- - Update to handle SvelteKit's file/folder naming breaking changes

## 1.0.37

- - `createQueryParamStore` and `<QueryParam>` now use history.replaceState instead of SvelteKit `goto` method when `replaceState: true` so that setting query params from input field update will not break focus on every keystroke

## 1.0.36

- - Rename `<Set>` to `<ReactiveSet>` because of odd Svelte package error that doesn't emit types for a component named "Set"

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
