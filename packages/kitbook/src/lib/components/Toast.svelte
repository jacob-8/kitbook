<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import { backOut } from 'svelte/easing'
  import { onMount } from 'svelte'

  export let duration_ms: number | 'hold' = 5000
  export let message: string = undefined
  export let type: 'notice' | 'error' = 'notice'
  export let dismissable = false
  export let on_click: () => void = undefined
  export let on_hide: () => void

  onMount(() => {
    if (duration_ms === 'hold')
      return
    setTimeout(() => {
      on_hide()
    }, duration_ms)
  })
</script>

<div class="fixed z-50 inset-x-0 bottom-0 flex flex-col items-center p-2">
  <div
    class:text-red-300={type === 'error'}
    class:cursor-pointer={on_click}
    on:click={() => on_click?.()}
    class="bg-black bg-opacity-75 text-white px-3 py-2 bottom-3 rounded max-w-sm flex items-center"
    in:fly={{ delay: 0, duration: 300, x: 0, y: 50, opacity: 0.1, easing: backOut }}
    out:fade={{ duration: 500 }}>
    {#if dismissable && on_click}
      <button
        class="w-6 h-6 shrink-0 rounded-full hover:bg-gray/25 opacity-75 hover:opacity-100 flex items-center justify-center mr-2 -ml-1"
        type="button"
        on:click|stopPropagation={on_hide}><span class="i-fa-solid-times" /></button>
    {/if}

    {#if message}
      {message}
    {/if}
    <slot />

    {#if dismissable && !on_click}
      <button
        class="w-6 h-6 shrink-0 rounded-full hover:bg-gray/25 opacity-75 hover:opacity-100 flex items-center justify-center ml-2 -mr-1"
        type="button"
        on:click={on_hide}><span class="i-fa-solid-times" /></button>
    {/if}

    {#if on_click}
      <span class="i-ph-arrow-right-bold ml-2 -mb-.5" />
    {/if}
  </div>
</div>
