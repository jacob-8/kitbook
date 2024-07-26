<script lang="ts">
  import type { SvelteModules } from 'kitbook'

  export let svelte_modules: SvelteModules
  export let kitbookPath: string

  $: ids = Object.keys(svelte_modules)
  $: isKitbook = ids.includes('/lib/routes/[...file]/+page')

  $: page_ids = isKitbook
    ? ids.filter(id => id.endsWith('MainPage') || id.endsWith('SandboxPage') || id.endsWith('ToolsPage'))
      .sort((a, b) => a.localeCompare(b))
    : ids.filter(id => id.endsWith('+page') || id.endsWith('+layout'))
      .sort((a, b) => a.localeCompare(b))

</script>

<a href="#routes" id="routes" class="font-semibold my-2 text-lg">Routes</a>

<div class="flex flex-col border-t">
  {#each page_ids as id}
    <a href="{kitbookPath}{id}">
      {id.replace('/routes', '').replace(/\/\+(page|layout)/, '') || '/'}
      {#if id.endsWith('+layout')}
        <div class="inline p-1 bg-green bg-op-30 text-green-7 font-semibold rounded text-xs">
          layout
        </div>
      {/if}
    </a>
  {/each}
</div>

<style>
  a:not(#routes) {
    --at-apply: hover:text-blue-700 p-2 border-b;
  }
</style>
