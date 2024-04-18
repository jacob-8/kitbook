<script lang="ts">
  import type { GroupedPageMap, VariantsModule } from 'kitbook'
  import type { SvelteComponent } from 'svelte'
  import { setContext } from 'svelte'
  import type { Writable } from 'svelte/store'

  export let variantsModule: VariantsModule
  export let variantName: string
  export let component: typeof SvelteComponent
  export let pagesStore: Writable<GroupedPageMap>
  export let pageKey: string

  const initial_contexts = variantsModule?.[variantName]?._meta?.contexts || variantsModule?.shared_meta?.contexts || [] // can't HMR update contexts
  for (const { key, context } of initial_contexts) setContext(key, context)

  let updatedVariantsModule: VariantsModule

  $: pageFromUpdatingStore = $pagesStore?.[pageKey]
  $: if (pageFromUpdatingStore?.loadVariants?.loadModule) {
    pageFromUpdatingStore.loadVariants.loadModule().then((module) => {
      updatedVariantsModule = module
    }).catch((error) => {
      console.error(error)
    })
  }
  else {
    updatedVariantsModule = null
  }

  $: variant = updatedVariantsModule?.[variantName] || variantsModule?.[variantName]
  $: ({ _meta, ...props } = variant || {})
</script>

{#if _meta?.defaultSlot}
  <svelte:component this={component} {...props}>
    {#if typeof _meta.defaultSlot === 'string'}
      {@html _meta.defaultSlot}
    {:else}
      <svelte:component this={_meta.defaultSlot} />
    {/if}
  </svelte:component>
{:else}
  <svelte:component this={component} {...props} />
{/if}
