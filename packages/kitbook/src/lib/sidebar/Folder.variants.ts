import type { Variants } from '$lib';
import type Folder from './Folder.svelte';

// TODO: Use props array to automatically create variant stories for a particular Svelte file
export const variants: Variants<typeof Folder> = [
  {
    name: 'First',
    props: {
      activeURL: 'foo',
      folder: {
        name: '.',
        url: '/',
        depth: 0,
        folders: [],
        pages: [],
      }
    },
  },
  // {
  //   name: 'Second',
  //   props: {
  //     activeURL: 'bar',
  //     folder: null
  //   },
  // }
]

// Note, can't do the same with slots as Svelte doesn't allow for dynamically named slots

// import { svelte2tsx } from 'svelte2tsx';
// import FolderRaw from './Folder.svelte?raw';
// console.log(svelte2tsx(FolderRaw))