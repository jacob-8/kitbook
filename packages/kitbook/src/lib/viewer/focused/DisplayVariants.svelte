<script lang="ts">
  import type { Variant, Viewport } from 'kitbook'
  import Iframe from '$lib/view/Iframe.svelte'

  export let kitbookRoute: string
  export let localFilenameWithLeadingSlash: string
  export let variants: Variant<any>[]
  export let fileViewports: Viewport[]

  let currentVariantIndex = 0
  $: variant = variants[currentVariantIndex]
  $: isFirstVariant = currentVariantIndex === 0
  $: isLastVariant = currentVariantIndex === variants.length - 1

  function previousVariant() {
    if (isFirstVariant)
      return
    currentVariantIndex = currentVariantIndex - 1
  }

  function nextVariant() {
    if (isLastVariant)
      return currentVariantIndex = 0
    currentVariantIndex = currentVariantIndex + 1
  }

  let currentViewportIndex = 0
  $: viewports = variant.viewports || fileViewports
  $: viewport = viewports[currentViewportIndex]
  $: isFirstViewport = currentViewportIndex === 0
  $: isLastViewport = currentViewportIndex === viewports.length - 1

  function previousViewport() {
    if (isFirstViewport)
      return
    currentViewportIndex = currentViewportIndex - 1
  }

  function nextViewport() {
    if (isLastViewport)
      return currentViewportIndex = 0
    currentViewportIndex = currentViewportIndex + 1
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp')
      return previousVariant()
    if (event.key === 'ArrowDown')
      return nextVariant()
    if (event.key === 'ArrowLeft')
      return previousViewport()
    if (event.key === 'ArrowRight')
      return nextViewport()
  }
</script>

<div class="bg-gray-100 px-2 items-center flex flex-wrap">
  {#if !isFirstVariant}
    <button
      type="button"
      title="up arrow"
      on:click={previousVariant}><span class="i-material-symbols-arrow-upward align--2px" /></button>
  {/if}

  {currentVariantIndex + 1} of {variants.length}

  {#if variants.length > 1 && !isLastVariant}
    <button
      type="button"
      title="down arrow"
      on:click={nextVariant}><span class="i-material-symbols-arrow-downward align--2px" /></button>
  {/if}

  <div class="ml-auto">
    {#if !isFirstViewport}
      <button
        type="button"
        title="left arrow"
        on:click={previousViewport}><span class="i-material-symbols-arrow-back align--2px" /></button>
    {/if}

    {viewport.width} x {viewport.height}

    {#if viewports.length > 1}
      <span class="text-sm opacity-60">
        ({currentViewportIndex + 1} of {viewports.length})
      </span>
    {/if}

    {#if viewports.length > 1 && !isLastViewport}
      <button
        type="button"
        title="right arrow"
        on:click={nextViewport}><span class="i-material-symbols-arrow-forward align--2px" /></button>
    {/if}
  </div>
</div>

<div style="width: {viewport.width}px; height: {viewport.height}px;" class="border">
  <Iframe src="{kitbookRoute}/sandbox{localFilenameWithLeadingSlash}?variantIdx={currentVariantIndex}" />
</div>

<svelte:window on:keydown={handleKeydown} />

<style>
  button {
    --at-apply: p-2 hover:bg-gray-200;
  }
</style>
