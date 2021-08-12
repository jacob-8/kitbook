<script>var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export let onclick = undefined, href = undefined, type = 'button', target = '', size = 'md', form = 'outline', color = undefined, disabled = false;
$: disable = disabled || loading;
export let loading = false;
function runWithSpinner() {
    return __awaiter(this, void 0, void 0, function* () {
        if (onclick) {
            loading = true;
            try {
                yield onclick();
            }
            catch (err) {
                console.error(err);
                alert(err);
            }
            loading = false;
        }
    });
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
  a, button {
    align-items: center;
    border-radius: 0.25rem;
    border-width: 1px;
    border-color: transparent;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    text-transform: uppercase;
    --tw-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
  a:hover, button:hover {
    --tw-text-opacity: 1;
    color: rgba(255, 255, 255, var(--tw-text-opacity));
}
  a:focus, button:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
    --tw-ring-offset-width: 2px;
}
  a, button {
    --tw-border-opacity: 1;
    border-color: rgba(59, 130, 246, var(--tw-border-opacity));
    --tw-text-opacity: 1;
    color: rgba(29, 78, 216, var(--tw-text-opacity));
}
  a:hover, button:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(59, 130, 246, var(--tw-bg-opacity));
}
  a:focus, button:focus {
    --tw-ring-opacity: 1;
    --tw-ring-color: rgba(59, 130, 246, var(--tw-ring-opacity));
}
  .red {
    --tw-border-opacity: 1;
    border-color: rgba(239, 68, 68, var(--tw-border-opacity));
    --tw-text-opacity: 1;
    color: rgba(185, 28, 28, var(--tw-text-opacity));
}
  .red:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(239, 68, 68, var(--tw-bg-opacity));
}
  .red:focus {
    --tw-ring-opacity: 1;
    --tw-ring-color: rgba(239, 68, 68, var(--tw-ring-opacity));
}
  .orange {
    --tw-border-opacity: 1;
    border-color: rgba(249, 115, 22, var(--tw-border-opacity));
    --tw-text-opacity: 1;
    color: rgba(194, 65, 12, var(--tw-text-opacity));
}
  .orange:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(249, 115, 22, var(--tw-bg-opacity));
}
  .orange:focus {
    --tw-ring-opacity: 1;
    --tw-ring-color: rgba(249, 115, 22, var(--tw-ring-opacity));
}
  .green {
    --tw-border-opacity: 1;
    border-color: rgba(16, 185, 129, var(--tw-border-opacity));
    --tw-text-opacity: 1;
    color: rgba(4, 120, 87, var(--tw-text-opacity));
}
  .green:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(16, 185, 129, var(--tw-bg-opacity));
}
  .green:focus {
    --tw-ring-opacity: 1;
    --tw-ring-color: rgba(16, 185, 129, var(--tw-ring-opacity));
}
  .black {
    --tw-border-opacity: 1;
    border-color: rgba(107, 114, 128, var(--tw-border-opacity));
    --tw-text-opacity: 1;
    color: rgba(31, 41, 55, var(--tw-text-opacity));
}
  .black:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(17, 24, 39, var(--tw-bg-opacity));
}
  .black:focus {
    --tw-ring-opacity: 1;
    --tw-ring-color: rgba(107, 114, 128, var(--tw-ring-opacity));
}
  .primary {
    border-style: none;
    --tw-bg-opacity: 1;
    background-color: rgba(37, 99, 235, var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: rgba(255, 255, 255, var(--tw-text-opacity));
}
  .primary:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(29, 78, 216, var(--tw-bg-opacity));
}
  .primary.red {
    --tw-bg-opacity: 1;
    background-color: rgba(220, 38, 38, var(--tw-bg-opacity));
}
  .primary.red:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(185, 28, 28, var(--tw-bg-opacity));
}
  .primary.orange {
    --tw-bg-opacity: 1;
    background-color: rgba(234, 88, 12, var(--tw-bg-opacity));
}
  .primary.orange:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(194, 65, 12, var(--tw-bg-opacity));
}
  .primary.green {
    --tw-bg-opacity: 1;
    background-color: rgba(5, 150, 105, var(--tw-bg-opacity));
}
  .primary.green:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(4, 120, 87, var(--tw-bg-opacity));
}
  .primary.black {
    --tw-bg-opacity: 1;
    background-color: rgba(31, 41, 55, var(--tw-bg-opacity));
}
  .primary.black:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(17, 24, 39, var(--tw-bg-opacity));
}
  .primary.white {
    --tw-bg-opacity: 1;
    background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: rgba(0, 0, 0, var(--tw-text-opacity));
}
  .primary.white:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
}
  .primary.white:focus {
    --tw-ring-opacity: 1;
    --tw-ring-color: rgba(255, 255, 255, var(--tw-ring-opacity));
}
  .simple {
    border-style: none;
    --tw-shadow: 0 0 #0000;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
  .sm {
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    font-size: 0.75rem;
    line-height: 1rem;
}
  .lg {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
    font-weight: 700;
    /* text-base */
}
  :disabled, .disabled {
    cursor: not-allowed;
    opacity: 0.5;
}</style>
