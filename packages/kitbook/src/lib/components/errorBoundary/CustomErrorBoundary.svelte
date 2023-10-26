<script lang="ts">
  import { dev } from '$app/environment'

  export let error = null
  export let onError = null

  $: if ($error && onError)
    onError($error)
</script>

{#if $error}
  <div class="error p-2">
    {#if $$slots.before}
      <div class="mb-3 p-3 bg-gray-200 rounded">
        <slot name="before" />
      </div>
    {/if}

    <div class="overflow-x-auto">
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

<style>
  .error {
    border: 1px solid red;
  }
  .trace {
    font-family: monospace;
  }
</style>
