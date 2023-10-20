<script lang="ts">
  import ErrorBoundary from '../components/errorBoundary/ErrorBoundary.js'
  import type { LayoutLoadResult } from '../layout/layoutLoad'
  import Variant from './Variant.svelte'
  import Composition from './Composition.svelte'
  import type { SandboxPageLoadResult } from './sandboxPageLoad'

  export let data: SandboxPageLoadResult & LayoutLoadResult
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
