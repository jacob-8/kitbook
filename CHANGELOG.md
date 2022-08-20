# kitbook

## 0.0.23

- - Improve remark code preview plugin to allow backticks inside a `Story` block
 
## 0.0.21

- - Add `expanded` prop to `<Layout>` if desiring to start with folder tree already expanded.
  - Add ability to start off with code preview showing by adding `showCode` prop to `Story` 

## 0.0.20

- - Update to handle SvelteKit's file/folder naming breaking changes

## 0.0.18

- - Add code preview to `<Story>` using remark plugin

## 0.0.17

- - switch from using `svelte-store-router` to `svelte-pieces` `QueryParam` component for `Knobs`

## 0.0.16

- - Add color knob, shown when a value similar to `#000000` is used

## 0.0.15

- - Using `<ResponsiveSlideover>` for sidebar menu and improved header styling


# svelte-pieces

Warning: `svelte-pieces` does not follow semver as I inadvertently made it version 1.0 too soon.

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
