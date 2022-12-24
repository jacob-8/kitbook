<script>import { getContext } from "svelte";
import { page } from "$app/stores";
import { compressToEncodedURIComponent as encode } from "lz-string";
export let name = "default";
export let id = name.replace(/ /g, "_");
export let width = void 0;
export let height = void 0;
export let persist = void 0;
export let useSandbox = true;
const propsFromSandbox = getContext("sandboxProps");
const idFromSandbox = getContext("sandboxId");
const targetedSandboxStory = id === idFromSandbox;
import parseInput from "./knobs";
import Knobs from "./Knobs.svelte";
let input = void 0;
export { input as knobs };
$:
  knobs = input && parseInput(input);
function set(field, value) {
  $knobs[field] = value;
}
</script>

{#if targetedSandboxStory}
  <div class="show-in-sandbox">
    <slot props={propsFromSandbox} />
  </div>
{:else if !idFromSandbox}
  <div class="kb-myu0y7" />
  <div class="kb-a9wyrg {$$props.class} not-prose">
    <div class="kb-06dbmj">
      <div class="kb-2m1avc">
        {name}
        <div class="kb-4i60dx" />

        <!-- {#if code}
          <button
            title="Code Preview"
            class:kb-gx7ojj={showCode}
            class:kb-eun4lx={showCode}
            class="kb-yhdktu"
            on:click={() => (showCode = !showCode)}><span class="i-tabler-code" /></button
          >
        {/if} -->
        <button
          title="toggle width"
          class="kb-yhdktu"
          on:click={() => (width ? (width = undefined) : (width = 300))}
          ><span class="i-ant-design-column-width-outlined" /></button
        >
        <button
          title="toggle height"
          class="kb-yhdktu"
          on:click={() => (height ? (height = undefined) : (height = 200))}
          ><span class="i-ant-design-column-height-outlined" /></button
        >
      </div>

      {#if width || height}
        <div class="kb-2pwkzs">
          {#if width}
            <label>
              Width:
              <input type="number" bind:value={width} class="kb-3heh8m" />
            </label>
          {/if}
          {#if height}
            <label>
              Height:
              <input type="number" bind:value={height} class="kb-3heh8m" />
            </label>
          {/if}
        </div>
      {/if}
      {#if knobs}
        <Knobs {persist} {id} {knobs} />
      {/if}
    </div>

    <div
      style="height: {height ? `${height}px` : 'unset'}; width: {width ? `${width}px` : 'unset'}"
    >
      <div class="kb-bgqi1q">
        <div class="kb-0o95bl">
          {#if useSandbox}
            <iframe
              class="kb-9ez911"
              title=""
              src="/sandbox/{$page.url.pathname}?props={encode(JSON.stringify($knobs))}&storyId={id}"
            />
          {:else}
            <slot props={$knobs} {set} />
          {/if}
        </div>
      </div>
    </div>
  </div>

  <div class="kb-myu0y7" />
{/if}

<!--
 @component
 Pass knobs properties (boolean, string, number, or range) to the `knobs` prop, then access values from `let:props`. Typescript provides autocompletion for the props on the way out. I prefer to use the shortcut notation as documented in the [Svench docs](https://svench-docs.vercel.app/_/Usage/knobs#knobs-passed-as-plain-objects-shortcut-notation) with the type of the knob being inferred from it.

Range knobs can be declared using a default value matching the format ${minValue}${maxValue};${initialValue} (e.g., -10-10;5).

Example usage: `<Story knobs={{ myBool: false, myNum: 10, myStr: 'hello', myRange: '-10-10;5' }} let:props={{myBool, myNum, myStr, myRange}}>`

TODO: accept negative values for range initialValue

TODO: Though full object notation works as seen in the Svench docs, the type interface will be incorrect. If someone has a compelling use case for full object notation, they can help me know how to improve the use of Generics and types through the `knobs.ts` file to achieve such.
-->

<style>:global(.kb-2pwkzs){margin-top:0.5rem;font-size:0.875rem;line-height:1.25rem;}:global(.kb-4i60dx){margin-left:auto;}:global(.kb-0o95bl){height:100%;--un-bg-opacity:1;background-color:rgba(255,255,255,var(--un-bg-opacity));}:global(.kb-3heh8m){width:3.75rem;}:global(.kb-9ez911){height:100%;width:100%;}:global(.kb-bgqi1q){height:100%;padding:0.5rem;}:global(.kb-myu0y7){height:1rem;}:global(.kb-2m1avc){display:flex;font-size:0.875rem;line-height:1.25rem;font-weight:600;}:global(.kb-a9wyrg){overflow:hidden;border-width:1px;--un-border-opacity:1;border-color:rgba(229,231,235,var(--un-border-opacity));--un-shadow:var(--un-shadow-inset) 0 1px 3px 0 var(--un-shadow-color, rgba(0,0,0,0.1)),var(--un-shadow-inset) 0 1px 2px -1px var(--un-shadow-color, rgba(0,0,0,0.1));box-shadow:var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);}:global(.kb-06dbmj){--un-bg-opacity:1;background-color:rgba(229,231,235,var(--un-bg-opacity));padding:0.5rem;}:global(.kb-bgqi1q:hover){--un-bg-opacity:1;background-color:rgba(243,244,246,var(--un-bg-opacity));}:global(.kb-yhdktu){padding:0.25rem;opacity:0.5;}:global(.kb-gx7ojj){--un-text-opacity:1;color:rgba(37,99,235,var(--un-text-opacity));}:global(.kb-eun4lx){opacity:0.9;}:global(.kb-yhdktu:hover){opacity:1;}</style>