<script >export let onclick = undefined, onx = undefined, href = undefined, target = '', size = 'sm', color = undefined, active = false;
</script>

{#if href}
  <a {href} {target} sveltekit:prefetch class:active class="{$$props.class} {size} {color}">
    <slot />
    {#if onx}
      <span class="w-2" />
      <button type="button" on:click|preventDefault={onx} class="badge-x">
        <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
          <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
        </svg>
      </button>
    {:else if target === '_blank'}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 ml-1 inline"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path
          d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
        <path
          d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
      </svg>
    {/if}
  </a>
{:else if onclick}
  <button on:click={onclick} class:active class="{$$props.class} {size} {color}">
    <slot />
    {#if onx}
      <span class="w-2" />
      <button type="button" on:click|stopPropagation={onx} class="badge-x">
        <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
          <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
        </svg>
      </button>
    {/if}
  </button>
{:else}
  <div class:active class="{$$props.class} {size} {color}">
    <slot />
    {#if onx}
      <span class="w-2" />
      <button type="button" on:click={onx} class="badge-x">
        <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
          <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
        </svg>
      </button>
    {/if}
  </div>
{/if}

<style windi:inject>
a, button:not(.badge-x), div {
  border-radius: 0.375rem;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: -webkit-inline-flex;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  --tw-bg-opacity: 1;
  background-color: rgba(219, 234, 254, var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgba(30, 64, 175, var(--tw-text-opacity));
}
.red {
  --tw-bg-opacity: 1;
  background-color: rgba(254, 226, 226, var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgba(153, 27, 27, var(--tw-text-opacity));
}
.orange {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 237, 213, var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgba(154, 52, 18, var(--tw-text-opacity));
}
.green {
  --tw-bg-opacity: 1;
  background-color: rgba(209, 250, 229, var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgba(6, 95, 70, var(--tw-text-opacity));
}
.gray {
  --tw-bg-opacity: 1;
  background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgba(31, 41, 55, var(--tw-text-opacity));
}
.badge-x:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(191, 219, 254, var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgba(59, 130, 246, var(--tw-text-opacity));
}
.badge-x:focus {
  --tw-bg-opacity: 1;
  background-color: rgba(59, 130, 246, var(--tw-bg-opacity));
  outline: 2px solid transparent;
  outline-offset: 2px;
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
}
.badge-x {
  --tw-text-opacity: 1;
  color: rgba(96, 165, 250, var(--tw-text-opacity));
  border-radius: 9999px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: -webkit-inline-flex;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -ms-flex-negative: 0;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  height: 1rem;
  margin-left: -0.25rem;
  margin-right: -0.25rem;
  width: 1rem;
}
.red .badge-x:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(254, 202, 202, var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgba(239, 68, 68, var(--tw-text-opacity));
}
.red .badge-x:focus {
  --tw-bg-opacity: 1;
  background-color: rgba(239, 68, 68, var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
}
.red .badge-x {
  --tw-text-opacity: 1;
  color: rgba(248, 113, 113, var(--tw-text-opacity));
}
.orange .badge-x:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(254, 215, 170, var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgba(249, 115, 22, var(--tw-text-opacity));
}
.orange .badge-x:focus {
  --tw-bg-opacity: 1;
  background-color: rgba(249, 115, 22, var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
}
.orange .badge-x {
  --tw-text-opacity: 1;
  color: rgba(251, 146, 60, var(--tw-text-opacity));
}
.green .badge-x:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(167, 243, 208, var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgba(16, 185, 129, var(--tw-text-opacity));
}
.green .badge-x:focus {
  --tw-bg-opacity: 1;
  background-color: rgba(16, 185, 129, var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
}
.green .badge-x {
  --tw-text-opacity: 1;
  color: rgba(52, 211, 153, var(--tw-text-opacity));
}
.gray .badge-x:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(229, 231, 235, var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgba(107, 114, 128, var(--tw-text-opacity));
}
.gray .badge-x:focus {
  --tw-bg-opacity: 1;
  background-color: rgba(107, 114, 128, var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
}
.gray .badge-x {
  --tw-text-opacity: 1;
  color: rgba(156, 163, 175, var(--tw-text-opacity));
}

.inline {
  display: inline;
}
.h-2 {
  height: 0.5rem;
}
.h-4 {
  height: 1rem;
}
.ml-1 {
  margin-left: 0.25rem;
}
[fill~="none"] {
  fill: none;
}
.w-2 {
  width: 0.5rem;
}
.w-4 {
  width: 1rem;
}
</style>
