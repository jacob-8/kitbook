<script lang="ts">
  import type { GroupedPage } from 'kitbook'
  import { dev } from '$app/environment'

  export let page: GroupedPage
  export let kitbookPath: string
  export let activePath: string
  export let depth: number
  $: active = activePath === page?.url
  $: hasKitbookFiles = page?.loadMarkdown || page?.loadVariants || page?.loadCompositions

// let anchorElement: HTMLAnchorElement
  // $: if (active) {
  //   setTimeout(() => {
  //     anchorElement?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  //   }, 2000)
  // }
</script>

{#if dev || hasKitbookFiles}
  <!-- bind:this={anchorElement} -->
  <a
    data-sveltekit-preload-data="off"
    class:opacity-60={!hasKitbookFiles}
    class:font-semibold={active}
    class:text-blue-600={active}
    class:capitalize={!page.name.startsWith('+page') && !page.name.startsWith('+layout')}
    class="hover:text-blue-700 pr-3 text-xs flex"
    href={kitbookPath + page.url}
    style="padding-left: calc(0.75rem * {depth}">
    <span
      class="border-l border-gray-300 hover:border-blue-700 pr-3"
      class:border-dotted={!active}
      class:border-l-2={active}
      class:border-blue-700={active} />
    <span class="py-1 sm:py-0.5" style="overflow-wrap: anywhere;">
      {page.name}
    </span>
  </a>
{/if}
