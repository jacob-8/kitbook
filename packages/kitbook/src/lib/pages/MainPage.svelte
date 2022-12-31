<script lang="ts">
  import { page } from '$app/stores';
  import type { GroupedPage, GroupedPageMap, LoadedModules } from '../kitbook-types';
  import EditInGithub from '../components/EditInGithub.svelte';
  import FrameBody from '../frame/FrameBody.svelte';
  import FrameHeader from '../frame/FrameHeader.svelte';
  import Iframe from '$lib/iframe/Iframe.svelte';

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

<div class="pr-2 h-full">
  <div class="h-full overflow-y-auto tw-prose max-w-full p-4 pr-2">
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
          <div class="text-2xl mb-4">
            {data.page.name.startsWith('+') ? 'Page' : 'Component'} Variants
          </div>
          {#each data.loadedModules.variants as variant, index}
            <div class="not-prose mb-4">
              <FrameHeader
                title={variant.name}
                description={variant.description}
                width={variant.width}
                height={variant.height}
                let:adjustedHeight
                let:adjustedWidth
              >
                <FrameBody height={adjustedHeight} width={adjustedWidth}>
                  {#if pathWouldRecurseInfinitelyIfInSandbox}
                    <svelte:component
                      this={data.loadedModules.component}
                      {...variant.props || {}}
                    />
                  {:else}
                    <Iframe props={variant.props || {}} queryParams="variantIdx={index}" />
                  {/if}
                </FrameBody>
              </FrameHeader>
            </div>
          {/each}
        {/if}
      {/if}

      {#if doesNotHaveSvxOrVariants}
        <div class="mb-3 p-3 bg-gray-200 rounded">
          <b>Kitbook tip</b>: You have not created a Stories file ({data.page?.name}.svx/.md) nor a
          Variants file ({data.page?.name}.variants.ts) file. In the future Kitbook will try to
          automatically supply default props, but until then you must manually scaffold a page for
          this component by creating either a Stories or Variants file.
        </div>
      {/if}

      <EditInGithub path={data?.page?.path} />
    {/if}
  </div>
</div>
