<script>import { Button } from "svelte-pieces";
export let page;
export let active = false;
</script>

<Button form="menu" class="kb-sxblpr" href={page.url} {active}>
  <div class="kb-iz47nk">
    <div class="kb-v77nb5">
      {page.name}
    </div>
    <div class="kb-nkhzap">
      {page.url} ({page.extensions})
    </div>
  </div>
</Button>

<style>:global(.kb-sxblpr){width:100%;border-radius:0rem !important;}:global(.kb-iz47nk){text-align:left;}:global(.kb-nkhzap){font-size:0.75rem;line-height:1rem;font-weight:400;}:global(.kb-v77nb5){text-transform:capitalize;}</style>