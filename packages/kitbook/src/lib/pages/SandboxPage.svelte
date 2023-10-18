<script lang="ts">
  import { type SvelteComponent, setContext } from 'svelte'
  import type { Writable } from 'svelte/store'
  import type { GroupedPage, GroupedPageMap, LoadedModules, Variant } from '../kitbook-types'
  import ErrorBoundary from '../components/errorBoundary/ErrorBoundary.js'

  export let data: {
    pages: GroupedPageMap
    pagesStore: Writable<GroupedPageMap>
    page: GroupedPage
    pageKey: string
    loadedModules: LoadedModules
    variant?: Variant<SvelteComponent>
    variantIdx?: string // string is better because it works as an index also and doesn't give false negative on '0'
    editedProps?: Record<string, any>
  // error?: string;
  }

  let { variant, pagesStore } = data
  $: page = $pagesStore[data.pageKey]

  $: if (page?.loadVariants?.loadModule && data.variantIdx) {
    page.loadVariants
      .loadModule()
      .then((module) => {
        variant = module?.variants[data.variantIdx] || {}
      })
      .catch((error) => {
        console.error(error)
      })
  }

  for (const { key, context } of data.variant?.contexts || []) setContext(key, context)
</script>

<div class="absolute inset-0 overflow-auto">
  <ErrorBoundary onError={console.error}>
    <div slot="before">
      {#if Object.keys(variant.props).length === 0}
        <b>Kitbook tip</b>: Your component may need props passed in. Create a "{data.page
          ?.name}.variants.ts" file with at least variant. In the future Kitbook will try to
        automatically supply default props, but until then they must be supplied manually.
      {/if}
    </div>
    {#if variant?.slots}
      {@const defaultSlotContent = variant.slots.default}
      <svelte:component this={data.loadedModules.component} {...variant.props}>
        {#if typeof defaultSlotContent === 'string'}
          {@html defaultSlotContent}
        {:else}
          <svelte:component this={defaultSlotContent} />
        {/if}
      </svelte:component>
    {:else}
      <svelte:component this={data.loadedModules.component} {...variant.props} />
    {/if}
  </ErrorBoundary>
</div>
