<script lang="ts">
  import '../styles/kb-prose.css'
  import { getContext } from 'svelte'
  import type { GroupedPage, GroupedPageMap, KitbookSettings, LoadedModules, VariantsModule } from 'kitbook'
  import { Button } from 'svelte-pieces'
  import EditInGithub from '../components/EditInGithub.svelte'
  import { pagesStore } from '../modules/hmrUpdatedModules'
  import { openComponent, openSvx, openVariantsWithoutProps } from '../open/openFiles'
  import Variants from './Variants.svelte'

  export let data: {
    pages?: GroupedPageMap
    page?: GroupedPage
    pageKey?: string
    loadedModules?: LoadedModules
    error?: string
  } = { loadedModules: {} }

  const { viewports, languages } = getContext<KitbookSettings>('kitbook-settings')

  $: pageFromUpdatingStore = $pagesStore?.[data.pageKey]
  let variantsModule: VariantsModule
  $: if (pageFromUpdatingStore?.loadVariants?.loadModule) {
    pageFromUpdatingStore.loadVariants.loadModule().then((module) => {
      variantsModule = module
    }).catch((error) => {
      console.error(error)
    })
  }
  else {
    variantsModule = null
  }

  $: variants = variantsModule?.variants || data.loadedModules?.variantsModule?.variants
  $: fileViewports = variantsModule?.viewports || data.loadedModules?.variantsModule?.viewports
</script>

<main style="flex: 1" class="overflow-y-auto bg-white pt-3">
  <div class="font-semibold text-2xl mb-2">{data.page?.name}
    <button type="button" on:click={() => openComponent(`.${data.page.path}`)} title="Edit Component"><span class="i-vscode-icons-file-type-svelte align--2px" />
    </button>
  </div>
  {#if data.error}
    <div class="text-red">
      Error: {data.error}
    </div>
  {:else}
    {#if data.loadedModules.svx}
      <div class="kb-prose mb-8 max-w-1000px">
        <svelte:component this={data.loadedModules.svx} />
      </div>
    {:else}
      <Button class="block mb-2" onclick={() => openSvx(`.${data.page.path.replace('.svelte', '.md')}`)} color="black"><span class="i-vscode-icons-file-type-markdown align--6px text-2xl" /> Add Docs File (.md)</Button>
    {/if}

    {#if variants && data.loadedModules.component}
      <Variants {variants} viewports={fileViewports || viewports} {languages} />
    {:else}
      <Button class="block mb-2" onclick={() => openVariantsWithoutProps(`.${data.page.path}`)} color="black"><span class="i-system-uicons-versions align--4px text-xl" /> Add Variants File (.variants.ts)</Button>
    {/if}

    <EditInGithub path={data?.page?.path} />
  {/if}
</main>
