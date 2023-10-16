<script lang="ts">
  import '../styles/tw-prose.css'
  import { getContext } from 'svelte'
  import type { GroupedPage, GroupedPageMap, KitbookSettings, LoadedModules, VariantsModule } from 'kitbook'
  import EditInGithub from '../components/EditInGithub.svelte'
  import View from '../view/View.svelte'
  import { pagesStore } from '../modules/hmrUpdatedModules'
  import { page } from '$app/stores'

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
  $: variants = variantsModule?.variants || data.loadedModules?.variantsModule?.variants
  $: fileViewports = variantsModule?.viewports || data.loadedModules?.variantsModule?.viewports

  $: wouldRecurseInfinitelyInSandbox = $page.url.pathname.startsWith(
    '/lib/routes/kitbook/sandbox/[...file]/+',
  )
  $: doesNotHaveStoriesOrVariants = !(data.loadedModules?.svx || variants)
</script>

<main style="flex: 1" class="overflow-y-auto bg-white pt-3">
  {#if data.error}
    <div class="text-red">
      Error: {data.error}
    </div>
  {:else}
    {#if data.loadedModules.svx}
      <div class="tw-prose mb-10 max-w-1000px">
        <svelte:component this={data.loadedModules.svx} />
      </div>
    {/if}

    {#if data.loadedModules.component}
      {#if variants}
        <div class="text-2xl mb-4">
          {#if data.page.name.startsWith('+layout')}
            Layout
          {:else if data.page.name.startsWith('+page')}
            Page
          {:else}
            Component
          {/if}
          Variants
        </div>
        {#each variants as { name, description, viewports: variantViewports, props }, index (index)}
          <div class="inline-block whitespace-nowrap overflow-x-auto w-full">
            <div class="flex">
              {#each variantViewports || fileViewports || viewports as { name: viewportName, width, height }}
                {#each languages || [{ name: null, code: null }] as { name: languageName, code: languageCode }}
                  <View
                    title={name}
                    description={description}
                    {width}
                    {height}
                    {languageCode}
                    queryParams="variantIdx={index}"
                    useIframe={!wouldRecurseInfinitelyInSandbox}>
                    {#if wouldRecurseInfinitelyInSandbox}
                      <svelte:component this={data.loadedModules.component} {...props || {}} />
                    {/if}
                  </View>
                {/each}
              {/each}
            </div>
          </div>
        {/each}
      {/if}
    {/if}

    {#if doesNotHaveStoriesOrVariants}
      <div class="mb-3 p-3 bg-gray-200 rounded">
        <b>Kitbook tip</b>: You have not created a Stories file ({data.page?.name}.svx/.md) nor a
        Variants file ({data.page?.name}.variants.ts) file. In the future Kitbook will try to
        automatically supply default props, but until then you must manually scaffold a page for
        this component by creating either a Stories or Variants file.
      </div>
    {/if}

    <EditInGithub path={data?.page?.path} />
  {/if}
</main>
