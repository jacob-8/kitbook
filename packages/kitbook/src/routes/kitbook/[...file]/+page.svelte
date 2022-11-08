<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

{#if data?.svx}
  <svelte:component this={data.svx} />
{/if}

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
