<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

{#if data?.svx}
  <svelte:component this={data.svx} />
{/if}

<!-- <iframe width="300" height="200" title="" src="/sandbox/hello?isolate" /> -->

<!-- {#if data?.svxRaw}
  <pre>{data.svxRaw}</pre>
  <hr />
{/if} -->

{#if data?.component || data?.page}
  {#if data?.variants}
    <div class="mt-10 text-2xl">
      Variants
    </div>
    {#each data.variants as variant}
      <div class="not-prose border rounded mt-3">
        <div class="bg-gray-200 p-3 mb-2">
          <span class="font-semibold">
            {variant.name}
          </span>
          {#if variant.description}
            <div class="text-sm">
              {variant.description}
            </div>
          {/if}
        </div>
        <svelte:component this={data.component || data.page} {...variant.props} />
      </div>
    {/each}
    <!-- <pre>{data.variantsRaw}</pre> -->
  {:else}
    <!-- <hr />
    No variants provided, place sandboxed component here with default props based off component
    types
    <div class="not-prose p-2 border rounded">
      <svelte:component this={data.component || data.page} />
    </div> -->
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
