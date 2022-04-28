<script >export let onclick = undefined, href = undefined, type = 'button', target = undefined, size = 'md', form = 'outline', color = 'primary', disabled = false, active = false;
$: disable = disabled || loading;
$: fill = form === 'outline' ? 'outlined' : form;
export let loading = false;
async function runWithSpinner(event) {
    if (onclick) {
        loading = true;
        try {
            await onclick(event);
        }
        catch (err) {
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

<style windi:inject>
a, button {
  border-radius: 0.25rem;
}
a:focus, button:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  -webkit-box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-offset-width: 2px;
}
a:hover, button:hover {
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
}
.primary:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(59, 130, 246, var(--tw-bg-opacity));
}
.primary {
  --tw-border-opacity: 1;
  border-color: rgba(59, 130, 246, var(--tw-border-opacity));
  --tw-text-opacity: 1;
  color: rgba(29, 78, 216, var(--tw-text-opacity));
}
.primary:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgba(59, 130, 246, var(--tw-ring-opacity));
}
.red:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(239, 68, 68, var(--tw-bg-opacity));
}
.red {
  --tw-border-opacity: 1;
  border-color: rgba(239, 68, 68, var(--tw-border-opacity));
  --tw-text-opacity: 1;
  color: rgba(185, 28, 28, var(--tw-text-opacity));
}
.red:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgba(239, 68, 68, var(--tw-ring-opacity));
}
.orange:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(249, 115, 22, var(--tw-bg-opacity));
}
.orange {
  --tw-border-opacity: 1;
  border-color: rgba(249, 115, 22, var(--tw-border-opacity));
  --tw-text-opacity: 1;
  color: rgba(194, 65, 12, var(--tw-text-opacity));
}
.orange:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgba(249, 115, 22, var(--tw-ring-opacity));
}
.green:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(16, 185, 129, var(--tw-bg-opacity));
}
.green {
  --tw-border-opacity: 1;
  border-color: rgba(16, 185, 129, var(--tw-border-opacity));
  --tw-text-opacity: 1;
  color: rgba(4, 120, 87, var(--tw-text-opacity));
}
.green:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgba(16, 185, 129, var(--tw-ring-opacity));
}
.black:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(17, 24, 39, var(--tw-bg-opacity));
}
.black {
  --tw-border-opacity: 1;
  border-color: rgba(107, 114, 128, var(--tw-border-opacity));
  --tw-text-opacity: 1;
  color: rgba(31, 41, 55, var(--tw-text-opacity));
}
.black:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgba(107, 114, 128, var(--tw-ring-opacity));
}
.white:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(107, 114, 128, var(--tw-bg-opacity));
  --tw-bg-opacity: 0.25;
}
.white:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgba(107, 114, 128, var(--tw-ring-opacity));
}
.white {
  --tw-text-opacity: 1;
  color: rgba(31, 41, 55, var(--tw-text-opacity));
}
.filled {
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
}
.filled.primary {
  --tw-bg-opacity: 1;
  background-color: rgba(37, 99, 235, var(--tw-bg-opacity));
}
.filled.primary:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(29, 78, 216, var(--tw-bg-opacity));
}
.filled.red {
  --tw-bg-opacity: 1;
  background-color: rgba(220, 38, 38, var(--tw-bg-opacity));
}
.filled.red:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(185, 28, 28, var(--tw-bg-opacity));
}
.filled.orange {
  --tw-bg-opacity: 1;
  background-color: rgba(234, 88, 12, var(--tw-bg-opacity));
}
.filled.orange:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(194, 65, 12, var(--tw-bg-opacity));
}
.filled.green {
  --tw-bg-opacity: 1;
  background-color: rgba(5, 150, 105, var(--tw-bg-opacity));
}
.filled.green:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(4, 120, 87, var(--tw-bg-opacity));
}
.filled.black {
  --tw-bg-opacity: 1;
  background-color: rgba(31, 41, 55, var(--tw-bg-opacity));
}
.filled.black:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(17, 24, 39, var(--tw-bg-opacity));
}
.filled.white {
  --tw-bg-opacity: 1;
  background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgba(0, 0, 0, var(--tw-text-opacity));
}
.filled.white:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
}
.filled.white:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgba(255, 255, 255, var(--tw-ring-opacity));
}
.filled, .outlined {
  border-width: 1px;
  --tw-shadow-color: 0, 0, 0;
  --tw-shadow: 0 1px 2px 0 rgba(var(--tw-shadow-color), 0.05);
  -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.menu:hover, .link:hover, .text:hover {
  background-color: transparent;
  --tw-text-opacity: 1;
  color: rgba(0, 0, 0, var(--tw-text-opacity));
}
.menu, .link, .text {
  border-style: none;
  --tw-shadow-color: 0, 0, 0;
  --tw-shadow: none;
  -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  --tw-text-opacity: 1;
  color: rgba(75, 85, 99, var(--tw-text-opacity));
}
.menu:focus, .link:focus, .text:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgba(107, 114, 128, var(--tw-ring-opacity));
}
.menu:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(229, 231, 235, var(--tw-bg-opacity));
}
.menu {
  border-radius: 0.5rem;
}
.link:hover {
  -webkit-text-decoration-line: underline;
  text-decoration-line: underline;
}
.text {
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 0.75rem;
}
.active {
  --tw-bg-opacity: 1;
  background-color: rgba(229, 231, 235, var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgba(31, 41, 55, var(--tw-text-opacity));
}
.sm {
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1rem;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.md {
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.lg {
  font-weight: 700;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
}
:disabled, .disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
svg {
  vertical-align: -2px;
}

.inline-block {
  display: inline-block;
}
.inline {
  display: inline;
}
.h-4 {
  height: 1rem;
}
.h-5 {
  height: 1.25rem;
}
.ml-1 {
  margin-left: 0.25rem;
}
.-mr-1 {
  margin-right: -0.25rem;
}
.opacity-25 {
  opacity: 0.25;
}
.opacity-75 {
  opacity: 0.75;
}
[fill~="none"] {
  fill: none;
}
.text-center {
  text-align: center;
}
.w-4 {
  width: 1rem;
}
.w-5 {
  width: 1.25rem;
}
@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.animate-spin {
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}
</style>
