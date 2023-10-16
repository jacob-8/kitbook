<script lang="ts">
  import { IntersectionObserver } from 'svelte-pieces'
  import { compressToEncodedURIComponent as encode } from '../lz/lz-string'
  import ViewHeader from './ViewHeader.svelte'
  import ViewBody from './ViewBody.svelte'
  import Iframe from './Iframe.svelte'
  import { page } from '$app/stores'
  import { findKitbookPath } from '$lib/layout/kitbookPath'

  const DEFAULT_PIXEL_HEIGHT = 220

  export let title: string
  export let description: string = undefined
  export let languageCode: string = undefined
  export let width: number
  export let height = DEFAULT_PIXEL_HEIGHT
  export let hovered = false
  export let props: Record<string, any> = undefined
  export let queryParams: string

  let iframe: Iframe

  $: ({ kitbookPath, activePath } = findKitbookPath($page.url.pathname))
  $: encodedProps = props ? `props=${encode(JSON.stringify(props))}&` : ''
  $: languageEncodedKitbookPath = languageCode ? `${kitbookPath.replace('en', languageCode)}` : kitbookPath
  $: src = `${languageEncodedKitbookPath}/sandbox${activePath}?${encodedProps}${queryParams}`
</script>

<!-- http://localhost:5174/en/kitbook/routes/[lang=locale]/(app)/zh-TW//en/kitbook/sandbox/routes/[lang=locale]/(app)/+layout?variantIdx=0 -->
<!-- http://localhost:5174/zh-TW/kitbook/sandbox/routes/[lang=locale]/(app)/+layout?variantIdx=0 -->
<IntersectionObserver let:intersecting once>
  <div
    class="not-prose mb-4 mr-2"
    on:mouseover={() => (hovered = true)}
    on:mouseout={() => (hovered = false)}>
    <ViewHeader
      {title}
      {description}
      {width}
      {height}
      {src}
      let:adjustedHeight
      let:adjustedWidth
      on:refresh={() => {
        iframe.reload()
      }}>
      <ViewBody {hovered} height={adjustedHeight} width={adjustedWidth}>
        {#if intersecting}
          <Iframe bind:this={iframe} {src} />
        {/if}
      </ViewBody>
    </ViewHeader>
  </div>
</IntersectionObserver>
