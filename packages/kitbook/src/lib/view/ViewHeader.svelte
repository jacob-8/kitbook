<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let title: string;
  export let description: string = undefined;
  export let height: number = undefined;
  export let width: number = undefined;
  export let useIframe: boolean;
  export let src: string;

  const dispatch = createEventDispatcher<{ refresh: boolean }>();

  function askPixels(dimension: 'width' | 'height'): number {
    const pixels = prompt(`Specify ${dimension} in pixels:`);
    if (pixels) return +pixels;
  }
</script>

<div class="flex items-center">
  {#if title}
    <div class="font-semibold text-sm py-1">
      {title}
    </div>
  {/if}
  <div class="ml-auto" />

  <button
    title="Specify Width"
    class="p-1 opacity-50 hover:opacity-100"
    on:click={() => (width = askPixels('width'))}
    ><span class="i-ant-design-column-width-outlined" /></button
  >
  <button
    title="Specify Height"
    class="p-1 opacity-50 hover:opacity-100"
    on:click={() => (height = askPixels('height'))}
    ><span class="i-ant-design-column-height-outlined" /></button
  >

  <a href={src} title="Open Story by Itself" class="p-1 opacity-50 hover:opacity-100"
    ><span class="i-tabler-external-link" /></a
  >

  {#if useIframe}
    <button
      title="Refresh Iframe"
      class="p-1 opacity-50 hover:opacity-100"
      on:click={() => dispatch('refresh')}><span class="i-material-symbols-refresh" /></button
    >
  {/if}
</div>

{#if description}
  <div class="text-sm py-1">{description}</div>
{/if}

<slot adjustedHeight={height} adjustedWidth={width} />
