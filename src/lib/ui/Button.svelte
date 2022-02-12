<script lang="ts">
  export let onclick: (
      e: MouseEvent & {
        currentTarget: EventTarget & HTMLButtonElement;
      }
    ) => any = undefined,
    href = undefined,
    type: 'button' | 'submit' = 'button',
    target: '_blank' = undefined,
    size: 'sm' | 'md' | 'lg' = 'md',
    form: 'outline' | 'filled' | 'simple' | 'link' | 'menu' | 'text' = 'outline',
    color: 'red' | 'orange' | 'green' | 'black' | 'white' | 'primary' = 'primary',
    disabled = false,
    active = false;

  $: disable = disabled || loading;
  $: fill = form === 'outline' ? 'outlined' : form;

  export let loading = false;
  async function runWithSpinner(event) {
    if (onclick) {
      loading = true;
      try {
        await onclick(event);
      } catch (err) {
        console.error(err);
        alert(err);
      }
      loading = false;
    }
  }
</script>

{#if href}
  {#if target === '_blank'}
    <a
      {href}
      target="_blank"
      rel="noopener"
      class="{$$props.class} {fill} {size} {color} text-center inline-block">
      <slot />
      {#if form !== 'text' && form !== 'link'}
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
    <a
      {href}
      sveltekit:prefetch
      class:active
      class="{$$props.class} {fill} {size} {color} text-center inline-block">
      <slot />
    </a>
  {/if}
{:else}
  <button
    class:active
    class:disabled={disable}
    class="{$$props.class} {fill} {size} {color} text-center inline-block"
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
  a,
  button {
    @apply rounded hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2;
  }

  .primary {
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
  .white {
    @apply focus:ring-gray-500 text-gray-800 hover:bg-gray-500 hover:bg-opacity-25;
  }

  .filled {
    @apply text-white;
  }
  .filled.primary {
    @apply bg-primary-600 hover:bg-primary-700;
  }
  .filled.red {
    @apply bg-red-600 hover:bg-red-700;
  }
  .filled.orange {
    @apply bg-orange-600 hover:bg-orange-700;
  }
  .filled.green {
    @apply bg-green-600 hover:bg-green-700;
  }
  .filled.black {
    @apply bg-gray-800 hover:bg-gray-900;
  }
  .filled.white {
    @apply bg-gray-100 hover:bg-white text-black focus:ring-white;
  }

  .filled, .outlined {
    @apply border shadow-sm;
  }

  .menu,
  .link,
  .text {
    @apply border-none shadow-none hover:bg-transparent text-gray-600 hover:text-black focus:ring-gray-500;
  }

  .menu {
    @apply rounded-lg hover:bg-gray-200;
  }
  .link {
    @apply hover:underline;
  }
  .text {
    @apply p-3 text-base font-normal;
  }
  .active {
    @apply bg-gray-200 text-gray-800;
  }

  .sm {
    @apply font-medium text-xs px-2.5 py-1.5;
  }
  .md {
    @apply font-medium text-sm px-4 py-2;
  }
  .lg {
    @apply font-bold px-5 py-2.5;
    /* text-base */
  }

  :disabled,
  .disabled {
    @apply opacity-50 cursor-not-allowed;
  }
  svg {
    vertical-align: -2px;
  }
</style>
