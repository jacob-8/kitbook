<script context="module" lang="ts">
  let codeToHtml: any

  async function convertCodeToHtml(code: string): Promise<string> {
    if (!codeToHtml) {
      // @ts-expect-error url imports don't have types
      ({ codeToHtml } = await import('https://esm.sh/shiki@1.2.0'))
    }

    return await codeToHtml(code, {
      lang: 'svelte',
      theme: 'dark-plus',
    })
  }
</script>

<script lang="ts">
  import { IntersectionObserver } from 'svelte-pieces'
  import { tick } from 'svelte'
  import type { KitbookSettings } from '../kitbook-types'
  import ViewHeader from './ViewHeader.svelte'
  import ViewBody from './ViewBody.svelte'
  import Iframe from './Iframe.svelte'
  import { buildIframeUrl } from './buildIframeSrc'
  import { page } from '$app/stores'
  import { browser } from '$app/environment'

  const DEFAULT_HEIGHT = 220

  export let languageCode: string = undefined
  export let addLanguageToUrl: KitbookSettings['addLanguageToUrl']
  export let width: number
  export let height = DEFAULT_HEIGHT
  export let hovered = false
  export let props: Record<string, any> = undefined
  export let variantName: string = undefined
  export let compositionName: string = undefined
  export let blockScripts = false
  export let csr: false = undefined
  export let ssr: false = undefined
  export let darkMode: boolean
  export let code: string = undefined

  let viewBody: ViewBody

  $: src = buildIframeUrl({ pathname: $page.url.pathname, languageCode, addLanguageToUrl, props, variantName, compositionName, darkMode })

  let showIframe = true
  async function refresh() {
    showIframe = false
    await tick()
    showIframe = true
  }

  let codeHtml: string
  $: if (browser && code) {
    convertCodeToHtml(code).then((html) => {
      codeHtml = html
    })
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
      resetDimensions={() => viewBody.resetDimensions()}
      {refresh}
      hasCode={!!code}
      let:scriptBlockingResult
      let:showCode>
      <ViewBody bind:this={viewBody} {hovered} {height} {width}>
        {#if intersecting && showIframe}
          <Iframe {src} blockScripts={scriptBlockingResult} />
        {/if}
      </ViewBody>
      {#if showCode && codeHtml}
        <div class="view-code my-3 overflow-x-auto max-w-full" style="width: {width + 18}px;">
          {@html codeHtml}
        </div>
      {/if}
    </ViewHeader>
  </div>
</IntersectionObserver>

<style>
  :global(.view-code pre.shiki) {
    padding: 0.75rem;
  }
</style>
