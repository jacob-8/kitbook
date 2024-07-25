<script lang="ts">
  import '@kitbook/mdsvex-shiki-twoslash/shiki-twoslash.css'
  import './frame.css'
  import { MultiSelect, createPersistedStore } from 'svelte-pieces'
  import { readable } from 'svelte/store'
  import type { GroupedPageMap, KitbookSettings } from '../../../kitbook-types'
  import { putPagesIntoFolders } from '../../../modules/parseModules/putPagesIntoFolders'
  import SearchModal from '../../../components/search/SearchModal.svelte'
  import LaunchSearch from '../../../components/search/LaunchSearch.svelte'
  import Header from './sidebar/Header.svelte'
  import Sidebar from './sidebar/Sidebar.svelte'
  import LayoutPanes from './FramePanes.svelte'
  import { urlFromPath } from './parseUpdatedPath'
  import Toast from '$lib/components/Toast.svelte'
  import { goto } from '$app/navigation'

  export let settings: KitbookSettings
  export let kitbookPath: string
  export let activePath: string
  export let pages: GroupedPageMap

  let showSidebar = false

  let selectedLanguages = readable(null)
  $: activeLanguages = Object.values($selectedLanguages || {}).map(({ name, value }) => ({ name, code: value }))

  if (settings.languages?.length > 1) {
    const availableLanguagesBasedKey = settings.languages.map(({ code }) => code).join('-')
    const [firstLanguage] = settings.languages
    selectedLanguages = createPersistedStore(`${settings.title} selected-languages ${availableLanguagesBasedKey}`, { [firstLanguage.code]: { name: firstLanguage.name, value: firstLanguage.code } })
  }

  let SearchModalComponent: SearchModal

  let urlForEditedFile: string

  if (import.meta.hot) {
    import.meta.hot.on('kitbook:to-client:route-to-edited-file', ({ filepath }) => {
      const url = kitbookPath + urlFromPath(filepath)
      const hasPage = !!Object.values(pages).find(page => page.url === url)
      if (hasPage && location.pathname !== url)
        urlForEditedFile = url
      else
        urlForEditedFile = null
    })
    import.meta.hot.on('kitbook:to-client:open-file', () => {
      urlForEditedFile = null
    })
  }

  $: if (kitbookPath)
    urlForEditedFile = null
</script>

<LayoutPanes>
  <svelte:fragment slot="leftside">
    <Header bind:showSidebar githubURL={settings.githubURL} {kitbookPath} {activePath}>
      <slot name="title">{settings.title}</slot>
      <svelte:fragment slot="searchbutton">
        <LaunchSearch onclick={() => SearchModalComponent.open()} />
      </svelte:fragment>
    </Header>
    {#if $selectedLanguages}
      <div class="mx-2 mb-2">
        <MultiSelect placeholder="Select languages" options={settings.languages.map(({ name, code }) => ({ name, value: code }))} bind:selectedOptions={$selectedLanguages} />
      </div>
    {/if}
    <nav class="hidden md:block overflow-y-auto grow-1">
      <Sidebar title={settings.title} bind:showSidebar folder={putPagesIntoFolders(pages)} {kitbookPath} {activePath} expanded={settings.expandTree}>
        <svelte:fragment slot="footer"><slot name="footer" /></svelte:fragment>
      </Sidebar>
    </nav>
  </svelte:fragment>

  <slot {activeLanguages} />
</LayoutPanes>

<SearchModal {kitbookPath} bind:this={SearchModalComponent} />

{#if urlForEditedFile}
  <Toast on_hide={() => urlForEditedFile = null} duration_ms="hold" dismissable on_click={() => goto(urlForEditedFile)}>
    <a href={urlForEditedFile}>View edits: <span class="font-semibold">{urlForEditedFile}</span></a>
  </Toast>
{/if}

<svelte:head>
  <meta name="description" content={settings.description} />
</svelte:head>
