<script>export let showSidebar = false;
export let githubURL = void 0;
export let activeURL;
let root = "/";
</script>

<header class="kb-bxbrfn">
  <button
    class="kb-nrijqr"
    on:click={() => (showSidebar = !showSidebar)}
  >
    <i class="i-ic-round-menu" />
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
      class="kb-u2usok"
      href={githubURL}
      target="_blank"
      rel="noopener noreferrer"
      title="View GitHub Repo"
    >
      <span class="i-mdi-github" />
    </a>
  {/if}
</header>

<style>:global(.kb-bxbrfn){position:sticky;top:0rem;z-index:10;display:flex;padding:0.25rem;}:global(.kb-nrijqr){display:flex;align-items:center;padding:0.5rem;font-size:1.5rem;line-height:2rem;font-weight:600;}:global(.kb-u2usok){display:flex;align-items:center;border-radius:0.25rem;padding:0.5rem;font-size:1.125rem;line-height:1.75rem;font-weight:600;}:global(.kb-xfticd){display:flex;align-items:center;padding:0.5rem;font-size:1.125rem;line-height:1.75rem;font-weight:600;-webkit-text-decoration-color:rgba(30,64,175,var(--un-line-opacity));--un-line-opacity:1;text-decoration-color:rgba(30,64,175,var(--un-line-opacity));}:global(.kb-p1z4z0){flex:1 1 0%;}:global(.kb-u2usok:hover){--un-bg-opacity:1;background-color:rgba(229,231,235,var(--un-bg-opacity));}:global(.kb-tujodq){--un-text-opacity:1;color:rgba(37,99,235,var(--un-text-opacity));}:global(.kb-xfticd:hover){--un-text-opacity:1;color:rgba(29,78,216,var(--un-text-opacity));}@media (min-width: 768px){:global(.kb-nrijqr){display:none;}}
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
