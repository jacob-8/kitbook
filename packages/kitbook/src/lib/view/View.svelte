<script lang="ts">
  import { IntersectionObserver } from 'svelte-pieces'
  import ViewHeader from './ViewHeader.svelte'
  import ViewBody from './ViewBody.svelte'
  import Iframe from './Iframe.svelte'
  import { buildIframeUrl } from './buildIframeSrc'
  import { page } from '$app/stores'

  const DEFAULT_HEIGHT = 220

  export let languageCode: string = undefined
  export let width: number
  export let height = DEFAULT_HEIGHT
  export let hovered = false
  export let props: Record<string, any> = undefined
  export let variantIndex: number = undefined
  export let compositionName: string = undefined

  let iframe: Iframe
  let viewBody: ViewBody

  $: src = buildIframeUrl({ pathname: $page.url.pathname, languageCode, props, variantIndex, compositionName })
</script>

<IntersectionObserver let:intersecting once>
  <div
    class="mb-1 mr-1 relative"
    on:mouseover={() => (hovered = true)}
    on:mouseout={() => (hovered = false)}>
    <ViewHeader
      {width}
      {height}
      {hovered}
      {src}
      on:resetDimensions={() => viewBody.resetDimensions()}
      on:refresh={() => iframe.reload()} />
    <ViewBody bind:this={viewBody} {hovered} {height} {width}>
      {#if intersecting}
        <Iframe bind:this={iframe} {src} />
      {/if}
    </ViewBody>
  </div>
</IntersectionObserver>
