<script>import { setContext } from "svelte";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary.js";
export let data;
const isStory = !!data.storyId;
const props = data.editedProps || data.variant?.props || {};
if (isStory) {
  setContext("sandboxId", data.storyId);
  setContext("sandboxProps", props);
}
for (const { key, context } of data.variant?.contexts || []) {
  setContext(key, context);
}
</script>

{#if isStory}
  <div id="sandbox" class="kb-pai8o2">
    <svelte:component this={data.loadedModules.svx} />
  </div>
{:else}
  <div class="kb-pai8o2">
    <ErrorBoundary onError={console.error}>
      <div slot="before">
        {#if Object.keys(props).length == 0}
          <b>Kitbook tip</b>: Your component may need props passed in. Create a "{data.page
            ?.name}.variants.ts" file with at least variant. In the future Kitbook will try to
          automatically supply default props, but until then they must be supplied manually.
        {/if}
      </div>
      <svelte:component this={data.loadedModules.component} {...props}>
        {#if data.variant?.slots}
          {@const content = data.variant.slots[0].content}
          {#if typeof content === 'string'}
            {@html content}
          {:else}
            <svelte:component this={content} />
          {/if}
        {/if}
      </svelte:component>
    </ErrorBoundary>
  </div>
{/if}

<style>:global(.kb-pai8o2){border-width:1px;}
  #sandbox > :global(:not(.show-in-sandbox)) {
    display: none;
  }
</style>
