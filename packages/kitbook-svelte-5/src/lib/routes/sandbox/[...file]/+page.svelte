<script lang="ts">
  import ErrorBoundary from 'kitbook/components/ErrorBoundary.svelte'
  import CreateStoryBoundary from 'kitbook/components/CreateStoryBoundary.svelte'
  import type { PageData } from './$types.js'

  const { data }: { data: PageData } = $props()
  const { Component } = $derived(data)
  const default_props = { data: {} }
</script>

<div class="absolute inset-0 overflow-auto" class:dark={data.dark_mode} class:bg-black={data.dark_mode}>
  {#if data.can_mount}
    {#key data.page_key}
      {#if data.stories_module}
        <ErrorBoundary>
          Has stories, put here
        </ErrorBoundary>
      {:else if Component}
        <CreateStoryBoundary>
          <Component {...default_props} />
        </CreateStoryBoundary>
      {/if}
    {/key}
  {:else}
    No SSR: {data.page_key}
  {/if}
</div>

<svelte:head>
  <title>Kitbook Sandbox</title>
</svelte:head>
