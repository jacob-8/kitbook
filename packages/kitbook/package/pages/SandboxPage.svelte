<script>import { setContext } from "svelte";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary.js";
import { pagesStore } from "../modules/hmrUpdatedModules";
export let data;
let updatedVariant;
$:
  if ($pagesStore?.[data.pageKey] && data.variantIdx) {
    (async () => {
      updatedVariant = (await $pagesStore[data.pageKey].loadVariants.loadModule())?.variants[data.variantIdx] || {};
    })();
  }
const isStory = !!data.storyId;
$:
  variantProps = updatedVariant?.props || data.variant?.props || {};
if (isStory) {
  setContext("sandboxId", data.storyId);
  setContext("sandboxProps", data.editedProps || {});
}
for (const { key, context } of data.variant?.contexts || []) {
  setContext(key, context);
}
</script>

<div class="kb-e6mrpv">
  {#if isStory}
    <div id="sandbox" style="display: contents;">
      <svelte:component this={data.loadedModules.svx} />
    </div>
  {:else}
    <ErrorBoundary onError={console.error}>
      <div slot="before">
        {#if Object.keys(variantProps).length == 0}
          <b>Kitbook tip</b>: Your component may need props passed in. Create a "{data.page
            ?.name}.variants.ts" file with at least variant. In the future Kitbook will try to
          automatically supply default props, but until then they must be supplied manually.
        {/if}
      </div>
      {#if data.variant?.slots}
        {@const content = data.variant.slots[0].content}
        <svelte:component this={data.loadedModules.component} {...variantProps}>
          {#if typeof content === 'string'}
            {@html content}
          {:else}
            <svelte:component this={content} />
          {/if}
        </svelte:component>
      {:else}
        <svelte:component this={data.loadedModules.component} {...variantProps} />
      {/if}
    </ErrorBoundary>
  {/if}
</div>

<style>:global(.kb-e6mrpv){position:absolute;inset:0rem;overflow:auto;}
  #sandbox > :global(:not(.show-in-sandbox)) {
    display: none;
  }
</style>
