<script lang="ts">
  import ErrorBoundary from '../../../components/errorBoundary/ErrorBoundary.js'
  import type { LayoutLoadResult } from '../../layoutLoad.js'
  import Variant from './Variant.svelte'
  import Composition from './Composition.svelte'
  import type { SandboxPageLoadResult } from './sandboxPageLoad'

  export let data: SandboxPageLoadResult & LayoutLoadResult
  $: ({ compositionModule, compositionName, component, variantsModule, variantName, pageKey, pagesStore, darkMode, canMount } = data)
</script>

<div class="absolute inset-0 overflow-auto" class:dark={darkMode} class:bg-black={darkMode}>
  {#if canMount}
    {#key pageKey}
      <ErrorBoundary onError={console.error}>
        {#if variantName}
          <Variant {variantsModule} {component} {variantName} {pagesStore} {pageKey} />
        {:else if compositionName}
          <Composition {compositionName} composition={compositionModule.default} {pagesStore} {pageKey} />
        {/if}
      </ErrorBoundary>
    {/key}
  {/if}
</div>

<svelte:head>
  <title>Kitbook Sandbox</title>
</svelte:head>
