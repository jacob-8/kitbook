# kitbook

## 1.0.0-alpha.28 - 2023-3-29

### Patch Changes

- update package.json type exports so kitbook plugin types are available again

## 1.0.0-alpha.27 - 2023-3-29

### Patch Changes

- Add notice that there's no need to adjust the tsconfig extend target
- Updated dependencies
  - @kitbook/vite-plugin-kitbook@0.0.8

## 1.0.0-alpha.26 - 2023-3-29

- update to using svelte-package 2.0.0

## 1.0.0-alpha.24 - 2023-3-14

- [breaking] pass pagesStore via context in the WrapRootLayout.svelte file to turn HMR on. To update add these lines to `.kitbook/WrapRootLayout.svelte`:

```ts
import { pagesStore } from 'kitbook';
setContext('pages-store', pagesStore);
```

## 1.0.0-alpha.23 - 2023-3-10

- add ability to pass in custom module globs to scan for Kitbook files using the `fileGlobs` array property passed to the `kitbook` plugin. This is useful for incremental adoption of Kitbook.
- [breaking] rename `userSpecifiedViteConfigAdjustments` property passed to `kitbook` plugin to `viteConfigAdjustments`

## 1.0.0-alpha.21 - 2023-2-24

- Use internal esm port of lz-string to avoid cjs import challenges.

## 1.0.0-alpha.19 - 2023-1-15

- [breaking] load routes from `node_modules/kitbook` and use virtual module to achieve HMR. A Kitbook routes folder is no longer needed in consuming projects.
- Added a `.kitbook/init.ts` file to give an async initialization option for Kitbook's that need it (e.g. i18n)
- Added a `.kitbook/WrapRootLayout.svelte` to contain a settings context option to pass settings to your Kitbook like the title. Other needed global context items could also be added to this file.

## 1.0.0-alpha.18 - 2023-1-10

- - Keep `variants.ts` file updates from causing full page reload by improving HMR via using a self accepting HMR store.
  - Fix: Use `.vite-kitbook` as the default `cacheDir` to allow Kitbook to run at the same time as a normal app without conflict.

## 1.0.0-alpha.10 - 2023-1-5

- - Load View once visible (intersecting viewport)

## 1.0.0-alpha.7 - 2023-1-3

- - Bug fixes
  - [deprecated] change `let:props` to `let:knobs` in the `<Story>` component to open way for automatic component props in future

## 1.0.0-alpha.4 - 2022-12-31

- Improvements to View: resizing and refreshable when using iframe

## 1.0.0-alpha.2 - 2022-12-28

### Major Changes

- Update to using SvelteKit 1.0
- [breaking] Move away from using routes for every story file so that stories can be colocated by the applicable Svelte component. To migrate you'll need to change your stories files that were pages (`foo/+page.svx`) into colocated story files next to your component (`Foo.md`)
- Add Vite plugin to simplify the set-up process. No longer do you need to install MDSvex nor add styles. See `packages/kitbook/src/docs` for new setup instructions to know how to remove unneeded items. But you really shouldn't be using the alpha yet - I'm just trying to distribute amongst my projects at the moment to iron out all the changes.

## 0.0.24

- - Switch to using UnoCSS's compiled styles, classes will no longer duplicate with any other CSS framework

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

---

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
