<script lang="ts">
  import Header from './Header.svelte';
  import Sidebar from './sidebar/Sidebar.svelte';
  import Windi from './styles/Windi.svelte';
  export let githubURL: string = undefined;

  import { page } from '$app/stores';
  let showSidebar = false;
</script>

<div class="min-h-[100vh]">
  <Header bind:showSidebar>
    <svelte:fragment slot="title"
      ><slot name="title"><span class="i-ic-round-home mr-1" />Kitbook</slot></svelte:fragment
    >
  </Header>

  <div class="flex">
    <Sidebar bind:showSidebar folder={$page.stuff.folder} activeURL={$page.url.pathname} {githubURL}>
      <svelte:fragment slot="footer"><slot name="footer" /></svelte:fragment>
    </Sidebar>

    <div class="tw-prose max-w-full md:max-w-[90ch] p-3 pb-16">
      <slot />
    </div>
  </div>
</div>

<Windi />
