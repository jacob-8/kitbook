<script lang="ts">
  import '../styles/kb-prose.css'
  import type { GroupedPage, GroupedPageMap, KitbookSettings, LoadedModules, VariantsModule } from 'kitbook'
  import { Button } from 'svelte-pieces'
  import type { SvelteComponent } from 'svelte'
  import EditInGithub from '../components/EditInGithub.svelte'
  import { pagesStore } from '../modules/hmrUpdatedModules'
  import { openComponent, openComposition, openSvx, openVariants } from '../open/openFiles'
  import Layout from '../layout/Layout.svelte'
  import Variants from './Variants.svelte'
  import Compositions from './Compositions.svelte'
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

  let compositions: Record<string, typeof SvelteComponent>
  $: if (pageFromUpdatingStore?.loadCompositions)
    updateCompositions()
  else
    compositions = data.loadedModules?.compositions

  function updateCompositions() {
    if (!compositions)
      compositions = {}
    Object.entries(pageFromUpdatingStore.loadCompositions).forEach(async ([compositionName, loadComposition]) => {
      compositions[compositionName] = (await loadComposition.loadModule()).default
    })
  }

  $: fileViewports = variantsModule?.viewports || data.loadedModules?.variantsModule?.viewports
  $: pathWithoutExtension = `.${data.page?.path.replace(/.\w+$/, '')}`
  $: title = ['+page', '+layout'].includes(data.page?.name) ? data.page?.path : data.page?.name
</script>

<Layout>
  <main style="flex: 1" class="overflow-y-auto bg-white pt-2 px-2">
    {#if data.error}
      <div class="text-red">
        Error: {data.error}
      </div>
    {:else}
      {#if data.loadedModules.component}
        <div class="flex items-center font-semibold text-2xl mb-2">
          {title}

          {#if dev}
            <Button onclick={() => openComponent(`${pathWithoutExtension}.svelte`, viteBase)} form="menu" color="black" title="Edit Component">
              <span class="i-vscode-icons-file-type-svelte text-2xl align--2px" />
            </Button>

            <Button
              onclick={() => {
                if (data.loadedModules.compositions) {
                  const name = prompt('What do you want to name this composition? (lowercase, no spaces or periods)')
                  if (name)
                    openComposition(pathWithoutExtension, `${name}.composition`)
                  return
                }
                openComposition(pathWithoutExtension, 'composition')
              }}
              form="menu"
              color="black"><span class="i-carbon-chart-treemap text-lg align--4px" /> Add Composition</Button>

            {#if !variants}
              <Button onclick={() => openVariants(`${pathWithoutExtension}.svelte`)} form="menu" color="black"><span class="i-system-uicons-versions align--4px text-xl" /> Add Variant</Button>
            {/if}
          {/if}
        </div>
      {/if}

      {#if data.loadedModules.svx}
        <div class="kb-prose mb-8 max-w-1000px">
          <svelte:component this={data.loadedModules.svx} />
        </div>
      {:else if dev}
        <Button class="block mb-3" onclick={() => openSvx(`${pathWithoutExtension}.md`)} color="black"><span class="i-vscode-icons-file-type-markdown align--6px text-2xl" /> Add Docs File (md)</Button>
      {/if}

      {#if compositions}
        <Compositions {compositions} {pathWithoutExtension} />
      {/if}

      {#if variants}
        <Variants {variants} {pathWithoutExtension} viewports={fileViewports || viewports} {languages} />
      {/if}

      <EditInGithub path={data?.page?.path} {githubURL} />
    {/if}
  </main>
</Layout>
