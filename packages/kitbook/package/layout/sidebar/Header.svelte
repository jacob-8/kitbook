<script>import { Button } from "svelte-pieces";
import LaunchSearch from "./search/LaunchSearch.svelte";
export let showSidebar = false;
export let githubURL = void 0;
export let activeURL;
let root = "/";
</script>

<header class="kb-2m3tcw">
  <button
    class="kb-s94s03"
    on:click={() => (showSidebar = !showSidebar)}
  >
    <i class="kb-1oo2o6" />
  </button>
  <a
    href={root}
    class:kb-kcsgdy={activeURL === root}
    class="kb-9uflaz"
  >
    <slot>Kitbook</slot>
  </a>
  <div class="kb-lpfug0" />

  <LaunchSearch />

  {#if githubURL}
    <Button
      form="menu"
      size="sm"
      href={githubURL}
      target="_blank"
      title="View GitHub Repo"
      class="kb-siynxj"
    >
      <span class="kb-skok2g" />
    </Button>
  {/if}
</header>

<style>:global(.kb-1oo2o6){--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z'/%3E%3C/svg%3E");mask:var(--un-icon) no-repeat;mask-size:100% 100%;-webkit-mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;background-color:currentColor;color:inherit;display:inline-block;vertical-align:middle;width:1em;height:1em;}:global(.kb-skok2g){--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z'/%3E%3C/svg%3E");mask:var(--un-icon) no-repeat;mask-size:100% 100%;-webkit-mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;background-color:currentColor;color:inherit;display:inline-block;vertical-align:middle;width:1em;height:1em;font-size:1.125rem;line-height:1.75rem;}:global(.kb-2m3tcw){width:100%;display:flex;flex-wrap:wrap;padding-top:0.25rem;padding-bottom:0.25rem;padding-left:0.25rem;}:global(.kb-9uflaz){display:flex;align-items:center;overflow-x:hidden;padding:0.5rem;font-size:1.125rem;line-height:1.75rem;font-weight:600;-webkit-text-decoration-color:rgba(30,64,175,var(--un-line-opacity));--un-line-opacity:1;text-decoration-color:rgba(30,64,175,var(--un-line-opacity));}:global(.kb-s94s03){display:flex;align-items:center;padding:0.5rem;font-size:1.5rem;line-height:2rem;font-weight:600;}:global(.kb-siynxj){display:flex !important;align-items:center;}:global(.kb-lpfug0){flex:1 1 0%;}:global(.kb-9uflaz:hover){--un-text-opacity:1;color:rgba(29,78,216,var(--un-text-opacity));}:global(.kb-kcsgdy){--un-text-opacity:1;color:rgba(37,99,235,var(--un-text-opacity));}@media (min-width: 768px){:global(.kb-s94s03){display:none;}}
  @supports not (
    (backdrop-filter: saturate(50%) blur(8px)) or (-webkit-backdrop-filter: saturate(50%) blur(8px))
  ) {
    header {
      --un-bg-opacity:1;background-color:rgba(243,244,246,var(--un-bg-opacity));;
    }
  }
  @supports (
    (backdrop-filter: saturate(50%) blur(8px)) or (-webkit-backdrop-filter: saturate(50%) blur(8px))
  ) {
    header {
      -webkit-backdrop-filter: saturate(50%) blur(8px);
      backdrop-filter: saturate(50%) blur(8px);
    }
  }
</style>
