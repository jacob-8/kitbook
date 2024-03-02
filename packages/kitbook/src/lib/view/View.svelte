<script lang="ts">
  import { IntersectionObserver } from 'svelte-pieces'
  import { tick } from 'svelte'
  import type { KitbookSettings } from '../kitbook-types'
  import ViewHeader from './ViewHeader.svelte'
  import ViewBody from './ViewBody.svelte'
  import Iframe from './Iframe.svelte'
  import { buildIframeUrl } from './buildIframeSrc'
  import { page } from '$app/stores'

  const DEFAULT_HEIGHT = 220

  export let languageCode: string = undefined
  export let addLanguageToUrl: KitbookSettings['addLanguageToUrl']
  export let width: number
  export let height = DEFAULT_HEIGHT
  export let hovered = false
  export let props: Record<string, any> = undefined
  export let variantIndex: number = undefined
  export let compositionName: string = undefined
  export let blockScripts = false
  export let csr: false = undefined
  export let ssr: false = undefined

  let viewBody: ViewBody

  $: src = buildIframeUrl({ pathname: $page.url.pathname, languageCode, addLanguageToUrl, props, variantIndex, compositionName })

  let showIframe = true
  async function refresh() {
    showIframe = false
    await tick()
    showIframe = true
  }
</script>

<IntersectionObserver let:intersecting once>
  <div
    class="mb-1 mr-1 relative"
    on:mouseover={() => (hovered = true)}
    on:mouseout={() => (hovered = false)}>
    <ViewHeader
      {csr}
      {ssr}
      {languageCode}
      {width}
      {height}
      {hovered}
      {src}
      {blockScripts}
      let:scriptBlockingResult
      resetDimensions={() => viewBody.resetDimensions()}
      {refresh}>
      <ViewBody bind:this={viewBody} {hovered} {height} {width}>
        {#if intersecting && showIframe}
          <Iframe {src} blockScripts={scriptBlockingResult} />
        {/if}
      </ViewBody>
    </ViewHeader>
  </div>
</IntersectionObserver>
