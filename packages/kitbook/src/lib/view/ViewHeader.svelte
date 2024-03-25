<script lang="ts">
  import { ShowHide } from 'svelte-pieces'

  export let src: string
  export let hovered = false
  export let width: number
  export let height: number
  export let languageCode: string
  export let blockScripts = false
  export let refresh: () => void
  export let resetDimensions: () => void
  export let csr: false
  export let ssr: false
  export let hasCode = false

  let userBlockedScripts: boolean
  $: scriptBlockingResult = userBlockedScripts ?? blockScripts
</script>

<ShowHide let:show={showCode} let:toggle>
  <div class="flex items-center justify-end" class:bg-white={hovered}>
    {#if languageCode}
      <span class:!opacity-50={hovered} class="text-sm-p-1 opacity-50">
        {languageCode}
      </span>
    {/if}

    {#if hasCode}
      <button
        type="button"
        title="Show Code"
        class:opacity-50={hovered}
        class="text-sm p-1 -mt-3px opacity-50 hover:opacity-100"
        on:click={toggle}><span class="i-fa-solid-code" /> Code
      </button>
    {/if}

    {#if ssr === false}
      <span class="text-sm p-1 opacity-50">CSR-only</span>
    {:else if csr === false}
      <span class="text-sm p-1 opacity-50">SSR-only</span>
    {:else}
      <button
        type="button"
        title="Toggle SSR/CSR"
        class:opacity-50={hovered}
        class="text-sm p-1 opacity-50 hover:opacity-100"
        on:click={() => userBlockedScripts = !userBlockedScripts}>{scriptBlockingResult ? 'SSR' : 'CSR'}</button>
    {/if}

    <button
      type="button"
      title="Reset Dimensions"
      class:opacity-50={hovered}
      class="text-sm p-1 opacity-50 hover:opacity-100"
      on:click={resetDimensions}>{width} x {height}</button>

    <a
      href={src}
      title="Open by Itself{csr === false ? ' (you will need to disable Javascript to emulate SSR-only)' : ''}"
      class:opacity-50={hovered}
      class="px-2 py-1 opacity-50 hover:opacity-100"><span class="i-tabler-external-link align--3px" /></a>

    <button
      type="button"
      title="Reload"
      class:opacity-50={hovered}
      class="px-2 py-1 opacity-50 hover:opacity-100"
      on:click={refresh}><span class="i-material-symbols-refresh align--3px" /></button>
  </div>

  <slot {scriptBlockingResult} {showCode} />
</ShowHide>
