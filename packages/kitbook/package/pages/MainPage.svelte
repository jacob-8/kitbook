<script>import { page } from "$app/stores";
import EditInGithub from "../components/EditInGithub.svelte";
import LZString from "lz-string";
const { compressToEncodedURIComponent: encode } = LZString;
export let data = { loadedModules: {} };
$:
  pathWouldRecurseInfinitelyIfInSandbox = $page.url.pathname.startsWith(
    "/lib/routes/sandbox/[...file]/+"
  );
$:
  doesNotHaveSvxOrVariants = !(data.loadedModules.svx || data.loadedModules.variants);
</script>

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
      <div class="kb-ilmpgg">
        {data.page.name.startsWith('+') ? 'Page' : 'Component'} Variants
      </div>
      {#each data.loadedModules.variants as variant, index}
        <div class="kb-8zkdx0 not-prose">
          <div class="kb-p4pms6">
            <span class="kb-mjdsqx">
              {variant.name}
            </span>
            {#if variant.description}
              <div class="kb-pabyyk">
                {variant.description}
              </div>
            {/if}
          </div>
          {#if pathWouldRecurseInfinitelyIfInSandbox}
            <svelte:component this={data.loadedModules.component} {...variant.props || {}} />
          {:else}
            <iframe
              class="kb-1q1hln"
              title=""
              src="/sandbox/{$page.url.pathname}?props={encode(
                JSON.stringify(variant.props || {})
              )}&variantIdx={index}"
            />
          {/if}
        </div>
      {/each}
      <!-- {:else if !pathWouldRecurseInfinitelyIfInSandbox}
      <div class="kb-8zkdx0 not-prose">
        <div class="kb-p4pms6">
          <span class="kb-mjdsqx"> Default </span>
        </div>
        <iframe
          class="kb-1q1hln"
          title=""
          src="/sandbox/{$page.url.pathname}?props={encode(JSON.stringify({}))}"
        />
      </div> -->
    {/if}
  {/if}

  {#if doesNotHaveSvxOrVariants}
    <div class="kb-5q2dnw">
      <b>Kitbook tip</b>: You have not created a Stories file ({data.page?.name}.svx/.md) nor a Variants file ({data
        .page?.name}.variants.ts) file. In the future Kitbook will try to
      automatically supply default props, but until then you must manually scaffold a page for this
      component by creating either a Stories or Variants file.
    </div>
  {/if}

  <EditInGithub path={data?.page?.path} />
{/if}

<style>:global(.kb-5q2dnw){margin-bottom:0.75rem;border-radius:0.25rem;--un-bg-opacity:1;background-color:rgba(229,231,235,var(--un-bg-opacity));padding:0.75rem;}:global(.kb-8zkdx0){margin-top:0.75rem;border-width:1px;border-radius:0.25rem;}:global(.kb-abrjob){margin-bottom:2.5rem;}:global(.kb-p4pms6){margin-bottom:0.5rem;--un-bg-opacity:1;background-color:rgba(229,231,235,var(--un-bg-opacity));padding:0.75rem;}:global(.kb-1q1hln){height:100%;width:100%;}:global(.kb-ilmpgg){font-size:1.5rem;line-height:2rem;}:global(.kb-pabyyk){font-size:0.875rem;line-height:1.25rem;}:global(.kb-mjdsqx){font-weight:600;}</style>