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
  {@const fieldId = name + id}
  <label class="block my-1" for={fieldId}>
    <span class="inline-block mr-2">{label || name}</span>
    {#if type === 'string' && /^#[a-fA-F0-9]{6}$/.test(props.default)}
      <input
        id={fieldId}
        type="color"
        bind:value={$knobs[name]}
        {...props}
        on:input={(e) => ($route.query[`${id}__${name}`] = e.currentTarget.value)}
       />
       <span class="text-xs text-gray-400"
        >({$knobs[
          name
        ]})</span
      >
    {:else if type === 'text' || type === 'string'}
      <input
        id={fieldId}
        bind:value={$knobs[name]}
        {...props}
        on:input={(e) => ($route.query[`${id}__${name}`] = e.currentTarget.value)}
      />
    {:else if type === 'range'}
      <input
        id={fieldId}
        type="range"
        bind:value={$knobs[name]}
        {...props}
        on:input={(e) => ($route.query[`${id}__${name}`] = e.currentTarget.value)}
      />
      <span class="text-xs text-gray-400"
        >(min: {props.min}, max: {props.max}, default: {props.default}, current: {$knobs[
          name
        ]})</span
      >
    {:else if type === 'number'}
      <input
        id={fieldId}
        type="number"
        bind:value={$knobs[name]}
        {...props}
        on:input={(e) => ($route.query[`${id}__${name}`] = e.currentTarget.value)}
      />
    {:else if type === 'boolean'}
      <input
        id={fieldId}
        type="checkbox"
        bind:checked={$knobs[name]}
        {...props}
        on:input={(e) => ($route.query[`${id}__${name}`] = e.currentTarget.value)}
      />
    {/if}
  </label>
{/each}
