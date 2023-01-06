<script>import "@kitbook/mdsvex-shiki-twoslash/shiki-twoslash.css";
import "../styles/main.css";
import { setContext } from "svelte";
import { page } from "$app/stores";
import Header from "./sidebar/Header.svelte";
import Sidebar from "./sidebar/Sidebar.svelte";
import { putPagesIntoFolders } from "./parseModules/putPagesIntoFolders";
import LayoutPanes from "./LayoutPanes.svelte";
import InstrumentPanel from "./instrument-panel/InstrumentPanel.svelte";
export let title = "Kitbook";
export let description = "Svelte Component Documentation and Prototyping Workbench built using SvelteKit";
export let expanded = false;
export let githubURL = "";
setContext("githubUrl", githubURL);
$:
  folder = putPagesIntoFolders($page.data.pages);
$:
  activeURL = $page.url.pathname;
let showSidebar = false;
</script>

<LayoutPanes>
  <svelte:fragment slot="leftside">
    <Header bind:showSidebar {githubURL} {activeURL}>
      <slot name="title">{title}</slot>
    </Header>
    <nav class="kb-b2iecn">
      <Sidebar bind:showSidebar {folder} {activeURL} {expanded}>
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

<style>:global(.kb-b2iecn){display:none;flex-grow:1;overflow-y:auto;}@media (min-width: 768px){:global(.kb-b2iecn){display:block;}}</style>