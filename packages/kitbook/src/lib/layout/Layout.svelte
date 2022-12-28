<script lang="ts">
  import '@kitbook/mdsvex-shiki-twoslash/shiki-twoslash.css';
  import '../styles/main.css';

  import { setContext } from 'svelte';
  import { page } from '$app/stores';
  import Header from './Header.svelte';
  import Sidebar from '../sidebar/Sidebar.svelte';
  import { putPagesIntoFolders } from '../pages/putPagesIntoFolders';
  import { SplitPane } from 'svelte-pieces';
  import InstrumentPanel from '$lib/instrument-panel/InstrumentPanel.svelte';

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

<div class="h-full">
  <SplitPane min={0} pos={15}>
    <div class="h-full bg-gray-100" slot="a">
      <Header bind:showSidebar {githubURL} {activeURL}>
        <slot name="title"><span class="i-ic-round-home text-2xl mr-2px" />{title}</slot>
      </Header>

      <Sidebar bind:showSidebar {folder} {activeURL} {expanded}>
        <svelte:fragment slot="footer"><slot name="footer" /></svelte:fragment>
      </Sidebar>
    </div>

    <svelte:fragment slot="b">
      <SplitPane pos={75} min={20} max={100}>
        <section class="h-full" slot="a">
          <slot />
        </section>
        <section class="h-full bg-gray-100" slot="b">
          <InstrumentPanel />
        </section>
      </SplitPane>
    </svelte:fragment>
  </SplitPane>
</div>

<svelte:head>
  <!-- TODO: Update based on title + current page -->
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>
