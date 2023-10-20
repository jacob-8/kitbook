<script lang="ts">
  import type { GroupedPageMap } from 'kitbook'
  import type { SvelteComponent } from 'svelte'
  import type { Writable } from 'svelte/store'

  export let compositionName: string
  export let composition: typeof SvelteComponent
  export let pagesStore: Writable<GroupedPageMap>
  export let pageKey: string

  let updatedComposition: typeof SvelteComponent
  $: pageFromUpdatingStore = $pagesStore?.[pageKey]
  $: if (pageFromUpdatingStore?.loadCompositions?.loadModule) {
    pageFromUpdatingStore.loadCompositions[compositionName].loadModule().then((module) => {
      updatedComposition = module?.default
    }).catch((error) => {
      console.error(error)
    })
  }
  else {
    updatedComposition = null
  }

  $: currentComposition = updatedComposition || composition
</script>

<svelte:component this={currentComposition} />
