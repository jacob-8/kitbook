<script>export let page;
export let activeURL;
export let depth;
$:
  active = activeURL === page.url;
$:
  doesNotHaveSvxOrVariants = !(page.loadSvx || page.loadVariants);
</script>

<a
  class:kb-5tdjyx={doesNotHaveSvxOrVariants}
  class:kb-pg7a1m={active}
  class:kb-3fse5y={active}
  class:kb-old5px={!page.name.startsWith('+page') && !page.name.startsWith('+layout')}
  class="kb-55soev"
  href={page.url}
  style="padding-left: calc(0.75rem * {depth}"
>
  <span
    class="kb-z0iixb"
    class:kb-jumjea={!active}
    class:kb-923o8f={active}
    class:kb-s434qa={active}
  />
  <span class="kb-5faqga" style="overflow-wrap: anywhere;">
    {page.name}
  </span>
</a>

<style>:global(.kb-55soev){display:flex;padding-right:0.75rem;font-size:0.75rem;line-height:1rem;}:global(.kb-923o8f){border-left-width:2px;}:global(.kb-z0iixb){border-left-width:1px;--un-border-opacity:1;border-color:rgba(209,213,219,var(--un-border-opacity));padding-right:0.75rem;}:global(.kb-s434qa,.kb-z0iixb:hover){--un-border-opacity:1;border-color:rgba(29,78,216,var(--un-border-opacity));}:global(.kb-jumjea){border-style:dotted;}:global(.kb-5faqga){padding-top:0.125rem;padding-bottom:0.125rem;}:global(.kb-pg7a1m){font-weight:600;}:global(.kb-old5px){text-transform:capitalize;}:global(.kb-3fse5y){--un-text-opacity:1;color:rgba(37,99,235,var(--un-text-opacity));}:global(.kb-55soev:hover){--un-text-opacity:1;color:rgba(29,78,216,var(--un-text-opacity));}:global(.kb-5tdjyx){opacity:0.6;}</style>