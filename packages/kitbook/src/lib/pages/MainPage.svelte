<script lang="ts">
  import type { GroupedPage, GroupedPageMap, LoadedModules } from '../kitbook-types';
  import { page } from '$app/stores';
  import { compressToEncodedURIComponent as encode } from 'lz-string';
  import EditInGithub from '../components/EditInGithub.svelte';
  export let data: {
    pages: GroupedPageMap;
    page: GroupedPage;
    loadedModules: LoadedModules;
  };

  $: pathWouldRecurseInfinitelyIfInSandbox = $page.url.pathname.startsWith('/routes/sandbox');
</script>

{#if data.loadedModules.svx}
  <svelte:component this={data.loadedModules.svx} />
{/if}

{#if data.loadedModules.variants}
  <div class="mt-10 text-2xl">
    {data.loadedModules.componentRaw ? 'Component' : 'Page'} Variants
  </div>
  {#each data.loadedModules.variants as variant, index}
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
      {#if pathWouldRecurseInfinitelyIfInSandbox}
        <svelte:component this={data.loadedModules.page} {...variant.props || {}} />
      {:else}
        <iframe
          class="w-full h-full"
          title=""
          src="/sandbox/{$page.url.pathname}?props={encode(
            JSON.stringify(variant.props || {})
          )}&variantIdx={index}"
        />
      {/if}
    </div>
  {/each}
{:else}
  <!-- When no variants provided, place sandboxed component here with default props based off component types -->
{/if}

<EditInGithub path={data.page.path} />

<!-- By default Kitbook will try to display your project's README.md file as it's home page if no src/docs/index.md (.svx) file exists.<br /><br /> -->
