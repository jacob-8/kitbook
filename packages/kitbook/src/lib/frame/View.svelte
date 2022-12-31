<script lang="ts">
  import FrameBody from './FrameBody.svelte';
  import Iframe from '../iframe/Iframe.svelte';
  import FrameHeader from './FrameHeader.svelte';
  const DEFAULT_PIXEL_HEIGHT = 220;

  export let title: string;
  export let description: string = undefined;
  export let width: number;
  export let height = DEFAULT_PIXEL_HEIGHT;
  export let useIframe = true;

  export let props: any;
  export let queryParams: string;

  let iframe: Iframe;
</script>

<div class="not-prose mb-4">
  <FrameHeader
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
    <FrameBody height={adjustedHeight} width={adjustedWidth}>
      {#if useIframe}
        <Iframe bind:this={iframe} {props} {queryParams} />
      {:else}
        <slot />
      {/if}
    </FrameBody>
  </FrameHeader>
</div>
