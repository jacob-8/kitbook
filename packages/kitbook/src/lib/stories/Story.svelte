<script lang="ts">
  import { getContext } from 'svelte';
  import View from '../view/View.svelte';
  import parseInput from './knobs';
  import Knobs from './Knobs.svelte';
  import { portal, IntersectionObserver } from 'svelte-pieces';

  /**
   * Until IDs are provided by the Kitbook plugin, each story in a story file must have a unique name to work
   */
  export let name = 'default';
  /**
   * Used by knobs to save state in URL, and to pass props to sandboxed stories; need a plugin to give these sequentially or need to pass in manually
   */
  export let id = name.replace(/[^A-Za-z0-9]/g, '_');
  export let width: number = undefined;
  export let height: number = undefined;
  export let persist: 'localStorage' | 'sessionStorage' = undefined;

  export let useSandbox = true;
  const propsFromSandbox = getContext<T>('sandboxProps');
  const idFromSandbox = getContext<string>('sandboxId');
  const isCurrentSandboxStory = id === idFromSandbox;

  export { input as knobs };
  type T = $$Generic;
  let input: T = undefined;
  $: knobs = input && parseInput<T>(input);

  function set(field: string, value: any) {
    $knobs[field] = value;
  }

  let hovered = false;
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
{#if isCurrentSandboxStory}
  <div class="show-in-sandbox" style="display: contents;">
    <slot props={propsFromSandbox} />
  </div>
{:else if !idFromSandbox}
  <IntersectionObserver let:intersecting>
    <div on:mouseover={() => (hovered = true)} on:mouseout={() => (hovered = false)}>
      {#if knobs}
        <div
          on:mouseover={() => (hovered = true)}
          on:mouseout={() => (hovered = false)}
          use:portal={'#instrument-panel'}
        >
          {#if intersecting}
            <div
              style="transition: all 300ms;"
              class="mb-4 p-1 rounded opacity-60 border border-transparent !border-opacity-50"
              class:border-blue-900={hovered}
              class:opacity-100={hovered}
            >
              <div class="text-sm font-semibold">{name}</div>
              <Knobs {persist} {id} {knobs} />
            </div>
          {/if}
        </div>
      {/if}
      <View
        title={name}
        {width}
        {height}
        {hovered}
        props={$knobs}
        queryParams="storyId={id}"
        useIframe={useSandbox}
      >
        {#if !useSandbox}
          <slot props={$knobs} {set} />
        {/if}
      </View>
    </div>
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
