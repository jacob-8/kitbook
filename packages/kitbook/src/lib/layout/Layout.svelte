<script lang="ts">
  import '@kitbook/mdsvex-shiki-twoslash/shiki-twoslash.css'
  import '../styles/main.css'
  import { MultiSelect, createPersistedStore } from 'svelte-pieces'
  import { readable } from 'svelte/store'
  import type { GroupedPageMap, KitbookSettings } from '../kitbook-types'
  import Header from './sidebar/Header.svelte'
  import Sidebar from './sidebar/Sidebar.svelte'
  import { putPagesIntoFolders } from './parseModules/putPagesIntoFolders'
  import LayoutPanes from './LayoutPanes.svelte'
  import { findKitbookPath } from './kitbookPath'
  import SearchModal from './sidebar/search/SearchModal.svelte'
  import LaunchSearch from './sidebar/search/LaunchSearch.svelte'

  export let settings: KitbookSettings
  export let pathname: string
  export let pages: GroupedPageMap

  $: ({ kitbookPath, activePath } = findKitbookPath(pathname))
  let showSidebar = false

  const [firstLanguage] = settings.languages

  let selectedLanguages = readable(null)
  $: activeLanguages = Object.values($selectedLanguages || {}).map(({ name, value }) => ({ name, code: value }))

  if (settings.languages.length > 1) {
    const availableLanguagesBasedKey = settings.languages.map(({ code }) => code).join('-')
    selectedLanguages = createPersistedStore(`${settings.title} selected-languages ${availableLanguagesBasedKey}`, { [firstLanguage.code]: { name: firstLanguage.name, value: firstLanguage.code } })
  }

  let SearchModalComponent: SearchModal
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

<svelte:head>
  <meta name="description" content={settings.description} />
</svelte:head>
