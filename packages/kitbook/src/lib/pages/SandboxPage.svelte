<script lang="ts">
  import { setContext, type SvelteComponent } from 'svelte';
  import type { GroupedPage, GroupedPageMap, LoadedModules, Variant } from '../kitbook-types';
  import ErrorBoundary from '../components/errorBoundary/ErrorBoundary.js';

  export let data: {
    pages: GroupedPageMap;
    page: GroupedPage;
    loadedModules: LoadedModules;
    storyId: string;
    variant?: Variant<typeof SvelteComponent>;
    editedProps?: Record<string, any>;
    // error?: string;
  };

  const isStory = !!data.storyId;
  const props = data.editedProps || data.variant?.props || {};

  if (isStory) {
    // `Story` components check the `sandboxId` context to know whether to show when in the sandbox - this is passed to the sandbox originally using the `storyId` query param in iframe url
    setContext<string>('sandboxId', data.storyId);
    setContext<Record<string, any>>('sandboxProps', props);
  }

  for (const { key, context } of data.variant?.contexts || []) {
    setContext(key, context);
  }
</script>

<div class="absolute inset-0 overflow-auto">
  {#if isStory}
    <div id="sandbox" style="display: contents;">
      <svelte:component this={data.loadedModules.svx} />
    </div>
  {:else}
    <ErrorBoundary onError={console.error}>
      <div slot="before">
        {#if Object.keys(props).length == 0}
          <b>Kitbook tip</b>: Your component may need props passed in. Create a "{data.page
            ?.name}.variants.ts" file with at least variant. In the future Kitbook will try to
          automatically supply default props, but until then they must be supplied manually.
        {/if}
      </div>
      {#if data.variant?.slots}
        {@const content = data.variant.slots[0].content}
        <svelte:component this={data.loadedModules.component} {...props}>
          {#if typeof content === 'string'}
            {@html content}
          {:else}
            <svelte:component this={content} />
          {/if}
        </svelte:component>
      {:else}
        <svelte:component this={data.loadedModules.component} {...props} />
      {/if}
    </ErrorBoundary>
  {/if}
</div>

<style>
  #sandbox > :global(:not(.show-in-sandbox)) {
    display: none;
  }
</style>
