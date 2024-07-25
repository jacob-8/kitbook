<script lang="ts">
  import { onMount } from 'svelte'
  import type { LayoutLoadResult } from '../../layout/layoutLoad'
  import Tools from './Tools.svelte'
  import type { ToolsChangeState, ToolsComponentDetails } from '$lib/server-events'

  export let data: LayoutLoadResult
  let detailsForTools: ToolsComponentDetails

  onMount(() => {
    import.meta.hot.send('kitbook:to-server:tools:request-component-details', {})
  })

  if (import.meta.hot) {
    import.meta.hot.on('kitbook:to-client:tools:send-component-details', (data) => {
      // oddly the data is sent twice, once always empty
      if (data)
        detailsForTools = data
    })
  }

  function changeState(data: ToolsChangeState) {
    import.meta.hot?.send('kitbook:to-server:tools:change-state', data)
  }
</script>

{#if detailsForTools}
  <Tools {detailsForTools} {data} {changeState} />
{/if}
