<script>import ViewHeader from "./ViewHeader.svelte";
import ViewBody from "./ViewBody.svelte";
import Iframe from "./Iframe.svelte";
const DEFAULT_PIXEL_HEIGHT = 220;
export let title;
export let description = void 0;
export let width;
export let height = DEFAULT_PIXEL_HEIGHT;
export let useIframe = true;
export let hovered = false;
export let props;
export let queryParams;
let iframe;
</script>

<div class="kb-7v4u9c not-prose">
  <ViewHeader
    {title}
    {description}
    {width}
    {height}
    {useIframe}
    let:adjustedHeight
    let:adjustedWidth
    on:refresh={() => {
      iframe.reload();
    }}
  >
    <ViewBody {hovered} height={adjustedHeight} width={adjustedWidth}>
      {#if useIframe}
        <Iframe bind:this={iframe} {props} {queryParams} />
      {:else}
        <slot />
      {/if}
    </ViewBody>
  </ViewHeader>
</div>

<style>:global(.kb-7v4u9c){margin-bottom:1rem;}</style>