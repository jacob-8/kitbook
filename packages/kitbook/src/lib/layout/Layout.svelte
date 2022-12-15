<script lang="ts">
  import '../styles/prism-vsc-dark-plus.css';
  import '../styles/tw-prose.css';

  import { setContext } from 'svelte';
  import { page } from '$app/stores';
  import Header from './Header.svelte';
  import Sidebar from '../sidebar/Sidebar.svelte';
  import { putPagesIntoFolders } from '../pages/putPagesIntoFolders';

  export let title = 'Kitbook';
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

    <div class="tw-prose !max-w-full w-[90ch] p-3 pb-16">
      <slot />
    </div>
  </div>
</div>

{#each $$slots as item}
   <!-- content here -->
{/each}

<style>
  :global(pre) {
    /* ! not working in transformer directives yet */
    /* --at-apply: !-mx-3 !md:mx-0 !rounded-none !md:rounded-md */
    margin-left: -0.75rem !important;
    margin-right: -0.75rem !important;
    border-radius: 0rem !important;
  }
  @media (min-width: 768px) {
    :global(pre) {
      margin-left: 0rem !important;
      margin-right: 0rem !important;
      border-radius: 0.375rem !important;
    }
  }
</style>
