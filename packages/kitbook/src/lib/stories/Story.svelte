<script lang="ts">
  export let name = 'default'; // must be unique for queryParams interaction with knobs to not share state
  export let width: number = undefined;
  export let height: number = undefined;
  export let restoreState = true;

  // knobs
  import parseInput from './knobs';
  import Knobs from './Knobs.svelte';
  type T = $$Generic;
  let input: T = undefined;
  export { input as knobs };
  $: knobs = input && parseInput<T>(input);
</script>

<div class="not-prose border-gray-200 border shadow my-4">
  <div class="bg-gray-200 p-2">
    <div class="font-semibold text-sm">{name}</div>
    {#if knobs}
      <Knobs {restoreState} id={name.replace(' ', '_')} {knobs} />
    {/if}
  </div>

  <div style="height: {height ? `${height}px` : 'unset'}; width: {width ? `${width}px` : 'unset'}">
    <div class="p-2 hover:bg-gray-100 h-full">
      <div class="bg-white">
        <slot props={$knobs} />
      </div>
    </div>
  </div>
</div>

<!--
 @component
 Pass knobs properties (boolean, string, number, or range) to the `knobs` prop, then access values from `let:props`. Typescript provides autocompletion for the props on the way out. I prefer to use the shortcut notation as documented in the [Svench docs](https://svench-docs.vercel.app/_/Usage/knobs#knobs-passed-as-plain-objects-shortcut-notation) with the type of the knob being inferred from it.

Range knobs can be declared using a default value matching the format ${minValue}${maxValue};${initialValue} (e.g., -10-10;5).

Example usage: `<Story knobs={{ myBool: false, myNum: 10, myStr: 'hello', myRange: '-10-10;5' }} let:props={{myBool, myNum, myStr, myRange}}>`

TODO: Though full object notation works as seen in the Svench docs, the type interface will be incorrect. If someone has a compelling use case for full object notation, they can help me know how to improve the use of Generics and types through the `knobs.ts` file to achieve such.
-->
