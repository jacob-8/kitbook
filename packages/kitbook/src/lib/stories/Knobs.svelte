<script lang="ts">
  import { onMount } from 'svelte';
  import type { Knobs } from './knobs';
  import { route } from './route';

  export let knobs: Knobs<any>;
  export let id: string;
  export let restoreState = true;

  onMount(() => {
    if (restoreState) {
      Object.keys($route.query).forEach((key) => {
        const match = key.match(/(.+?)__(.+)/);
        if (match && match[1] === id) {
          $knobs[match[2]] = $route.query[key];
        }
      });
    }
  });
</script>

<div class="bg-gray-200 p-2 border-b border-gray-300">
  {#each knobs.fields as { type, name, label, ...props } (name)}
    <label class="block my-1 mx-2" for="">
      <span class="inline-block mr-2 font-semibold">{label || name}</span>
      {#if type === 'text' || type === 'string'}
        <input
          bind:value={$knobs[name]}
          {...props}
          on:input={(e) => ($route.query[`${id}__${name}`] = e.currentTarget.value)} />
      {:else if type === 'range'}
        <input
          type="range"
          bind:value={$knobs[name]}
          {...props}
          on:input={(e) => ($route.query[`${id}__${name}`] = e.currentTarget.value)} />
      {:else if type === 'number'}
        <input
          type="number"
          bind:value={$knobs[name]}
          {...props}
          on:input={(e) => ($route.query[`${id}__${name}`] = e.currentTarget.value)} />
      {:else if type === 'boolean'}
        <input
          type="checkbox"
          bind:checked={$knobs[name]}
          {...props}
          on:input={(e) => ($route.query[`${id}__${name}`] = e.currentTarget.value)} />
      {/if}
    </label>
  {/each}
</div>

<!-- 
<Story
  input={{ myBool: false, myNum: 10, myStr: 'hello', myRange: '-10-10;5' }}
  let:output={{ myBool, myNum, myStr, myRange }} />

<Story
  input={{
    firstProp: { type: 'text', default: 'hello world' },
    secondProp: { type: 'number', default: 123 },
  }}
  let:output={{ firstProp, secondProp }} /> 
-->
