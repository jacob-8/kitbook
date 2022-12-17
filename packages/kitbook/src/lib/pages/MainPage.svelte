<script lang="ts">
  import { page } from '$app/stores';
  import { compressToEncodedURIComponent as encode } from 'lz-string';
  import type { GroupedPage, GroupedPageMap, LoadedModules } from '../kitbook-types';
  import EditInGithub from '../components/EditInGithub.svelte';

  export let data: {
    pages?: GroupedPageMap;
    page?: GroupedPage;
    loadedModules?: LoadedModules;
    error?: string;
  } = { loadedModules: {} };

  $: pathWouldRecurseInfinitelyIfInSandbox = $page.url.pathname.startsWith(
    '/lib/routes/sandbox/[...file]/+'
  );
  $: doesNotHaveSvxOrVariants = !(data.loadedModules.svx || data.loadedModules.variants);
</script>

{#if data.error}
  {data.error}
{:else}
  {#if data.loadedModules.svx}
    <div class="mb-10">
      <svelte:component this={data.loadedModules.svx} />
    </div>
  {/if}

  {#if data.loadedModules.component}
    {#if data.loadedModules.variants}
      <div class="text-2xl">
        {data.page.name.startsWith('+') ? 'Page' : 'Component'} Variants
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
            <svelte:component this={data.loadedModules.component} {...variant.props || {}} />
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
      <!-- {:else if !pathWouldRecurseInfinitelyIfInSandbox}
      <div class="not-prose border rounded mt-3">
        <div class="bg-gray-200 p-3 mb-2">
          <span class="font-semibold"> Default </span>
        </div>
        <iframe
          class="w-full h-full"
          title=""
          src="/sandbox/{$page.url.pathname}?props={encode(JSON.stringify({}))}"
        />
      </div> -->
    {/if}
  {/if}

  {#if doesNotHaveSvxOrVariants}
    <div class="mb-3 p-3 bg-gray-200 rounded">
      <b>Kitbook tip</b>: You have not created a Stories file ({data.page?.name}.svx/.md) nor a Variants file ({data
        .page?.name}.variants.ts) file. In the future Kitbook will try to
      automatically supply default props, but until then you must manually scaffold a page for this
      component by creating either a Stories or Variants file.
    </div>
  {/if}

  <EditInGithub path={data?.page?.path} />
{/if}
