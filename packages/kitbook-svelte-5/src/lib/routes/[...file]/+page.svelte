<script lang="ts">
  import SvelteModuleOverview from './SvelteModuleOverview.svelte'
  import SvelteModuleDetail from './SvelteModuleDetail.svelte'
  import type { PageData } from './$types.js'

  const { data }: { data: PageData } = $props()
</script>

<div class="flex items-center p-3 bg-gray-100">
  <a href="/" class="text-lg">
    Home
  </a>

  {#if data.page_key !== 'HOME'}
    <div class="ml-1">
      > {data.page_key}
    </div>
  {/if}
</div>

{#if data.page_key === 'HOME'}
  {#each Object.values(data.parsed_module_sets) as parsed_module}
    {#if parsed_module.is_route}
      <SvelteModuleOverview
        module_set={parsed_module} />
    {/if}
  {/each}
{:else}
  <SvelteModuleDetail parsed_module={data.parsed_module_sets[data.page_key]} />
{/if}
