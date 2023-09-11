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
  import { Button } from 'svelte-pieces';
  // import InstrumentPanel from './instrument-panel/InstrumentPanel.svelte';

  const settings = getContext<KitbookSettings>('kitbook-settings');
  if (!settings) {
    console.warn('No settings context found. Do you have a +layout.svelte file in your kitbook folder that sets the kitbook-settings context?')
  };
  const { title, description, expandTree, githubURL } = settings || {};

  $: [kitbookRoot, activePath] = $page.url.pathname.split('kitbook');
  $: kitbookPath = kitbookRoot + 'kitbook';

  let showSidebar = false;
</script>

{kitbookPath} | {activePath}
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

<Button class="bottom-1 right-1 px-2! hidden! md:block! fixed" form="menu" onclick={() => alert('Built with Kitbook. Press "s" to show/hide tree.')}>
  <span class="i-material-symbols-info-outline text-2xl" />
</Button>

<svelte:head>
  <!-- TODO: Update based on title + current page -->
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>
