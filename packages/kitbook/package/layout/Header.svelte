<script>export let showSidebar = false;
export let githubURL = void 0;
export let activeURL;
let root = "/";
</script>

<header class="kb-r4pgvh">
  <button
    class="kb-nrijqr"
    on:click={() => (showSidebar = !showSidebar)}
  >
    <i class="kb-8owzq6" />
  </button>
  <a
    href={root}
    class:kb-tujodq={activeURL === root}
    class="kb-xfticd"
  >
    <slot>Kitbook</slot>
  </a>
  <div class="kb-p1z4z0" />
  <!-- <Button form="menu">Dark mode</Button> -->

  {#if githubURL}
    <a
      class="kb-av7z3r"
      href={githubURL}
      target="_blank"
      rel="noopener noreferrer"
      title="View GitHub Repo"
    >
      <span class="kb-drcaar" />
    </a>
  {/if}
</header>

<style>:global(.kb-8owzq6){--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z'/%3E%3C/svg%3E");mask:var(--un-icon) no-repeat;mask-size:100% 100%;-webkit-mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;background-color:currentColor;color:inherit;display:inline-block;vertical-align:middle;width:1em;height:1em;}:global(.kb-drcaar){--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z'/%3E%3C/svg%3E");mask:var(--un-icon) no-repeat;mask-size:100% 100%;-webkit-mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;background-color:currentColor;color:inherit;display:inline-block;vertical-align:middle;width:1em;height:1em;}:global(.kb-r4pgvh){position:sticky;top:0rem;z-index:10;display:flex;border-bottom-width:1px;--un-border-opacity:1;border-color:rgba(209,213,219,var(--un-border-opacity));--un-bg-opacity:1;background-color:rgba(255,255,255,var(--un-bg-opacity));padding:0.25rem;}:global(.kb-av7z3r){display:flex;align-items:center;border-radius:0.25rem;padding:0.5rem;font-size:1.125rem;line-height:1.75rem;font-weight:600;}:global(.kb-nrijqr){display:flex;align-items:center;padding:0.5rem;font-size:1.5rem;line-height:2rem;font-weight:600;}:global(.kb-xfticd){display:flex;align-items:center;padding:0.5rem;font-size:1.125rem;line-height:1.75rem;font-weight:600;-webkit-text-decoration-color:rgba(30,64,175,var(--un-line-opacity));--un-line-opacity:1;text-decoration-color:rgba(30,64,175,var(--un-line-opacity));}:global(.kb-p1z4z0){flex:1 1 0%;}:global(.kb-av7z3r:hover){--un-bg-opacity:1;background-color:rgba(243,244,246,var(--un-bg-opacity));}:global(.kb-tujodq){--un-text-opacity:1;color:rgba(37,99,235,var(--un-text-opacity));}:global(.kb-xfticd:hover){--un-text-opacity:1;color:rgba(29,78,216,var(--un-text-opacity));}@media (min-width: 768px){:global(.kb-nrijqr){display:none;}}</style>