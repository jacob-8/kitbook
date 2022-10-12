<script lang="ts">
  import './styles/prism-vsc-dark-plus.css';
  import './tw-prose.css';

  import { page } from '$app/stores';
  import Header from './Header.svelte';
  import Sidebar from './sidebar/Sidebar.svelte';
  import { parsePages, putPagesIntoFolders, findActivePage } from './sidebar/pages';

  export let title = 'Kitbook';
  export let githubURL: string = undefined;
  export let expanded = false;

  $: root = $page.data.kitbook.root;
  $: pages = parsePages($page.data.kitbook.modules);
  $: folder = putPagesIntoFolders(pages);
  $: activePage = findActivePage(pages, $page.url.pathname);
  $: activeURL = $page.url.pathname;

  let showSidebar = false;
</script>

<div class="min-h-[100vh]">
  <Header bind:showSidebar {githubURL} {activeURL} {root}>
    <svelte:fragment slot="title"
      ><slot name="title"><span class="i-ic-round-home text-2xl mr-2px" />{title}</slot
      ></svelte:fragment
    >
  </Header>

  <div class="flex">
    <Sidebar bind:showSidebar {folder} {activeURL} {root} {expanded}>
      <svelte:fragment slot="footer"><slot name="footer" /></svelte:fragment>
    </Sidebar>

    <div class="tw-prose max-w-full w-[90ch] p-3 pb-16">
      <slot />

      {#if githubURL}
        <a
          href={githubURL + '/src/routes' + (root || '') + activePage.path.substring(1)}
          class="text-blue-500 hover:text-blue-600 flex items-center my-5"
          target="_blank"
        >
          <span class="i-iconoir-page-edit text-lg mr-1" />Edit page on GitHub</a
        >
      {/if}
    </div>
  </div>
</div>

<style>
  :global(pre) {
    --at-apply: !-mx-3 md:!mx-0 !rounded-none md:!rounded-md
  }
</style>
