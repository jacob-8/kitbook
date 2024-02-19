<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { componentsWithChildren } from './compiledNodes'
  import Component from './Component.svelte'

  export let languageInsertedKitbookRoute: string

  const dispatch = createEventDispatcher<{ close: boolean }>()
</script>

<div class="flex font-semibold items-center border-b border-gray-300 text-lg">
  <button type="button" on:click={() => dispatch('close')}><span class="i-material-symbols-close align--3px" /></button>
  <a href="https://kitbook.vercel.app/" target="_blank" title="Go to Docs" class="mr-auto">Kitbook Viewer</a>
  <a href={languageInsertedKitbookRoute} target="_blank" title="Go to Kitbook"><span class="i-tabler-external-link align--3px text-xl" /></a>
</div>

<div class="flex flex-col overflow-y-auto">
  <!-- use spread for Svelte 3 compatibility, not needed in Svelte 4 -->
  {#each [...$componentsWithChildren] as [_fragment, { componentDetail, childComponents }] (_fragment)}
    {#if componentDetail.tagName === 'Root'}
      <!-- use spread for Svelte 3 compatibility, not needed in Svelte 4 -->
      {#each [...childComponents] as componentFragment (componentFragment)}
        <Component {componentFragment} componentsWithChildren={$componentsWithChildren} />
      {/each}
    {/if}
  {/each}
</div>

<style>
  button, a {
    --at-apply: p-2 hover:bg-gray-200;
  }
</style>
