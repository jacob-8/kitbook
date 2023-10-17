<script lang="ts">
  import '@kitbook/mdsvex-shiki-twoslash/shiki-twoslash.css'
  import '../styles/main.css'
  import { settings } from 'virtual:kitbook-settings'
  import Header from './sidebar/Header.svelte'
  import Sidebar from './sidebar/Sidebar.svelte'
  import { putPagesIntoFolders } from './parseModules/putPagesIntoFolders'
  import LayoutPanes from './LayoutPanes.svelte'
  import { findKitbookPath } from './kitbookPath'
  import { page } from '$app/stores'
  // import InstrumentPanel from './instrument-panel/InstrumentPanel.svelte';

  const { title, description, expandTree, githubURL } = settings || {}

  $: ({ kitbookPath, activePath } = findKitbookPath($page.url.pathname))
  let showSidebar = false
</script>

<LayoutPanes>
  <svelte:fragment slot="leftside">
    <Header bind:showSidebar {githubURL} {kitbookPath} {activePath}>
      <slot name="title">{title}</slot>
    </Header>
    <nav class="hidden md:block overflow-y-auto grow-1">
      <Sidebar bind:showSidebar folder={putPagesIntoFolders($page.data.pages)} {kitbookPath} {activePath} expanded={expandTree}>
        <svelte:fragment slot="footer"><slot name="footer" /></svelte:fragment>
      </Sidebar>
    </nav>
  </svelte:fragment>

  <slot />

  <!-- <svelte:fragment slot="instruments">
    <InstrumentPanel />
  </svelte:fragment> -->
</LayoutPanes>

<svelte:head>
  <!-- TODO: Update based on title + current page -->
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>
