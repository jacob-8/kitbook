<script lang="ts">
  import { QueryParam } from 'svelte-pieces'
  import type { Knobs } from './knobs'

  export let knobs: Knobs<any>
  export let id: string
  export let persist: 'localStorage' | 'sessionStorage' = undefined
</script>

{#each knobs.fields as { type, name, label, ...props } (name)}
  {@const fieldId = `${id}__${name}`}
  <QueryParam
    key={fieldId}
    startWith={$knobs[name]}
    {persist}
    initializeValue={value => ($knobs[name] = value)}
    let:value
    let:set
    on:value={({ detail }) => {
      if (detail === undefined || detail === null)
        return
      $knobs[name] = detail
    }}>
    <label class="block my-1" for={fieldId}>
      <span class="inline-block mr-2">{label || name}</span>
      {#if type === 'string' && /^#[a-fA-F0-9]{6}$/.test(props.default)}
        <input
          id={fieldId}
          type="color"
          value={$knobs[name]}
          {...props}
          on:input={e => set(e.currentTarget.value)} />
        <span class="text-xs text-gray-400">({value})</span>
      {:else if type === 'text' || type === 'string'}
        <input
          id={fieldId}
          value={$knobs[name]}
          {...props}
          on:input={e => set(e.currentTarget.value)} />
      {:else if type === 'range'}
        <input
          id={fieldId}
          type="range"
          value={$knobs[name]}
          {...props}
          on:input={e => set(e.currentTarget.value)} />
        <span class="text-xs text-gray-400">(min: {props.min}, max: {props.max}, default: {props.default}, current: {$knobs[
          name
        ]})</span>
      {:else if type === 'number'}
        <input
          id={fieldId}
          type="number"
          value={$knobs[name]}
          {...props}
          on:input={e => set(e.currentTarget.value)} />
      {:else if type === 'boolean'}
        <input
          id={fieldId}
          type="checkbox"
          checked={$knobs[name]}
          {...props}
          on:click={e => set(e.currentTarget.checked)} />
      {/if}
    </label>
  </QueryParam>
{/each}
