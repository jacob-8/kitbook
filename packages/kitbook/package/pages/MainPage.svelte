<script>import { page } from "$app/stores";
import EditInGithub from "../components/EditInGithub.svelte";
import View from "../view/View.svelte";
export let data = { loadedModules: {} };
$:
  wouldRecurseInfinitelyInSandbox = $page.url.pathname.startsWith(
    "/lib/routes/sandbox/[...file]/+"
  );
$:
  doesNotHaveSvxOrVariants = !(data.loadedModules.svx || data.loadedModules.variants);
</script>

<div class="kb-2ax1r3">
  <div class="kb-klwpws tw-prose">
    {#if data.error}
      {data.error}
    {:else}
      {#if data.loadedModules.svx}
        <div class="kb-abrjob">
          <svelte:component this={data.loadedModules.svx} />
        </div>
      {/if}

      {#if data.loadedModules.component}
        {#if data.loadedModules.variants}
          <div class="kb-ezm9ao">
            {data.page.name.startsWith('+') ? 'Page' : 'Component'} Variants
          </div>
          {#each data.loadedModules.variants as variant, index}
            <View
              title={variant.name}
              description={variant.description}
              width={variant.width}
              height={variant.height}
              props={variant.props || {}}
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

      {#if doesNotHaveSvxOrVariants}
        <div class="kb-5q2dnw">
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

<style>:global(.kb-5q2dnw){margin-bottom:0.75rem;border-radius:0.25rem;--un-bg-opacity:1;background-color:rgba(229,231,235,var(--un-bg-opacity));padding:0.75rem;}:global(.kb-abrjob){margin-bottom:2.5rem;}:global(.kb-ezm9ao){margin-bottom:1rem;font-size:1.5rem;line-height:2rem;}:global(.kb-2ax1r3){height:100%;padding-right:0.5rem;}:global(.kb-klwpws){height:100%;max-width:100%;overflow-y:auto;padding:1rem;padding-right:0.5rem;}</style>