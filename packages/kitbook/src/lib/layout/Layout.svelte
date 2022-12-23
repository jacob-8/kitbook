<script lang="ts">
  import '@kitbook/mdsvex-shiki-twoslash/shiki-twoslash.css';
  import '../styles/main.css';

  import { setContext } from 'svelte';
  import { page } from '$app/stores';
  import Header from './Header.svelte';
  import Sidebar from '../sidebar/Sidebar.svelte';
  import { putPagesIntoFolders } from '../pages/putPagesIntoFolders';

  export let title = 'Kitbook';
  export let description =
    'Svelte Component Documentation and Prototyping Workbench built using SvelteKit';
  export let expanded = false;
  export let githubURL = '';
  setContext<string>('githubUrl', githubURL);

  $: folder = putPagesIntoFolders($page.data.pages);
  $: activeURL = $page.url.pathname;

  let showSidebar = false;
</script>

<div class="min-h-[100vh]">
  <Header bind:showSidebar {githubURL} {activeURL}>
    <slot name="title"><span class="i-ic-round-home text-2xl mr-2px" />{title}</slot>
  </Header>

  <div class="flex">
    <Sidebar bind:showSidebar {folder} {activeURL} {expanded}>
      <svelte:fragment slot="footer"><slot name="footer" /></svelte:fragment>
    </Sidebar>

    <div class="tw-prose max-w-full w-[90ch] p-3 pb-16">
      <slot />
    </div>
  </div>
</div>

<svelte:head>
  <!-- TODO: Update based on title + current page -->
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>
