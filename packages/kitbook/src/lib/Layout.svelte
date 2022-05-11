<script lang="ts">
  import Header from './Header.svelte';
  import Sidebar from './sidebar/Sidebar.svelte';
  import Windi from './styles/Windi.svelte';
  export let title = 'Kitbook';
  export let githubURL: string = undefined;

  import { page } from '$app/stores';
  $: root = $page.stuff.kitbook.root;

  let showSidebar = false;
</script>

<div class="min-h-[100vh]">
  <Header bind:showSidebar {githubURL} {root}>
    <svelte:fragment slot="title"
      ><slot name="title"><span class="i-ic-round-home text-2xl mr-2px" />{title}</slot
      ></svelte:fragment
    >
  </Header>

  <div class="flex">
    <Sidebar
      bind:showSidebar
      folder={$page.stuff.kitbook.folder}
      activeURL={$page.url.pathname}
      {root}
    >
      <svelte:fragment slot="footer"><slot name="footer" /></svelte:fragment>
    </Sidebar>

    <div class="tw-prose max-w-full w-[90ch] p-3 pb-16">
      <slot />

      <div class="text-center my-5">
        <a
          href={githubURL + '/src/routes' + (root || '') + ($page.url.pathname === '/' ? '/index' : $page.url.pathname) + '.md'}
          class="text-blue-600 flex items-center justify-center"
          target="_blank"
        >
          <span class="i-iconoir-page-edit text-lg mr-1" />Edit page on GitHub (TODO: change url extension if not .md)</a
        >
      </div>
    </div>
  </div>
</div>

<Windi />
