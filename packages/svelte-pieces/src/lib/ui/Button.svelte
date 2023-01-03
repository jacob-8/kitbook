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
    active = false,
    showExternalLinkIcon = false,
    title: string = undefined;

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
  <a
    {href}
    {title}
    {target}
    rel={target === '_blank' ? 'noopener noreferrer' : ''}
    class:active
    class="{$$props.class} {fill} {size} {color} text-center inline-block"
  >
    <slot />
    {#if showExternalLinkIcon}
      <span class="i-tabler-external-link" style="vertical-align: -2px;" />
    {/if}
  </a>
{:else}
  <button
    class:active
    class:disabled={disable}
    class="{$$props.class} {fill} {size} {color} text-center inline-block"
    {type}
    {title}
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
    --at-apply: rounded hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2;
  }

  .primary {
    --at-apply: focus:ring-blue-500 text-blue-700 hover:bg-blue-500 border-blue-500;
  }
  .red {
    --at-apply: focus:ring-red-500 text-red-700 hover:bg-red-500 border-red-500;
  }
  .orange {
    --at-apply: focus:ring-orange-500 text-orange-700 hover:bg-orange-500 border-orange-500;
  }
  .green {
    --at-apply: focus:ring-green-500 text-green-700 hover:bg-green-500 border-green-500;
  }
  .black {
    --at-apply: focus:ring-gray-500 text-gray-800 hover:bg-gray-900 border-gray-500;
  }
  .white {
    --at-apply: focus:ring-gray-500 text-gray-800 hover:bg-gray-500 hover:bg-opacity-25;
  }

  .filled {
    --at-apply: text-white;
  }
  .filled.primary {
    --at-apply: bg-blue-600 hover:bg-blue-700;
  }
  .filled.red {
    --at-apply: bg-red-600 hover:bg-red-700;
  }
  .filled.orange {
    --at-apply: bg-orange-600 hover:bg-orange-700;
  }
  .filled.green {
    --at-apply: bg-green-600 hover:bg-green-700;
  }
  .filled.black {
    --at-apply: bg-gray-800 hover:bg-gray-900;
  }
  .filled.white {
    --at-apply: bg-gray-100 hover:bg-white text-black focus:ring-white;
  }

  .filled,
  .outlined {
    --at-apply: border shadow-sm;
  }

  .menu,
  .link,
  .text {
    --at-apply: border-none shadow-none hover:bg-transparent text-gray-600 hover:text-black focus:ring-gray-500;
  }

  .menu {
    --at-apply: rounded-lg hover:bg-gray-200;
  }
  .link {
    --at-apply: hover:underline;
  }
  .text {
    --at-apply: p-3 text-base font-normal;
  }
  .active {
    --at-apply: bg-gray-200 text-gray-800;
  }

  .sm {
    --at-apply: font-medium text-xs px-2.5 py-1.5;
  }
  .md {
    --at-apply: font-medium text-sm px-4 py-2;
  }
  .lg {
    --at-apply: font-bold px-5 py-2.5;
    /* text-base */
  }

  :disabled,
  .disabled {
    --at-apply: opacity-50 cursor-not-allowed;
  }
</style>
