<script lang="ts">
  import '../styles/kb-prose.css'
  import type { GroupedPage, GroupedPageMap, KitbookSettings, LoadedModules, VariantsModule } from 'kitbook'
  import { Button } from 'svelte-pieces'
  import EditInGithub from '../components/EditInGithub.svelte'
  import { pagesStore } from '../modules/hmrUpdatedModules'
  import { openComponent, openSvx, openVariants } from '../open/openFiles'
  import Layout from '../layout/Layout.svelte'
  import Variants from './Variants.svelte'
  import { dev } from '$app/environment'

  export let data: {
    settings?: KitbookSettings
    pages?: GroupedPageMap
    page?: GroupedPage
    pageKey?: string
    loadedModules?: LoadedModules
    error?: string
  } = { loadedModules: {} }

  const { viewports, languages, githubURL, viewer: { __internal: { viteBase } } } = data.settings

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
  $: pathWithoutExtension = `.${data.page?.path.replace(/.(svelte|md)$/, '')}`

  $: title = ['+page', '+layout'].includes(data.page?.name) ? data.page?.path : data.page?.name
</script>

<Layout>
  <main style="flex: 1" class="overflow-y-auto bg-white pt-3">
    {#if data.error}
      <div class="text-red">
        Error: {data.error}
      </div>
    {:else}
      {#if data.loadedModules.component}
        <div class="font-semibold text-2xl mb-2">{title}
          {#if dev}
            <button type="button" on:click={() => openComponent(`${pathWithoutExtension}.svelte`, viteBase)} title="Edit Component">
              <span class="i-vscode-icons-file-type-svelte align--2px" />
            </button>
          {/if}
        </div>
      {/if}

      {#if data.loadedModules.svx}
        <div class="kb-prose mb-8 max-w-1000px">
          <svelte:component this={data.loadedModules.svx} />
          <!-- TODO: update the MDSvex to parse for links to compositions and use the IFrame component with the right composition url -->
        </div>
      {:else if dev}
        <Button class="block mb-2" onclick={() => openSvx(`${pathWithoutExtension}.md`)} color="black"><span class="i-vscode-icons-file-type-markdown align--6px text-2xl" /> Add Docs File (md)</Button>
      {/if}

      <!-- {#if data.loadedModules.compositions}
      leftovers not referenced in the docs
    {/if} -->
      {#if data.loadedModules.component}
        {#if variants}
          <Variants {variants} viewports={fileViewports || viewports} {languages} />
        {:else if dev}
          <Button class="block mb-2" onclick={() => openVariants(`${pathWithoutExtension}.svelte`)} color="black"><span class="i-system-uicons-versions align--4px text-xl" /> Add Variants File (variants.ts)</Button>
        {/if}
      {/if}

      <EditInGithub path={data?.page?.path} {githubURL} />
    {/if}
  </main>
</Layout>
