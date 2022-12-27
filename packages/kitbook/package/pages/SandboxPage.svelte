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
  <div id="sandbox" class="kb-232g6v">
    <svelte:component this={data.loadedModules.svx} />
  </div>
{:else}
  <div class="kb-232g6v">
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
  </div>
{/if}

<style>:global(.kb-232g6v){--un-bg-opacity:1;background-color:rgba(255,255,255,var(--un-bg-opacity));}
  #sandbox > :global(:not(.show-in-sandbox)) {
    display: none;
  }
</style>
