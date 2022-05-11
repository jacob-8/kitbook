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

{#each knobs.fields as { type, name, label, ...props } (name)}
  <label class="block my-1" for="">
    <span class="inline-block mr-2">{label || name}</span>
    {#if type === 'text' || type === 'string'}
      <input
        bind:value={$knobs[name]}
        {...props}
        on:input={(e) => ($route.query[`${id}__${name}`] = e.currentTarget.value)}
      />
    {:else if type === 'range'}
      <input
        type="range"
        bind:value={$knobs[name]}
        {...props}
        on:input={(e) => ($route.query[`${id}__${name}`] = e.currentTarget.value)}
      />
    {:else if type === 'number'}
      <input
        type="number"
        bind:value={$knobs[name]}
        {...props}
        on:input={(e) => ($route.query[`${id}__${name}`] = e.currentTarget.value)}
      />
    {:else if type === 'boolean'}
      <input
        type="checkbox"
        bind:checked={$knobs[name]}
        {...props}
        on:input={(e) => ($route.query[`${id}__${name}`] = e.currentTarget.value)}
      />
    {/if}
  </label>
{/each}
