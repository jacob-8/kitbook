<script lang="ts">
  import Sidebar from './sidebar/Sidebar.svelte';
  import Windi from './styles/Windi.svelte';
  import type { Folder } from './sidebar/pages';
  export let folder: Folder;
  export let activeURL: string;
  export let githubURL: string = undefined;
</script>

<div class="flex min-h-[100vh]">
  <Sidebar {folder} {activeURL} {githubURL}>
    <svelte:fragment slot="header"><slot name="header" /></svelte:fragment>
    <svelte:fragment slot="index"
      ><slot name="index">
        <span class="i-ic-round-home mr-1" />Kitbook
      </slot></svelte:fragment>
    <svelte:fragment slot="footer"><slot name="footer" /></svelte:fragment>
  </Sidebar>

  <div class="tw-prose max-w-full md:max-w-[90ch] p-3 pb-16">
    <slot />
  </div>
</div>

<Windi />
