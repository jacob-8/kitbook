<script lang="ts">
  import type { Folder } from 'kitbook'
  import Page from './Page.svelte'
  import { createNewComponent, createNewPage, createNewServerEndpoint } from '$lib/open/openFiles'
  import { goto } from '$app/navigation'

  export let folder: Folder
  export let kitbookPath: string // calculated from url not passed from settings - a little inconsistent
  export let activePath: string
  export let expanded = false

  const isRootFolder = folder.name === '.'
  $: active = activePath.includes(folder.url)
  $: actualExpandedState = activePath.includes(folder.url) || expanded // keep folder.url in here as well to re-expand if something has been closed and then url changes by navigation to next page

  function add() {
    let suggested_filename = 'ComponentName'
    if (folder.url.includes('routes'))
      suggested_filename = 'display/+page.svelte'
    if (folder.url.includes('api'))
      suggested_filename = 'shout/+server.ts'

    const new_filename = prompt('What template would you like to create? (ComponentName, display/+page.svelte, shout/+server.ts)', suggested_filename)
    if (!new_filename)
      return

    const filepath = `src${folder.url}/${new_filename}`
    const extension = /\.[^/.]+$/
    const url = `${kitbookPath}${folder.url}/${new_filename.replace(extension, '')}`

    if (new_filename.endsWith('+page.svelte')) {
      createNewPage(filepath)
      return goto(url)
    }

    if (new_filename.endsWith('+server.ts'))
      return createNewServerEndpoint(filepath)

    if (new_filename.endsWith('.svelte')) {
      createNewComponent(filepath)
      location.reload()
      return location.href = url
    }

    createNewComponent(`${filepath}.svelte`)
    location.reload()
    location.href = url
  }
</script>

<!-- TODO: don't show folder if not dev and no pages with markdown, compositions, or variants -->

{#if folder.name !== 'kitbook'}
  {#if !isRootFolder}
    <div class="w-full flex pr-3 group">
      <button
        type="button"
        class="hover:text-blue-700 capitalize font-semibold cursor-pointer grow text-sm text-left"
        class:text-blue-800={active}
        style="padding-left: calc(0.75rem * {folder.depth - 1}"
        on:click={() => (actualExpandedState = !actualExpandedState)}>
        <span
          class="border-l border-gray-300 hover:border-blue-700 pr-3"
          class:border-dotted={!active} />
        <span class="py-1">
          {folder.name}
        </span>
      </button>
      {#if import.meta.hot}
        <button on:click={add} class="opacity-0 group-hover:opacity-100 hover:bg-gray-200 px-2 rounded" type="button">+</button>
      {/if}
    </div>
  {/if}

  {#if isRootFolder || actualExpandedState}
    {#each folder.pages as page}
      {#if page.url !== '/README' && page.url !== '/index'}
        <Page {page} {kitbookPath} {activePath} depth={folder.depth} />
      {/if}
    {/each}
    {#each folder.folders as subfolder}
      <svelte:self folder={subfolder} {expanded} {kitbookPath} {activePath} />
    {/each}
  {/if}
{/if}
