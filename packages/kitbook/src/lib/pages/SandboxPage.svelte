<script lang="ts">
  import { setContext } from 'svelte';
  import type { GroupedPage, GroupedPageMap, LoadedModules, MockedContext } from '../kitbook-types';
  import ErrorBoundary from '../components/ErrorBoundary';

  export let data: {
    pages: GroupedPageMap;
    page: GroupedPage;
    loadedModules: LoadedModules;
    storyId: string;
    props: Record<string, any>;
    contexts: MockedContext[];
    // error?: string;
  };

  const isStory = !!data.storyId;
  const props = data.props || {};

  if (isStory) {
    // `Story` components check the `sandboxId` context to know whether to show when in the sandbox - this is passed to the sandbox originally using the `storyId` query param in iframe url
    setContext<string>('sandboxId', data.storyId);
    setContext<Record<string, any>>('sandboxProps', props);
  }

  for (const { key, context } of data.contexts || []) {
    setContext(key, context);
  }
</script>

{#if isStory}
  <div id="sandbox" class="border">
    <svelte:component this={data.loadedModules.svx} />
  </div>
{:else}
  <div class="border">
    <ErrorBoundary onError={console.error}>
      <div slot="before">
        {#if Object.keys(props).length == 0}
          <b>Kitbook tip</b>: Your component may need props passed in. Create a "{data.page
            ?.name}.variants.ts" file with at least variant. In the future Kitbook will try to
          automatically supply default props, but until then they must be supplied manually.
        {/if}
      </div>
      <svelte:component this={data.loadedModules.component} {...props} />
    </ErrorBoundary>
  </div>
{/if}

<style>
  #sandbox > :global(:not(.show-in-sandbox)) {
    display: none;
  }
</style>
