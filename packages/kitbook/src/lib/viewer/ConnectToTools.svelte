<script lang="ts">
  import { getLocalFileLocation } from './focused/filename'
  import type { KitbookSettings } from '$lib/kitbook-types'
  import { intersection, serializeByTurningFunctionsIntoLogs } from '$lib/open/serialize'
  import type { ToolsChangeState, ToolsComponentDetails } from '$lib/server-events'

  export let selectedComponent: ComponentWithChildren
  export let width: number
  export let height: number
  export let toolsRoute: string
  export let on_close: () => void = undefined
  export let openToolsIn: KitbookSettings['viewer']['openToolsIn']

  let container: HTMLDivElement
  let player: HTMLDivElement
  let pictureWindow: Window

  let popupWindow: Window

  $: if (selectedComponent)
    updateTools()

  let detailsForTools: ToolsComponentDetails

  function updateTools() {
    const serializedPropsAndState = serializeByTurningFunctionsIntoLogs(intersection(selectedComponent.componentDetail.options.props, selectedComponent.componentDetail.component.$capture_state()))

    detailsForTools = {
      filename: getLocalFileLocation(selectedComponent)?.file,
      tagName: selectedComponent.componentDetail.tagName,
      serializedState: serializedPropsAndState,
    }

    if (!pictureWindow && !popupWindow)
      openTools()
    else
      sendDetailsForTools()
  }

  async function openTools() {
    if (openToolsIn === 'document-picture-in-picture' && 'documentPictureInPicture' in window) {
      pictureWindow = await window.documentPictureInPicture.requestWindow({
        width,
        height,
      })
      pictureWindow.document.body.style.margin = '0'
      pictureWindow.document.body.style.height = '100%'
      pictureWindow.document.body.style.width = '100%'
      pictureWindow.document.body.append(player)
      pictureWindow.addEventListener('pagehide', () => {
        // eslint-disable-next-line svelte/no-dom-manipulating
        container?.append(player)
        pictureWindow = null
        on_close?.()
      })
    }
    else {
      popupWindow = window.open(toolsRoute, '_blank', 'width=600,height=400')
      const pollTimer = setInterval(() => {
        if (popupWindow?.closed !== false) {
          clearInterval(pollTimer)
          popupWindow = null
          on_close?.()
        }
      }, 200)
    }
  }

  if (import.meta.hot) {
    import.meta.hot.on('kitbook:to-client:tools:request-component-details', () => {
      sendDetailsForTools()
    })
  }

  function sendDetailsForTools() {
    // oddly this is called twice, once with detailsForTools undefined
    if (detailsForTools)
      import.meta.hot.send('kitbook:to-server:tools:send-component-details', detailsForTools)
  }

  if (import.meta.hot) {
    import.meta.hot.on('kitbook:to-client:tools:change-state', (data: ToolsChangeState) => {
      selectedComponent.componentDetail.component.$set(data.state)
    })
  }
</script>

<div bind:this={container}>
  <div style="height: 100%; width: 100%;" bind:this={player}>
    {#if pictureWindow}
      <iframe style="height: 100%; width: 100%; border:0;" src={toolsRoute}></iframe>
    {/if}
  </div>
</div>
