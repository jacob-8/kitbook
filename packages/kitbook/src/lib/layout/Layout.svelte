<script lang="ts">
  import '@kitbook/mdsvex-shiki-twoslash/shiki-twoslash.css';
  import '../styles/main.css';

  import type { KitbookSettings } from 'kitbook';
  import { getContext } from 'svelte';
  import { page } from '$app/stores';
  import Header from './sidebar/Header.svelte';
  import Sidebar from './sidebar/Sidebar.svelte';
  import { putPagesIntoFolders } from './parseModules/putPagesIntoFolders';
  import LayoutPanes from './LayoutPanes.svelte';
  import InstrumentPanel from './instrument-panel/InstrumentPanel.svelte';

  const settings = getContext<KitbookSettings>('kitbook-settings');
  const { title, description, expandTree, githubURL } = settings;

  $: folder = putPagesIntoFolders($page.data.pages);
  $: activeURL = $page.url.pathname;

  let showSidebar = false;
</script>

<LayoutPanes>
  <svelte:fragment slot="leftside">
    <Header bind:showSidebar {githubURL} {activeURL}>
      <slot name="title">{title}</slot>
    </Header>
    <nav class="hidden md:block overflow-y-auto grow-1">
      <Sidebar bind:showSidebar {folder} {activeURL} expanded={expandTree}>
        <svelte:fragment slot="footer"><slot name="footer" /></svelte:fragment>
      </Sidebar>
    </nav>
  </svelte:fragment>

  <svelte:fragment slot="instruments">
    <InstrumentPanel />
  </svelte:fragment>
  <slot />
</LayoutPanes>

<svelte:head>
  <!-- TODO: Update based on title + current page -->
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>
