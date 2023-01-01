<script lang="ts">
  import ViewHeader from './ViewHeader.svelte';
  import ViewBody from './ViewBody.svelte';
  import Iframe from './Iframe.svelte';
  const DEFAULT_PIXEL_HEIGHT = 220;

  export let title: string;
  export let description: string = undefined;
  export let width: number;
  export let height = DEFAULT_PIXEL_HEIGHT;
  export let useIframe = true;
  export let hovered = false;

  export let props: any;
  export let queryParams: string;

  let iframe: Iframe;
</script>

<div class="not-prose mb-4">
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
