<script lang="ts">
  import { getContext } from 'svelte';
  import { page } from '$app/stores';
  import LZString from 'lz-string';
  const { compressToEncodedURIComponent: encode } = LZString;
  import FrameBody from '../frame/FrameBody.svelte';
  import FrameHeader from '../frame/FrameHeader.svelte';
  import parseInput from './knobs';
  import Knobs from './Knobs.svelte';

  const DEFAULT_PIXEL_HEIGHT = 220;

  /**
   * Until IDs are provided by the Kitbook plugin, each story in a story file must have a unique name to work
   */
  export let name = 'default';
  /**
   * Used by knobs to save state in URL, and to pass props to sandboxed stories; need a plugin to give these sequentially or need to pass in manually
   */
  export let id = name.replace(/[^A-Za-z0-9]/g, '_');
  export let width: number = undefined;
  export let height: number = DEFAULT_PIXEL_HEIGHT;
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
</script>

{#if isCurrentSandboxStory}
  <div class="show-in-sandbox">
    <slot props={propsFromSandbox} />
  </div>
{:else if !idFromSandbox}
  <div class="not-prose mb-4">
    {#if knobs}
      <Knobs {persist} {id} {knobs} />
    {/if}

    <FrameHeader title={name} {height} {width} let:adjustedHeight let:adjustedWidth>
      <FrameBody height={adjustedHeight} width={adjustedWidth}>
        {#if useSandbox}
          <iframe
            class="w-full h-full"
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
<style>
  .checkerboard {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA4SURBVHgB7dOxDQBACAJA/b1Y54dyHRZzBQoLY6Am1xCS5A8hAErpvRiOQYMbwFSL6qM8isGTYAOhNQbW5Q4iGwAAAABJRU5ErkJggg==');
  }
</style>
