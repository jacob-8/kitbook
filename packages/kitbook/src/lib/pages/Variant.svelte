<script lang="ts">
  import type { GroupedPageMap, Variant } from 'kitbook'
  import type { SvelteComponent } from 'svelte'
  import { setContext } from 'svelte'
  import type { Writable } from 'svelte/store'

  export let variantIndex: string
  export let component: typeof SvelteComponent
  export let variant: Variant<any>
  export let pagesStore: Writable<GroupedPageMap>
  export let pageKey: string

  // contexts won't be HMRed as context must be set on component init - would require remounting this component
  for (const { key, context } of variant?.contexts || []) setContext(key, context)

  let updatedVariant: Variant<any>
  $: pageFromUpdatingStore = $pagesStore?.[pageKey]
  $: if (pageFromUpdatingStore?.loadVariants?.loadModule) {
    pageFromUpdatingStore.loadVariants.loadModule().then((module) => {
      updatedVariant = module?.variants?.[variantIndex]
    }).catch((error) => {
      console.error(error)
    })
  }
  else {
    updatedVariant = null
  }

  $: currentVariant = updatedVariant || variant
</script>

{#if currentVariant?.slots}
  {@const defaultSlotContent = currentVariant.slots.default}
  <svelte:component this={component} {...currentVariant?.props}>
    {#if typeof defaultSlotContent === 'string'}
      {@html defaultSlotContent}
    {:else}
      <svelte:component this={defaultSlotContent} />
    {/if}
  </svelte:component>
{:else}
  <svelte:component this={component} {...currentVariant?.props} />
{/if}
