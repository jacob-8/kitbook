<script lang="ts">
  import type { KitbookSettings } from 'kitbook'
  import Targeter from './Targeter.svelte'
  import { selectedComponent } from './focused/active'
  import Tree from './tree/Tree.svelte'
  import Component from './focused/Component.svelte'
  import DocumentInPicture from './DocumentInPicture.svelte'

  export let settings: KitbookSettings
  $: ({ toggleButtonPos, toggleKeyCombo, showToggleButton, holdMode, __internal: { viteBase } } = settings.viewer)
  $: toggle_combo = toggleKeyCombo?.toLowerCase().split('-')

  let targeting = false
  let hold_start_ts: number

  function handleKeydown(e: KeyboardEvent) {
    if (e.repeat || e.key == null || (!targeting && !is_toggle(e)))
      return

    if (is_combo(e)) {
      toggle()
      if (holdMode && targeting)
        hold_start_ts = Date.now()
    }
    else if (targeting && (is_holding() || e.key === 'Escape')) {
      targeting = false
    }
  }

  function handleKeyup(e: KeyboardEvent) {
    if (e.repeat || e.key == null || !targeting)
      return

    if (is_toggle(e)) {
      if (is_holding())
        disable()
      else
        hold_start_ts = null
    }
  }

  function is_toggle(e: KeyboardEvent) {
    return toggle_combo?.includes(e.key.toLowerCase())
  }

  function is_combo(e: KeyboardEvent) {
    return is_toggle(e) && toggle_combo?.every(key => is_key_active(key, e))
  }

  function is_key_active(key: string, e: KeyboardEvent) {
    switch (key) {
      case 'shift':
      case 'control':
      case 'alt':
      case 'meta':
        return e.getModifierState(key.charAt(0).toUpperCase() + key.slice(1))
      default:
        return key === e.key.toLowerCase()
    }
  }

  function toggle() {
    targeting ? disable() : targeting = true
  }

  function disable() {
    targeting = false
    hold_start_ts = null
  }

  function is_holding() {
    return hold_start_ts && Date.now() - hold_start_ts > 250
  }

  function onVisibilityChange() {
    if (document.visibilityState === 'hidden')
      disable()
  }
</script>

{#if targeting}
  <Targeter
    on_click={() => {
      if (holdMode && is_holding())
        disable()
    }}
    {viteBase} />

  <Tree on:close={() => $selectedComponent = null} />
{/if}

{#if showToggleButton === 'always' || (showToggleButton === 'active' && targeting)}
  <button
    type="button"
    style="
      background-repeat: no-repeat;
      background-position:center;
      background-image: var(--gray-svelte-inspector-icon);
      {toggleButtonPos
        .split('-')
        .map(p => `${p}: 8px;`)
        .join('')}"
    class="w-32px h-32px fixed bg-white border-gray-700 border rounded"
    on:click={() => targeting = !targeting}>

    <!-- <span class="i-mdi-target text-2xl" /> -->
  </button>
{/if}

{#if $selectedComponent}
  <DocumentInPicture openPictureWindowOnMount on_close={() => $selectedComponent = null}>
    <div class="flex flex-col">
      <Component {settings} />
    </div>
  </DocumentInPicture>
{/if}

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} on:visibilitychange={onVisibilityChange} />

<style>
  /* gray: #808080 */

  :global(:root) {
    --gray-svelte-inspector-icon: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMSIgaGVpZ2h0PSIyNSIgdmlld0JveD0iMCAwIDEwNyAxMjgiPiA8dGl0bGU+c3ZlbHRlLWluc3BlY3Rvci1sb2dvPC90aXRsZT4gPHBhdGggZD0iTTk0LjE1NjYsMjIuODE4OWMtMTAuNC0xNC44ODUxLTMwLjk0LTE5LjI5NzEtNDUuNzkxNC05LjgzNDhMMjIuMjgyNSwyOS42MDc4QTI5LjkyMzQsMjkuOTIzNCwwLDAsMCw4Ljc2MzksNDkuNjUwNmEzMS41MTM2LDMxLjUxMzYsMCwwLDAsMy4xMDc2LDIwLjIzMThBMzAuMDA2MSwzMC4wMDYxLDAsMCwwLDcuMzk1Myw4MS4wNjUzYTMxLjg4ODYsMzEuODg4NiwwLDAsMCw1LjQ0NzMsMjQuMTE1N2MxMC40MDIyLDE0Ljg4NjUsMzAuOTQyMywxOS4yOTY2LDQ1Ljc5MTQsOS44MzQ4TDg0LjcxNjcsOTguMzkyMUEyOS45MTc3LDI5LjkxNzcsMCwwLDAsOTguMjM1Myw3OC4zNDkzLDMxLjUyNjMsMzEuNTI2MywwLDAsMCw5NS4xMyw1OC4xMTdhMzAsMzAsMCwwLDAsNC40NzQzLTExLjE4MjQsMzEuODgsMzEuODgsMCwwLDAtNS40NDczLTI0LjExNTciIHN0eWxlPSJmaWxsOiM4MDgwODAiLz48cGF0aCBkPSJNNDUuODE3MSwxMDYuNTgxNUEyMC43MTgyLDIwLjcxODIsMCwwLDEsMjMuNTgsOTguMzM4OWExOS4xNzM5LDE5LjE3MzksMCwwLDEtMy4yNzY2LTE0LjUwMjUsMTguMTg4NiwxOC4xODg2LDAsMCwxLC42MjMzLTIuNDM1N2wuNDkxMi0xLjQ5NzgsMS4zMzYzLjk4MTVhMzMuNjQ0MywzMy42NDQzLDAsMCwwLDEwLjIwMyw1LjA5NzhsLjk2OTQuMjk0MS0uMDg5My45Njc1YTUuODQ3NCw1Ljg0NzQsMCwwLDAsMS4wNTIsMy44NzgxLDYuMjM4OSw2LjIzODksMCwwLDAsNi42OTUyLDIuNDg1LDUuNzQ0OSw1Ljc0NDksMCwwLDAsMS42MDIxLS43MDQxTDY5LjI3LDc2LjI4MWE1LjQzMDYsNS40MzA2LDAsMCwwLDIuNDUwNi0zLjYzMSw1Ljc5NDgsNS43OTQ4LDAsMCwwLS45ODc1LTQuMzcxMiw2LjI0MzYsNi4yNDM2LDAsMCwwLTYuNjk3OC0yLjQ4NjQsNS43NDI3LDUuNzQyNywwLDAsMC0xLjYuNzAzNmwtOS45NTMyLDYuMzQ0OWExOS4wMzI5LDE5LjAzMjksMCwwLDEtNS4yOTY1LDIuMzI1OSwyMC43MTgxLDIwLjcxODEsMCwwLDEtMjIuMjM2OC04LjI0MjcsMTkuMTcyNSwxOS4xNzI1LDAsMCwxLTMuMjc2Ni0xNC41MDI0LDE3Ljk4ODUsMTcuOTg4NSwwLDAsMSw4LjEzLTEyLjA1MTNMNTUuODgzMywyMy43NDcyYTE5LjAwMzgsMTkuMDAzOCwwLDAsMSw1LjMtMi4zMjg3QTIwLjcxODIsMjAuNzE4MiwwLDAsMSw4My40MiwyOS42NjExYTE5LjE3MzksMTkuMTczOSwwLDAsMSwzLjI3NjYsMTQuNTAyNSwxOC40LDE4LjQsMCwwLDEtLjYyMzMsMi40MzU3bC0uNDkxMiwxLjQ5NzgtMS4zMzU2LS45OGEzMy42MTc1LDMzLjYxNzUsMCwwLDAtMTAuMjAzNy01LjFsLS45Njk0LS4yOTQyLjA4OTMtLjk2NzVhNS44NTg4LDUuODU4OCwwLDAsMC0xLjA1Mi0zLjg3OCw2LjIzODksNi4yMzg5LDAsMCwwLTYuNjk1Mi0yLjQ4NSw1Ljc0NDksNS43NDQ5LDAsMCwwLTEuNjAyMS43MDQxTDM3LjczLDUxLjcxOWE1LjQyMTgsNS40MjE4LDAsMCwwLTIuNDQ4NywzLjYzLDUuNzg2Miw1Ljc4NjIsMCwwLDAsLjk4NTYsNC4zNzE3LDYuMjQzNyw2LjI0MzcsMCwwLDAsNi42OTc4LDIuNDg2NCw1Ljc2NTIsNS43NjUyLDAsMCwwLDEuNjAyLS43MDQxbDkuOTUxOS02LjM0MjVhMTguOTc4LDE4Ljk3OCwwLDAsMSw1LjI5NTktMi4zMjc4LDIwLjcxODEsMjAuNzE4MSwwLDAsMSwyMi4yMzY4LDguMjQyNywxOS4xNzI1LDE5LjE3MjUsMCwwLDEsMy4yNzY2LDE0LjUwMjQsMTcuOTk3NywxNy45OTc3LDAsMCwxLTguMTMsMTIuMDUzMkw1MS4xMTY3LDEwNC4yNTI4YTE5LjAwMzgsMTkuMDAzOCwwLDAsMS01LjMsMi4zMjg3IiBzdHlsZT0iZmlsbDojZmZmIi8+IDxwb2x5Z29uIHBvaW50cz0iMCwwIDE1LDQwIDQwLDIwIiBzdHJva2U9IiM4MDgwODAiIGZpbGw9IiM4MDgwODAiPjwvcG9seWdvbj4gPC9zdmc+");

    /* --target-icon: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='32' height='32' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='%23ff3e00' d='M11 2v2.07A8.002 8.002 0 0 0 4.07 11H2v2h2.07A8.002 8.002 0 0 0 11 19.93V22h2v-2.07A8.002 8.002 0 0 0 19.93 13H22v-2h-2.07A8.002 8.002 0 0 0 13 4.07V2m-2 4.08V8h2V6.09c2.5.41 4.5 2.41 4.92 4.91H16v2h1.91c-.41 2.5-2.41 4.5-4.91 4.92V16h-2v1.91C8.5 17.5 6.5 15.5 6.08 13H8v-2H6.09C6.5 8.5 8.5 6.5 11 6.08M12 11a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1Z'/%3E%3C/svg%3E") 16 16, crosshair; */
  }

  :global(body.kitbook-viewer-enabled *) {
    cursor: var(--gray-svelte-inspector-icon), crosshair !important;
  }
</style>
