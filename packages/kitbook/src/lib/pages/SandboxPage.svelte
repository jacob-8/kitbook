<script lang="ts">
  import type { Writable } from 'svelte/store'
  import type { GroupedPage, GroupedPageMap, Variant as VariantType } from 'kitbook'
  import type { SvelteComponent } from 'svelte'
  import ErrorBoundary from '../components/errorBoundary/ErrorBoundary.js'
  import Variant from './Variant.svelte'
  import Composition from './Composition.svelte'

  export let data: {
    pagesStore: Writable<GroupedPageMap>
    page: GroupedPage
    pageKey: string

    compositionName?: string
    composition?: typeof SvelteComponent

    variantIndex?: string
    component?: typeof SvelteComponent
    variant?: VariantType<any>
  // editedProps?: Record<string, any>
  }
</script>

<div class="absolute inset-0 overflow-auto">
  {#key data.pageKey}
    <ErrorBoundary onError={console.error}>
      {#if data.variantIndex}
        <Variant variant={data.variant} component={data.component} variantIndex={data.variantIndex} pagesStore={data.pagesStore} pageKey={data.pageKey} />
      {:else if data.compositionName}
        <Composition compositionName={data.compositionName} composition={data.composition} pagesStore={data.pagesStore} pageKey={data.pageKey} />
      {/if}
    </ErrorBoundary>
  {/key}
</div>
