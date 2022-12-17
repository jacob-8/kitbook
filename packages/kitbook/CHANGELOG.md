# kitbook

## Unreleased

### Major Changes

- Update to using SvelteKit 1.0
- [breaking] Move away from using routes for every story file so that stories can be colocated by the applicable Svelte component.
- Add Vite plugin to simplify the set-up process. No longer do you need to install MDSvex nor add styles. See the [Kitbook docs](https://kitbook.vercel.app/) for new setup instructions to know how to remove unneeded items.

## 1.0.0-alpha.1 - 2022-12-17

- This version is **not** ready for use, but is being published to surface styles for CDN usage via [unpkg](https://unpkg.com/).


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
