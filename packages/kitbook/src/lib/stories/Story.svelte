<script lang="ts">
  import { getContext } from 'svelte';
  import { page } from '$app/stores';
  import LZString from 'lz-string';
  const { compressToEncodedURIComponent: encode } = LZString;

  export let name = 'default';
  /**
   * Used by knobs to save state in URL, and to pass props to sandboxed stories; need a plugin to give these sequentially or need to pass in manually
   */
  export let id = name.replace(/ /g, '_');
  export let width: number = undefined;
  export let height: number = undefined;
  export let persist: 'localStorage' | 'sessionStorage' = undefined;

  export let useSandbox = true;
  const propsFromSandbox = getContext<T>('sandboxProps');
  const idFromSandbox = getContext<string>('sandboxId');
  const targetedSandboxStory = id === idFromSandbox;

  // knobs
  import parseInput from './knobs';
  import Knobs from './Knobs.svelte';
  type T = $$Generic;
  let input: T = undefined;
  export { input as knobs };
  $: knobs = input && parseInput<T>(input);

  function set(field: string, value: any) {
    $knobs[field] = value;
  }
</script>

{#if targetedSandboxStory}
  <div class="show-in-sandbox">
    <slot props={propsFromSandbox} />
  </div>
{:else if !idFromSandbox}
  <div class="h-4" />
  <div class="{$$props.class} not-prose border-gray-200 border shadow overflow-hidden">
    <div class="bg-gray-200 p-2">
      <div class="font-semibold text-sm flex">
        {name}
        <div class="ml-auto" />

        <!-- {#if code}
          <button
            title="Code Preview"
            class:text-blue-600={showCode}
            class:opacity-90={showCode}
            class="p-1 opacity-50 hover:opacity-100"
            on:click={() => (showCode = !showCode)}><span class="i-tabler-code" /></button
          >
        {/if} -->
        <button
          title="toggle width"
          class="p-1 opacity-50 hover:opacity-100"
          on:click={() => (width ? (width = undefined) : (width = 300))}
          ><span class="i-ant-design-column-width-outlined" /></button
        >
        <button
          title="toggle height"
          class="p-1 opacity-50 hover:opacity-100"
          on:click={() => (height ? (height = undefined) : (height = 200))}
          ><span class="i-ant-design-column-height-outlined" /></button
        >
      </div>

      {#if width || height}
        <div class="text-sm mt-2">
          {#if width}
            <label>
              Width:
              <input type="number" bind:value={width} class="w-15" />
            </label>
          {/if}
          {#if height}
            <label>
              Height:
              <input type="number" bind:value={height} class="w-15" />
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
      <div class="p-2 hover:bg-gray-100 h-full">
        <div class="bg-white h-full">
          {#if useSandbox}
            <iframe
              class="w-full h-full"
              title=""
              src="/sandbox{$page.url.pathname}?props={encode(
                JSON.stringify($knobs)
              )}&storyId={id}"
            />
          {:else}
            <slot props={$knobs} {set} />
          {/if}
        </div>
      </div>
    </div>
  </div>

  <div class="h-4" />
{/if}

<!--
 @component
 Pass knobs properties (boolean, string, number, or range) to the `knobs` prop, then access values from `let:props`. Typescript provides autocompletion for the props on the way out. I prefer to use the shortcut notation as documented in the [Svench docs](https://svench-docs.vercel.app/_/Usage/knobs#knobs-passed-as-plain-objects-shortcut-notation) with the type of the knob being inferred from it.

Range knobs can be declared using a default value matching the format ${minValue}${maxValue};${initialValue} (e.g., -10-10;5).

Example usage: `<Story knobs={{ myBool: false, myNum: 10, myStr: 'hello', myRange: '-10-10;5' }} let:props={{myBool, myNum, myStr, myRange}}>`

TODO: accept negative values for range initialValue

TODO: Though full object notation works as seen in the Svench docs, the type interface will be incorrect. If someone has a compelling use case for full object notation, they can help me know how to improve the use of Generics and types through the `knobs.ts` file to achieve such.
-->
