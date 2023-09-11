<script lang="ts">
  import '../styles/tw-prose.css';
  import { getContext, type SvelteComponent } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { page } from '$app/stores';
  import type { GroupedPage, GroupedPageMap, LoadedModules, Variants } from '../kitbook-types';
  import EditInGithub from '../components/EditInGithub.svelte';
  import View from '../view/View.svelte';

  export let data: {
    pages?: GroupedPageMap;
    page?: GroupedPage;
    pageKey?: string;
    loadedModules?: LoadedModules;
    error?: string;
  } = { loadedModules: {} };

  const pagesStore = getContext<Writable<GroupedPageMap>>('pages-store');

  let updatedVariants: Variants<SvelteComponent>;
  $: if ($pagesStore?.[data.pageKey]) {
    (async () => {
      updatedVariants = (await $pagesStore[data.pageKey]?.loadVariants?.loadModule())
        ?.variants as Variants<SvelteComponent>;
    })();
  }
  $: variants = updatedVariants || data.loadedModules?.variants;

  $: wouldRecurseInfinitelyInSandbox = $page.url.pathname.startsWith(
    '/lib/routes/kitbook/sandbox/[...file]/+'
  );
  $: doesNotHaveStoriesOrVariants = !(data.loadedModules?.svx || data.loadedModules?.variants);
</script>

<div class="tw-prose max-w-full">
  {#if data.error}
    <div class="text-red">
      Error: {data.error}
    </div>
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
        {#each variants as variant, index (index)}
          <View
            title={variant.name}
            description={variant.description}
            width={variant.width}
            height={variant.height}
            queryParams="variantIdx={index}"
            useIframe={!wouldRecurseInfinitelyInSandbox}
          >
            {#if wouldRecurseInfinitelyInSandbox}
              <svelte:component this={data.loadedModules.component} {...variant.props || {}} />
            {/if}
          </View>
        {/each}
      {/if}
    {/if}

    {#if doesNotHaveStoriesOrVariants}
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
