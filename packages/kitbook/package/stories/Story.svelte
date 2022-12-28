<script>import { getContext } from "svelte";
import { page } from "$app/stores";
import LZString from "lz-string";
const { compressToEncodedURIComponent: encode } = LZString;
import FrameBody from "../frame/FrameBody.svelte";
import FrameHeader from "../frame/FrameHeader.svelte";
import parseInput from "./knobs";
import Knobs from "./Knobs.svelte";
import { portal, IntersectionObserver } from "svelte-pieces";
const DEFAULT_PIXEL_HEIGHT = 220;
export let name = "default";
export let id = name.replace(/[^A-Za-z0-9]/g, "_");
export let width = void 0;
export let height = DEFAULT_PIXEL_HEIGHT;
export let persist = void 0;
export let useSandbox = true;
const propsFromSandbox = getContext("sandboxProps");
const idFromSandbox = getContext("sandboxId");
const isCurrentSandboxStory = id === idFromSandbox;
export { input as knobs };
let input = void 0;
$:
  knobs = input && parseInput(input);
function set(field, value) {
  $knobs[field] = value;
}
</script>

{#if isCurrentSandboxStory}
  <div class="show-in-sandbox" style="display: contents;">
    <slot props={propsFromSandbox} />
  </div>
{:else if !idFromSandbox}
  <div class="kb-biwpmm not-prose">
    {#if knobs}
      <IntersectionObserver let:intersecting>
        <div class="kb-qssqsu" use:portal={'#instrument-panel'}>
          {#if intersecting}
            <div class="kb-4sd29d">{name}</div>
            <Knobs {persist} {id} {knobs} />
          {/if}
        </div>
      </IntersectionObserver>
    {/if}

    <FrameHeader title={name} {height} {width} let:adjustedHeight let:adjustedWidth>
      <FrameBody height={adjustedHeight} width={adjustedWidth}>
        {#if useSandbox}
          <iframe
            class="kb-9ez911"
            title=""
            src="/sandbox{$page.url.pathname}?props={encode(JSON.stringify($knobs))}&storyId={id}"
          />
        {:else}
          <slot props={$knobs} {set} />
        {/if}
      </FrameBody>
    </FrameHeader>
  </div>
{/if}

<!--
 @component
 Pass knobs properties (boolean, string, number, or range) to the `knobs` prop, then access values from `let:props`. Typescript provides autocompletion for the props on the way out. I prefer to use the shortcut notation as documented in the [Svench docs](https://svench-docs.vercel.app/_/Usage/knobs#knobs-passed-as-plain-objects-shortcut-notation) with the type of the knob being inferred from it.

Range knobs can be declared using a default value matching the format ${minValue}${maxValue};${initialValue} (e.g., -10-10;5).

Example usage: `<Story knobs={{ myBool: false, myNum: 10, myStr: 'hello', myRange: '-10-10;5' }} let:props={{myBool, myNum, myStr, myRange}}>`

TODO: accept negative values for range initialValue

TODO: Though full object notation works as seen in the Svench docs, the type interface will be incorrect. If someone has a compelling use case for full object notation, they can help me know how to improve the use of Generics and types through the `knobs.ts` file to achieve such.
-->


<style>:global(.kb-biwpmm){margin-bottom:1rem;}:global(.kb-qssqsu){margin-bottom:1rem;border-width:1px;}:global(.kb-9ez911){height:100%;width:100%;}:global(.kb-4sd29d){font-size:0.875rem;line-height:1.25rem;font-weight:600;}</style>