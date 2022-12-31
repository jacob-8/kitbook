<script>import { getContext } from "svelte";
import View from "../view/View.svelte";
import parseInput from "./knobs";
import Knobs from "./Knobs.svelte";
import { portal, IntersectionObserver } from "svelte-pieces";
export let name = "default";
export let id = name.replace(/[^A-Za-z0-9]/g, "_");
export let width = void 0;
export let height = void 0;
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
  <IntersectionObserver let:intersecting>
    {#if knobs}
      <div class="kb-qssqsu" use:portal={'#instrument-panel'}>
        {#if intersecting}
          <div class="kb-4sd29d">{name}</div>
          <Knobs {persist} {id} {knobs} />
        {/if}
      </div>
    {/if}
    <View
      title={name}
      {width}
      {height}
      props={$knobs}
      queryParams="storyId={id}"
      useIframe={useSandbox}
    >
      {#if !useSandbox}
        <slot props={$knobs} {set} />
      {/if}
    </View>
  </IntersectionObserver>
{/if}

<!--
 @component
 Pass knobs properties (boolean, string, number, or range) to the `knobs` prop, then access values from `let:props`. Typescript provides autocompletion for the props on the way out. I prefer to use the shortcut notation as documented in the [Svench docs](https://svench-docs.vercel.app/_/Usage/knobs#knobs-passed-as-plain-objects-shortcut-notation) with the type of the knob being inferred from it.

Range knobs can be declared using a default value matching the format ${minValue}${maxValue};${initialValue} (e.g., -10-10;5).

Example usage: `<Story knobs={{ myBool: false, myNum: 10, myStr: 'hello', myRange: '-10-10;5' }} let:props={{myBool, myNum, myStr, myRange}}>`

TODO: accept negative values for range initialValue

TODO: Though full object notation works as seen in the Svench docs, the type interface will be incorrect. If someone has a compelling use case for full object notation, they can help me know how to improve the use of Generics and types through the `knobs.ts` file to achieve such.
-->

<style>:global(.kb-qssqsu){margin-bottom:1rem;border-width:1px;}:global(.kb-4sd29d){font-size:0.875rem;line-height:1.25rem;font-weight:600;}</style>