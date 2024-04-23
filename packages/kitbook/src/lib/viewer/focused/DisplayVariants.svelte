<script lang="ts">
  import type { Variant, Viewport } from 'kitbook'
  import { getContext } from 'svelte'
  import type { Writable } from 'svelte/store'
  import Iframe from '../../view/Iframe.svelte'

  export let resizeTo: (width: number, height: number) => void
  export let languageInsertedKitbookRoute: string
  export let localFilenameWithLeadingSlash: string
  export let fileViewports: Viewport[]
  export let variants: Record<string, Variant<any>>

  const keyboardEvent = getContext<Writable<KeyboardEvent>>('picture-window-keydown')

  $: variantNamesToProperties = Object.entries(variants)

  let currentVariantIndex = 0
  let currentViewportIndex = 0
  $: ([name, variant] = variantNamesToProperties[currentVariantIndex])
  $: viewports = variant._meta?.viewports || fileViewports

  // keydown is listened to in the main window's listener placed on the picture window and so for some reason Svelte does not update the $ computed variables when triggered via keydown but it does when the buttons are pushed.
  function ensureUpdate() {
    ([name, variant] = variantNamesToProperties[currentVariantIndex])
    viewports = variant._meta?.viewports || fileViewports
  }

  function previousVariant() {
    if (currentVariantIndex === 0)
      return
    currentVariantIndex = currentVariantIndex - 1
    resizeToViewport()
  }

  function nextVariant() {
    if (currentVariantIndex === variantNamesToProperties.length - 1)
      return currentVariantIndex = 0
    currentVariantIndex = currentVariantIndex + 1
    resizeToViewport()
  }

  function previousViewport() {
    if (currentViewportIndex === 0)
      return
    currentViewportIndex = currentViewportIndex - 1
    resizeToViewport()
  }

  function nextViewport() {
    if (currentViewportIndex === viewports.length - 1)
      return currentViewportIndex = 0
    currentViewportIndex = currentViewportIndex + 1
    resizeToViewport()
  }

  let container: HTMLDivElement
  function resizeToViewport() {
    ensureUpdate()
    const headerHeight = container.getBoundingClientRect().top
    resizeTo(Math.max(400, viewports[currentViewportIndex].width + 18), viewports[currentViewportIndex].height + headerHeight + 43)
  }

  $: if ($keyboardEvent)
    handleKeydown($keyboardEvent)

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowUp')
      return previousVariant()
    if (e.key === 'ArrowDown')
      return nextVariant()
    if (e.key === 'ArrowLeft')
      return previousViewport()
    if (e.key === 'ArrowRight')
      return nextViewport()
  }
</script>

<div class="bg-gray-100 px-2 items-center flex flex-wrap">
  {#if currentVariantIndex > 0}
    <button
      type="button"
      title="up arrow"
      on:click={previousVariant}><span class="i-material-symbols-arrow-upward align--2px" /></button>
  {/if}

  {currentVariantIndex + 1} of {variantNamesToProperties.length}

  {#if variantNamesToProperties.length > 1 && currentVariantIndex < variantNamesToProperties.length - 1}
    <button
      type="button"
      title="down arrow"
      on:click={nextVariant}><span class="i-material-symbols-arrow-downward align--2px" /></button>
  {/if}

  <div class="ml-auto">
    {#if currentViewportIndex > 0}
      <button
        type="button"
        title="left arrow"
        on:click={previousViewport}><span class="i-material-symbols-arrow-back align--2px" /></button>
    {/if}

    <button
      type="button"
      title="Reset Dimensions"
      class="opacity-75 hover:opacity-100"
      on:click={resizeToViewport}>{viewports[currentViewportIndex].width} x {viewports[currentViewportIndex].height}</button>

    {#if viewports.length > 1}
      <span class="text-sm opacity-60">
        ({currentViewportIndex + 1} of {viewports.length})
      </span>
    {/if}

    {#if viewports.length > 1 && currentViewportIndex < viewports.length - 1}
      <button
        type="button"
        title="right arrow"
        on:click={nextViewport}><span class="i-material-symbols-arrow-forward align--2px" /></button>
    {/if}
  </div>
</div>

<div bind:this={container} style="width: {viewports[currentViewportIndex].width}px; height: {viewports[currentViewportIndex].height}px;" class="border">
  <Iframe src="{languageInsertedKitbookRoute}/sandbox{localFilenameWithLeadingSlash}?variantName={name}" />
</div>

<!-- <button type="button" on:click={openVariantsFn}><span class="i-system-uicons-versions align--3px text-xl" /> Add Variant</button> -->

<style>
  button {
    --at-apply: p-2 hover:bg-gray-200;
  }
</style>
