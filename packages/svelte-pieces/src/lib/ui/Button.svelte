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
      class="{$$props.class} {fill} {size} {color} text-center inline-block"
    >
      <slot />
      {#if form !== 'text' && form !== 'link'}
        <span class="i-tabler-external-link" style="vertical-align: -2px;" />
      {/if}
    </a>
  {:else}
    <a
      {href}
      data-sveltekit-prefetch
      class:active
      class="{$$props.class} {fill} {size} {color} text-center inline-block"
    >
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
    disabled={disable}
  >
    <slot />
    {#if loading}
      <span class="i-gg-spinner animate-spin ml-1 -mr-1" style="vertical-align: -2px;" />
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

  .filled,
  .outlined {
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
</style>
