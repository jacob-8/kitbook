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

<div class="kb-4w0upo">
  <Header bind:showSidebar {githubURL} {activeURL}>
    <slot name="title"><span class="kb-vmkumz" />{title}</slot>
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

<style>:global(.kb-vmkumz){--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z'/%3E%3C/svg%3E");mask:var(--un-icon) no-repeat;mask-size:100% 100%;-webkit-mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;background-color:currentColor;color:inherit;display:inline-block;vertical-align:middle;width:1em;height:1em;margin-right:2px;font-size:1.5rem;line-height:2rem;}:global(.kb-4w0upo){min-height:100vh;--un-bg-opacity:1;background-color:rgba(243,244,246,var(--un-bg-opacity));}:global(.kb-o290my){max-width:100%;width:90ch;padding:0.75rem;padding-bottom:4rem;}:global(.kb-j2jlfv){display:flex;}</style>