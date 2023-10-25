<script lang="ts">
  import '@kitbook/mdsvex-shiki-twoslash/shiki-twoslash.css'
  import '../styles/main.css'
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

  let activeLanguages = [settings.languages[0]]

  function changeLanguage(event) {
    const { selectedOptions } = event.target as HTMLSelectElement
    const languageCodes = Array.from(selectedOptions, option => option.value)
    activeLanguages = languageCodes.map(code => settings.languages.find(language => language.code === code))
  }
</script>

<LayoutPanes>
  <svelte:fragment slot="leftside">
    <Header bind:showSidebar githubURL={settings.githubURL} {kitbookPath} {activePath}>
      <slot name="title">{settings.title}</slot>
    </Header>
    {#if settings.languages.length > 1}
      <div class="font-semibold px-2">Language:</div>
      <select multiple class="mx-1 mb-2 p-1 bg-transparent text-sm" on:change={changeLanguage}>
        {#each settings.languages as language}
          <option value={language.code} selected={activeLanguages.includes(language)}>{language.name}</option>
        {/each}
      </select>
    {/if}
    <nav class="hidden md:block overflow-y-auto grow-1">
      <Sidebar bind:showSidebar folder={putPagesIntoFolders(pages)} {kitbookPath} {activePath} expanded={settings.expandTree}>
        <svelte:fragment slot="footer"><slot name="footer" /></svelte:fragment>
      </Sidebar>
    </nav>
  </svelte:fragment>

  <slot {activeLanguages} />
</LayoutPanes>

<svelte:head>
  <!-- TODO: Update based on title + current page -->
  <title>{settings.title}</title>
  <meta name="description" content={settings.description} />
</svelte:head>
