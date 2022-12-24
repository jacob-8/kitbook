<script>import { dev } from "$app/environment";
export let error = null;
export let onError = null;
$:
  if ($error && onError)
    onError($error);
</script>

{#if $error}
  <div class="kb-1k0id6 error">
    {#if $$slots.before}
      <div class="kb-psobkl">
        <slot name="before" />
      </div>
    {/if}

    <div class="kb-r5kjww">
      <b>{$error.message}</b>
      <pre class="trace">
        {dev ? $error.stack : ''}
      </pre>
    </div>
  </div>

  <slot name="after" />
{:else}
  <slot />
{/if}

<style>:global(.kb-psobkl){margin-bottom:0.75rem;border-radius:0.25rem;--un-bg-opacity:1;background-color:rgba(229,231,235,var(--un-bg-opacity));padding:0.75rem;}:global(.kb-r5kjww){overflow-x:auto;}:global(.kb-1k0id6){padding:0.5rem;}
  .error {
    border: 1px solid red;
  }
  .trace {
    font-family: monospace;
  }
</style>
