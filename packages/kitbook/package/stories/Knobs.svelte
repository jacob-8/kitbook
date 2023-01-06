<script>import { QueryParam } from "svelte-pieces";
export let knobs;
export let id;
export let persist = void 0;
</script>

{#each knobs.fields as { type, name, label, ...props } (name)}
  {@const fieldId = `${id}__${name}`}
  <QueryParam
    key={fieldId}
    startWith={$knobs[name]}
    {persist}
    initializeValue={(value) => ($knobs[name] = value)}
    let:value
    let:set
    on:value={({ detail }) => {
      if (detail === undefined || detail === null) return;
      $knobs[name] = detail;
    }}
  >
    <label class="kb-x05kkv" for={fieldId}>
      <span class="kb-6th8i1">{label || name}</span>
      {#if type === 'string' && /^#[a-fA-F0-9]{6}$/.test(props.default)}
        <input
          id={fieldId}
          type="color"
          value={$knobs[name]}
          {...props}
          on:input={(e) => set(e.currentTarget.value)}
        />
        <span class="kb-2dt1dt">({value})</span>
      {:else if type === 'text' || type === 'string'}
        <input
          id={fieldId}
          value={$knobs[name]}
          {...props}
          on:input={(e) => set(e.currentTarget.value)}
        />
      {:else if type === 'range'}
        <input
          id={fieldId}
          type="range"
          value={$knobs[name]}
          {...props}
          on:input={(e) => set(e.currentTarget.value)}
        />
        <span class="kb-2dt1dt"
          >(min: {props.min}, max: {props.max}, default: {props.default}, current: {$knobs[
            name
          ]})</span
        >
      {:else if type === 'number'}
        <input
          id={fieldId}
          type="number"
          value={$knobs[name]}
          {...props}
          on:input={(e) => set(e.currentTarget.value)}
        />
      {:else if type === 'boolean'}
        <input
          id={fieldId}
          type="checkbox"
          checked={$knobs[name]}
          {...props}
          on:click={(e) => set(e.currentTarget.checked)}
        />
      {/if}
    </label>
  </QueryParam>
{/each}

<style>:global(.kb-x05kkv){margin-top:0.25rem;margin-bottom:0.25rem;display:block;}:global(.kb-6th8i1){margin-right:0.5rem;display:inline-block;}:global(.kb-2dt1dt){font-size:0.75rem;line-height:1rem;--un-text-opacity:1;color:rgba(156,163,175,var(--un-text-opacity));}</style>