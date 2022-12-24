<script>import "@kitbook/mdsvex-shiki-twoslash/shiki-twoslash.css";
import "../styles/main.css";
import { setContext } from "svelte";
import { page } from "$app/stores";
import Header from "./Header.svelte";
import Sidebar from "../sidebar/Sidebar.svelte";
import { putPagesIntoFolders } from "../pages/putPagesIntoFolders";
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

<div class="kb-egtdtj">
  <Header bind:showSidebar {githubURL} {activeURL}>
    <slot name="title"><span class="kb-cklxom i-ic-round-home" />{title}</slot>
  </Header>

  <div class="kb-j2jlfv">
    <Sidebar bind:showSidebar {folder} {activeURL} {expanded}>
      <svelte:fragment slot="footer"><slot name="footer" /></svelte:fragment>
    </Sidebar>

    <div class="kb-o290my tw-prose">
      <slot />
    </div>
  </div>
</div>

<svelte:head>
  <!-- TODO: Update based on title + current page -->
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

<style>:global(.kb-cklxom){margin-right:2px;font-size:1.5rem;line-height:2rem;}:global(.kb-egtdtj){min-height:100vh;}:global(.kb-o290my){max-width:100%;width:90ch;padding:0.75rem;padding-bottom:4rem;}:global(.kb-j2jlfv){display:flex;}</style>