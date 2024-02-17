<script lang="ts">
  import '../styles/kb-prose.css'
  import { Button } from 'svelte-pieces'
  import EditInGithub from '../components/EditInGithub.svelte'
  import { openComponent, openComposition, openMarkdown, openVariants } from '../open/openFiles'
  import Layout from '../layout/Layout.svelte'
  import type { LayoutLoadResult } from '../layout/layoutLoad'
  import Variants from './Variants.svelte'
  import Compositions from './Compositions.svelte'
  import type { MainPageLoadResult } from './mainPageLoad'
  import { dev } from '$app/environment'
  import { page } from '$app/stores'

  export let data: MainPageLoadResult & LayoutLoadResult

  const { viewports: projectViewports, addLanguageToUrl, githubURL, viewer, title: kitbookTitle } = data.settings

  const { pagesStore } = data
  $: pageFromHMR = $pagesStore?.[data.pageKey]

  let { variantsModule } = data.loadedModules
  $: if (pageFromHMR?.loadVariants?.loadModule)
    updateVariantsModule()
  else
    ({ variantsModule } = data.loadedModules)

  function updateVariantsModule() {
    pageFromHMR.loadVariants.loadModule().then((module) => {
      variantsModule = module
    }).catch((error) => {
      console.error(error)
    })
  }

  $: compositionModules = data.loadedModules.compositionsModules
  $: if (pageFromHMR?.loadCompositions)
    updateCompositions()

  function updateCompositions() {
    if (!compositionModules)
      compositionModules = {}
    Object.entries(pageFromHMR.loadCompositions).forEach(async ([compositionName, loadComposition]) => {
      compositionModules[compositionName] = (await loadComposition.loadModule())
    })
  }

  $: ({ markdown } = data.loadedModules)
  $: if (pageFromHMR?.loadMarkdown)
    updateMarkdown()

  function updateMarkdown() {
    pageFromHMR.loadMarkdown.loadModule().then((module) => {
      markdown = module
    }).catch((error) => {
      console.error(error)
    })
  }

  $: pathWithoutExtension = `.${data.page?.path.replace(/.\w+$/, '')}`
  $: title = ['+page', '+layout'].includes(data.page?.name) ? data.page?.path : data.page?.name

  $: pageTitle = title === 'index' ? kitbookTitle : `${title} | ${kitbookTitle}`
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<Layout settings={data.settings} pages={data.pages} pathname={$page.url.pathname} let:activeLanguages>
  {#key $page.url.pathname}
    <main style="flex: 1" class="overflow-y-auto bg-white pt-2 px-2">
      {#if data.error}
        <div class="text-red">
          Error: {data.error}
        </div>
      {:else}
        {#if data.loadedModules.component}
          <div class="flex items-center font-semibold text-2xl mb-2">
            {#if !dev}
              {title}
            {:else}
              <Button class="!text-xl flex items-center !py-1.5 !px-2 -ml-2" onclick={() => openComponent(`${pathWithoutExtension}.svelte`, viewer?.__internal?.viteBase)} form="menu" color="black" title="Edit Component">
                <span class="i-vscode-icons-file-type-svelte text-2xl align--2px mr-1" /> {title}
              </Button>

              <Button onclick={() => openMarkdown(`${pathWithoutExtension}.md`)} form="menu" color="black">
                <span class="i-vscode-icons-file-type-markdown align--6px text-2xl" /> {markdown ? 'Edit' : 'Add'} Docs
              </Button>

              <Button
                onclick={() => {
                  if (compositionModules) {
                    const name = prompt('What do you want to name this composition? (lowercase, no spaces or periods)')
                    if (name)
                      openComposition(pathWithoutExtension, `${name}.composition`)
                    return
                  }
                  openComposition(pathWithoutExtension, 'composition')
                }}
                form="menu"
                color="black"><span class="i-carbon-chart-treemap text-lg align--4px" /> Add Composition</Button>

              {#if !variantsModule?.variants}
                <Button onclick={() => openVariants(`${pathWithoutExtension}.svelte`)} form="menu" color="black"><span class="i-system-uicons-versions align--4px text-xl" /> Add Variant</Button>
              {/if}
            {/if}
          </div>
        {/if}

        {#if markdown}
          {#if !data.loadedModules.component}
            <Button class="fixed top-0 right-0 bg-white" onclick={() => openMarkdown(`${pathWithoutExtension}.md`)} form="menu" color="black">
              <span class="i-vscode-icons-file-type-markdown align--6px text-2xl" /> Edit
            </Button>
          {/if}

          <div class="kb-prose mb-8 max-w-1000px">
            {@html markdown.html}
          </div>
        {/if}

        {#if compositionModules}
          <Compositions {compositionModules} {pathWithoutExtension} {activeLanguages} {addLanguageToUrl} />
        {/if}

        {#if variantsModule?.variants}
          <Variants variants={variantsModule.variants} {pathWithoutExtension} viewports={variantsModule.viewports || projectViewports} moduleLanguages={variantsModule.languages} {activeLanguages} {addLanguageToUrl} />
        {/if}

        <EditInGithub path={data?.page?.path} {githubURL} />
      {/if}
    </main>
  {/key}
</Layout>
