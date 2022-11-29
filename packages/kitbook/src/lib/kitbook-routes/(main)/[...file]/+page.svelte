<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<div class="not-prose">
  {#if data?.svx}
    <svelte:component this={data.svx} />
  {/if}
</div>

<!-- <iframe width="300" height="200" title="" src="/sandbox/hello?isolate" /> -->

<!-- {#if data?.svxRaw}
  <pre>{data.svxRaw}</pre>
  <hr />
{/if} -->

{#if data?.component || data?.page}
  {#if data?.variants}
    {#each data.variants as variant}
      <div>
        {variant.name}:<br />
        <svelte:component this={data.component || data.page} {...variant.props} />
      </div>
    {/each}
    <pre>{data.variantsRaw}</pre>
  {:else}
    If no variants are provided, then place sandboxed component here with default props based off
    component types
    <svelte:component this={data.component || data.page} />
  {/if}
  <!-- <pre>{data.componentRaw || data.pageRaw}</pre> -->
{/if}

<!-- {#if githubURL}
  <a
    href={githubURL + '/src/' + (root || '') + activePage?.path.substring(1)}
    class="text-blue-500 hover:text-blue-600 flex items-center my-5"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="i-iconoir-page-edit text-lg mr-1" />Edit page on GitHub</a
  >
{/if} -->
