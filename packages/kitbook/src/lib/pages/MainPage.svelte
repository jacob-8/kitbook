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
  import { splitMarkdownHtmlIntoSections } from './split-markdown-into-sections'
  import { browser, dev } from '$app/environment'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'

  export let data: MainPageLoadResult & LayoutLoadResult
  $: ({
    pagesStore,
    loadedModules: { variantsModule: initialVariantsModule, compositionsModules: initialCompositionsModules, markdown: initialMarkdown },
    pageKey,
    settings: { viewports: projectViewports, addLanguageToUrl, githubURL, viewer, title: kitbookTitle, darkMode },
  } = data)

  $: pageFromHMR = $pagesStore?.[pageKey]

  $: variantsModule = initialVariantsModule
  $: if (pageFromHMR?.loadVariants?.loadModule)
    updateVariantsModule()
  function updateVariantsModule() {
    pageFromHMR.loadVariants.loadModule().then((module) => {
      variantsModule = module
    }).catch((error) => {
      console.error(error)
    })
  }

  $: compositionsModules = initialCompositionsModules
  $: if (pageFromHMR?.loadCompositions)
    updateCompositions()
  function updateCompositions() {
    if (!compositionsModules)
      compositionsModules = {}
    Object.entries(pageFromHMR.loadCompositions).forEach(async ([compositionName, loadComposition]) => {
      const module = await loadComposition.loadModule()
      const code = await loadComposition.loadRaw()
      compositionsModules[compositionName] = { ...module, code }
    })
  }

  $: markdown = initialMarkdown
  $: if (pageFromHMR?.loadMarkdown)
    updateMarkdown()
  function updateMarkdown() {
    pageFromHMR.loadMarkdown.loadModule().then((module) => {
      markdown = module
    }).catch((error) => {
      console.error(error)
    })
  }

  $: ({ sectionedMarkdown, compositionsModulesAfterInlined } = splitMarkdownHtmlIntoSections({
    html: markdown?.html,
    pageName: pageKey.split('/').pop(),
    compositionsModules,
  }))

  $: pathWithoutExtension = `.${data.page?.path.replace(/.\w+$/, '')}`
  $: title = ['+page', '+layout'].includes(data.page?.name) ? data.page?.path : data.page?.name
  $: shortenedTitle = title.length > 40 ? `...${title.slice(-38)}` : title

  $: pageTitle = title === 'index' ? kitbookTitle : `${title} | ${kitbookTitle}`

  $: if (data.pageKey === '/' && browser)
    goto(`${$page.url.pathname.replace(/\/$/, '')}/index`, { replaceState: true })

  function addComposition() {
    const filepath = `.${data.page.path}`
    if (compositionsModules) {
      const compositionName = prompt('What do you want to name this composition? (lowercase, no spaces or periods)')
      if (compositionName)
        openComposition({ filepath, compositionName })
      return
    }
    openComposition({ filepath })
  }
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
              <Button class="!text-xl flex items-center !py-1.5 !px-2 -ml-2" onclick={() => openComponent(`${pathWithoutExtension}.svelte`, viewer?.__internal?.viteBase)} form="menu" color="black" title="Edit Component, {title}">
                <span class="i-vscode-icons-file-type-svelte text-2xl align--2px mr-1" /> {shortenedTitle}
              </Button>

              <Button onclick={() => openMarkdown(`${pathWithoutExtension}.md`)} form="menu" color="black">
                <span class="i-vscode-icons-file-type-markdown align--6px text-2xl" /> {markdown ? 'Edit' : 'Add'} Docs
              </Button>

              <Button onclick={addComposition} form="menu" color="black"><span class="i-carbon-chart-treemap text-lg align--4px" /> Add Composition</Button>

              {#if !variantsModule?.variants}
                <Button onclick={() => openVariants(`${pathWithoutExtension}.svelte`)} form="menu" color="black"><span class="i-system-uicons-versions align--4px text-xl" /> Add Variant</Button>
              {/if}
            {/if}
          </div>
        {/if}

        {#if markdown}
          {#if dev && !data.loadedModules.component}
            <div class="fixed top-0 right-0 bg-white flex flex-col items-end">
              <Button onclick={addComposition} form="menu" color="black">
                <span class="i-carbon-chart-treemap text-lg align--4px" /> Add Composition
              </Button>
              <Button class="mb-1" onclick={() => openMarkdown(`${pathWithoutExtension}.md`)} form="menu" color="black">
                <span class="i-vscode-icons-file-type-markdown align--6px text-2xl" /> Edit
              </Button>
            </div>
          {/if}

          <div class="kb-prose mb-8 max-w-1000px">
            {#each sectionedMarkdown.sections as { html, compositionName }}
              {#if html}
                {@html html}
              {:else if compositionName}
                <Compositions compositionsModules={{ [compositionName]: compositionsModulesAfterInlined[compositionName] }} {pathWithoutExtension} {activeLanguages} {addLanguageToUrl} {darkMode} show_inlined />
              {/if}
            {/each}
          </div>
        {/if}

        {#if compositionsModulesAfterInlined}
          <Compositions compositionsModules={compositionsModulesAfterInlined} {pathWithoutExtension} {activeLanguages} {addLanguageToUrl} {darkMode} />
        {/if}

        {#if variantsModule?.variants}
          <Variants variants={variantsModule.variants} {pathWithoutExtension} viewports={variantsModule.viewports || projectViewports} moduleLanguages={variantsModule.languages} {activeLanguages} {addLanguageToUrl} {darkMode} />
        {/if}

        <EditInGithub path={data?.page?.path} {githubURL} />
      {/if}
    </main>
  {/key}
</Layout>
