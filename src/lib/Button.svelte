<script>
  export let onclick: () => any = undefined,
    href = undefined,
    type: 'button' | 'submit' = 'button',
    target: '_blank' | '' = '',
    size: 'sm' | 'md' | 'lg' = 'md',
    form: 'primary' | 'outline' | 'simple' = 'outline',
    color: 'red' | 'orange' | 'green' | 'black' | 'white' = undefined,
    disabled = false;

  $: disable = disabled || loading;

  export let loading = false;
  async function runWithSpinner() {
    if (onclick) {
      loading = true;
      try {
        await onclick();
      } catch (err) {
        console.error(err);
        alert(err);
      }
      loading = false;
    }
  }
</script>

{#if href}
  <a
    {href}
    {target}
    sveltekit:prefetch
    class="{$$props.class} {form} {size} {color} text-center inline-block">
    <slot />
    {#if target === '_blank'}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 inline"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path
          d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
        <path
          d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
      </svg>
    {/if}
  </a>
{:else}
  <button
    class:disabled={disable}
    class="{$$props.class} {form} {size} {color} text-center inline-block"
    {type}
    on:click={runWithSpinner}
    disabled={disable}>
    <slot />
    {#if loading}
      <svg
        class="animate-spin ml-1 -mr-1 h-5 w-5 inline"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    {/if}
  </button>
{/if}

<style>
  svg {
    vertical-align: -2px;
  }
  a,
  button {
    @apply items-center px-4 py-2 border border-transparent text-sm font-medium rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:text-white uppercase;
    @apply focus:ring-primary-500 text-primary-700 hover:bg-primary-500 border-primary-500;
  }
  .red {
    @apply focus:ring-red-500 text-red-700 hover:bg-red-500 border-red-500;
  }
  .orange {
    @apply focus:ring-orange-500 text-orange-700 hover:bg-orange-500 border-orange-500;
  }
  .green {
    @apply focus:ring-green-500 text-green-700 hover:bg-green-500 border-green-500;
  }
  .black {
    @apply focus:ring-gray-500 text-gray-800 hover:bg-gray-900 border-gray-500;
  }
  .primary {
    @apply text-white bg-primary-600 hover:bg-primary-700 border-none;
  }
  .primary.red {
    @apply bg-red-600 hover:bg-red-700;
  }
  .primary.orange {
    @apply bg-orange-600 hover:bg-orange-700;
  }
  .primary.green {
    @apply bg-green-600 hover:bg-green-700;
  }
  .primary.black {
    @apply bg-gray-800 hover:bg-gray-900;
  }
  .primary.white {
    @apply bg-gray-100 hover:bg-white text-black focus:ring-white;
  }
  .simple {
    @apply border-none shadow-none;
  }
  .sm {
    @apply text-xs px-2.5 py-1.5;
  }
  .lg {
    @apply font-bold px-5 py-2.5;
    /* text-base */
  }
  :disabled,
  .disabled {
    @apply opacity-50 cursor-not-allowed;
  }
</style>
