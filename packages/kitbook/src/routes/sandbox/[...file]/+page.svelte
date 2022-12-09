<script lang="ts">
  import { setContext } from 'svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const isStory = !!data.storyId;
  const isVariant = !data.storyId;

  if (isStory) {
    // `Story` components check the `sandboxId` context to know whether to show when in the sandbox - this is passed to the sandbox originally using the `storyId` query param in iframe url
    setContext<string>('sandboxId', data.storyId);
    setContext<Record<string, any>>('sandboxProps', data.props || {});
  }

  for (const { key, context } of data.contexts || []) {
    setContext(key, context);
  }
</script>

{#if isStory}
  <div id="sandbox" class="border">
    <svelte:component this={data.component} />
  </div>
{:else if isVariant}
  <div class="border">
    <svelte:component this={data.component} {...data.props || {}} />
  </div>
{/if}

<style>
  #sandbox > :global(:not(.show-in-sandbox)) {
    display: none;
  }
</style>
