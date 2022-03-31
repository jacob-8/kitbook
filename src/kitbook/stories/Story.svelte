<script lang="ts">
  export let name = 'default'; // must be unique for queryParams interaction with knobs to not share state
  export let width: number = undefined;
  export let height: number = undefined;
  export let restoreState = true;

  // knobs
  import parseInput from './knobs';
  import Knobs from './Knobs.svelte';
  type T = $$Generic;
  export let input: T = undefined;
  $: knobs = input && parseInput<T>(input);
</script>

<!-- <button on:click={() => ($route.query.sort = 'name')}>sort by name</button>
<button on:click={() => ($route.fragment.modal = true)}>open modal window</button>
<textarea placeholder="fragment.search" bind:value={$route.fragment.search} /> -->

{#if name !== 'default'}
  <h3>{name}</h3>
{/if}

<div class="not-prose border-gray-300 border">
  <!-- Move into floatable window -->
  {#if knobs}
    <Knobs {restoreState} id={name.replace(' ', '_')} {knobs} />
  {/if}

  <div style="height: {height ? `${height}px` : 'unset'}; width: {width ? `${width}px` : 'unset'}">
    <slot output={$knobs} />
  </div>
</div>

<!--
 @component
 Pass knobs properties (boolean, string, number, or range) to the `input` prop access values from `let:output`. Typescript provides autocompletion for the proper properties on the way out. I prefer to use the shortcut notation as documented in the [Svench docs](https://svench-docs.vercel.app/_/Usage/knobs#knobs-passed-as-plain-objects-shortcut-notation) with the type of the knob being inferred from it.

Range knobs can be declared using a default value matching the format ${minValue}${maxValue};${initialValue} (e.g., -10-10;5).

Example usage: `<Story input={{ myBool: false, myNum: 10, myStr: 'hello', myRange: '-10-10;5' }} let:output={{myBool, myNum, myStr, myRange}}>`

TODO: Though full object notation works as seen in the Svench docs, the type interface will be incorrect. If someone has a compelling use case for full object notation, they can help me know how to improve the use of Generics and types through the `knobs.ts` file to achieve such.
-->
