<script lang="ts">
  import ErrorBoundary from '../components/errorBoundary/ErrorBoundary.js'
  import type { LayoutLoadResult } from '../layout/layoutLoad'
  import Variant from './Variant.svelte'
  import Composition from './Composition.svelte'
  import type { SandboxPageLoadResult } from './sandboxPageLoad'
  import { browser } from '$app/environment'

  export let data: SandboxPageLoadResult & LayoutLoadResult
  $: clientOnlyComponentOnServer = data.compositionModule?.ssr === false && !browser
</script>

<div class="absolute inset-0 overflow-auto" class:dark={data.darkMode} class:bg-black={data.darkMode}>
  {#key data.pageKey}
    <ErrorBoundary onError={console.error}>
      {#if data.variantIndex}
        <Variant variant={data.variant} component={data.component} variantIndex={data.variantIndex} pagesStore={data.pagesStore} pageKey={data.pageKey} />
      {:else if data.compositionName}
        {#if !clientOnlyComponentOnServer}
          <Composition compositionName={data.compositionName} composition={data.compositionModule.default} pagesStore={data.pagesStore} pageKey={data.pageKey} />
        {/if}
      {/if}
    </ErrorBoundary>
  {/key}
</div>
