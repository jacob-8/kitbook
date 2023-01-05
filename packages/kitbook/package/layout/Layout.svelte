<script>import "@kitbook/mdsvex-shiki-twoslash/shiki-twoslash.css";
import "../styles/main.css";
import { setContext } from "svelte";
import { page } from "$app/stores";
import Header from "./sidebar/Header.svelte";
import Sidebar from "./sidebar/Sidebar.svelte";
import { putPagesIntoFolders } from "./parseModules/putPagesIntoFolders";
import { SplitPane } from "svelte-pieces";
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

<div class="kb-cjzbcu">
  <SplitPane min={0} pos={15}>
    <div class="kb-la70d7" slot="a">
      <Header bind:showSidebar {githubURL} {activeURL}>
        <slot name="title">{title}</slot>
      </Header>

      <div class="kb-q2eyi1">
        <Sidebar bind:showSidebar {folder} {activeURL} {expanded}>
          <svelte:fragment slot="footer"><slot name="footer" /></svelte:fragment>
        </Sidebar>
      </div>
    </div>

    <svelte:fragment slot="b">
      <SplitPane pos={75} min={20} max={100}>
        <section class="kb-cjzbcu" slot="a">
          <slot />
        </section>
        <section class="kb-1l52p7" slot="b">
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

<style>:global(.kb-1l52p7){height:100%;--un-bg-opacity:1;background-color:rgba(243,244,246,var(--un-bg-opacity));}:global(.kb-cjzbcu){height:100%;}:global(.kb-la70d7){height:100%;display:flex;flex-direction:column;--un-bg-opacity:1;background-color:rgba(243,244,246,var(--un-bg-opacity));padding-right:0.5rem;}:global(.kb-q2eyi1){flex-grow:1;overflow-y:auto;}</style>