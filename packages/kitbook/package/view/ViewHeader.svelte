<script>import { createEventDispatcher } from "svelte";
export let title;
export let description = void 0;
export let height = void 0;
export let width = void 0;
export let useIframe;
const dispatch = createEventDispatcher();
</script>

<div class="kb-aui47c">
  {#if title}
    <div class="kb-6vocwd">
      {title}
    </div>
  {/if}
  <div class="kb-6obksc" />

  <!-- i-tabler-code"-->
  <!-- <button
      title="toggle width"
      class="kb-4ghid7"
      on:click={() => (width ? (width = undefined) : (width = 300))}
      ><span class="i-ant-design-column-width-outlined" /></button
    >
    <button
      title="toggle height"
      class="kb-4ghid7"
      on:click={() => (height ? (height = undefined) : (height = 200))}
      ><span class="i-ant-design-column-height-outlined" /></button
    > -->

  {#if useIframe}
    <button
      title="Refresh Iframe"
      class="kb-4ghid7"
      on:click={() => dispatch('refresh')}><span class="i-material-symbols-refresh" /></button
    >
  {/if}
</div>

{#if description}
  <div class="kb-zeux56">{description}</div>
{/if}

<slot adjustedHeight={height} adjustedWidth={width} />

<style>:global(.kb-6obksc){margin-left:auto;}:global(.kb-aui47c){display:flex;align-items:center;}:global(.kb-4ghid7){padding:0.25rem;opacity:0.5;}:global(.kb-6vocwd){padding-top:0.25rem;padding-bottom:0.25rem;font-size:0.875rem;line-height:1.25rem;font-weight:600;}:global(.kb-zeux56){padding-top:0.25rem;padding-bottom:0.25rem;font-size:0.875rem;line-height:1.25rem;}:global(.kb-4ghid7:hover){opacity:1;}</style>