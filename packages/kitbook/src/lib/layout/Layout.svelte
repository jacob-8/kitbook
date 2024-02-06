<script lang="ts">
  import '@kitbook/mdsvex-shiki-twoslash/shiki-twoslash.css'
  import '../styles/main.css'
  import { MultiSelect, createPersistedStore } from 'svelte-pieces'
  import type { GroupedPageMap, KitbookSettings } from '../kitbook-types'
  import Header from './sidebar/Header.svelte'
  import Sidebar from './sidebar/Sidebar.svelte'
  import { putPagesIntoFolders } from './parseModules/putPagesIntoFolders'
  import LayoutPanes from './LayoutPanes.svelte'
  import { findKitbookPath } from './kitbookPath'

  export let settings: KitbookSettings
  export let pathname: string
  export let pages: GroupedPageMap

  $: ({ kitbookPath, activePath } = findKitbookPath(pathname))
  let showSidebar = false

  const [firstLanguage] = settings.languages
  $: availableLanguagesBasedKey = settings.languages.map(({ code }) => code).join('-')
  const selectedLanguages = createPersistedStore(`selected-languages_${availableLanguagesBasedKey}`, { [firstLanguage.code]: { name: firstLanguage.name, value: firstLanguage.code } })
</script>

<LayoutPanes>
  <svelte:fragment slot="leftside">
    <Header bind:showSidebar githubURL={settings.githubURL} {kitbookPath} {activePath}>
      <slot name="title">{settings.title}</slot>
    </Header>
    {#if settings.languages.length > 1}
      <div class="mx-2 mb-2">
        <MultiSelect placeholder="Select languages" options={settings.languages.map(({ name, code }) => ({ name, value: code }))} bind:selectedOptions={$selectedLanguages} />
      </div>
    {/if}
    <nav class="hidden md:block overflow-y-auto grow-1">
      <Sidebar bind:showSidebar folder={putPagesIntoFolders(pages)} {kitbookPath} {activePath} expanded={settings.expandTree}>
        <svelte:fragment slot="footer"><slot name="footer" /></svelte:fragment>
      </Sidebar>
    </nav>
  </svelte:fragment>

  <slot activeLanguages={Object.values($selectedLanguages).map(({ name, value }) => ({ name, code: value }))} />
</LayoutPanes>

<svelte:head>
  <meta name="description" content={settings.description} />
</svelte:head>
