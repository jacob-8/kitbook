<script>export let page;
export let activeURL;
export let depth;
$:
  active = activeURL === page.url;
$:
  doesNotHaveSvxOrVariants = !(page.loadSvx || page.loadVariants);
</script>

<a
  class:kb-desl8l={doesNotHaveSvxOrVariants}
  class:kb-ajpk8g={active}
  class:kb-0j0evg={active}
  class:kb-f82yap={!page.name.startsWith('+page') && !page.name.startsWith('+layout')}
  class="kb-0a3ge3"
  href={page.url}
  style="padding-left: calc(0.75rem * {depth}"
>
  <span
    class="kb-phvx4z"
    class:kb-3vbtjs={!active}
    class:kb-1sw1cz={active}
    class:kb-6bsk7s={active}
  />
  <span class="kb-ubfyhs" style="overflow-wrap: anywhere;">
    {page.name}
  </span>
</a>

<style>:global(.kb-0a3ge3){display:flex;padding-right:0.75rem;font-size:0.75rem;line-height:1rem;}:global(.kb-1sw1cz){border-left-width:2px;}:global(.kb-phvx4z){border-left-width:1px;--un-border-opacity:1;border-color:rgba(209,213,219,var(--un-border-opacity));padding-right:0.75rem;}:global(.kb-6bsk7s,.kb-phvx4z:hover){--un-border-opacity:1;border-color:rgba(29,78,216,var(--un-border-opacity));}:global(.kb-3vbtjs){border-style:dotted;}:global(.kb-ubfyhs){padding-top:0.125rem;padding-bottom:0.125rem;}:global(.kb-ajpk8g){font-weight:600;}:global(.kb-f82yap){text-transform:capitalize;}:global(.kb-0a3ge3:hover){--un-text-opacity:1;color:rgba(29,78,216,var(--un-text-opacity));}:global(.kb-0j0evg){--un-text-opacity:1;color:rgba(37,99,235,var(--un-text-opacity));}:global(.kb-desl8l){opacity:0.6;}</style>