<script context="module" lang="ts">
  declare global {
    interface Window {
      documentPictureInPicture: DocumentPictureInPicture
    }
  }

  interface DocumentPictureInPicture {
    requestWindow(options?: {
      width: number
      height: number
      disallowReturnToOpener?: true // Chrome 124+
    }): Promise<Window>
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte'

  export let width = 400
  export let height = 600
  export let openPictureWindowOnMount = false
  export let on_close: () => void = undefined

  let container: HTMLDivElement
  let player: HTMLDivElement
  let pictureWindow: Window

  onMount(() => {
    if (openPictureWindowOnMount) {
      openPictureWindow()
      return () => pictureWindow?.close()
    }
  })

  export async function openPictureWindow() {
    if (!('documentPictureInPicture' in window))
      return alert('no browser support for document in picture - please use desktop Chrome')

    try {
      pictureWindow = await window.documentPictureInPicture.requestWindow({
        width,
        height,
      })
      copyStyleSheetsToPictureWindow(pictureWindow)

      pictureWindow.document.body.append(player)

      pictureWindow.addEventListener('keydown', handlePictureKeydown)
      pictureWindow.addEventListener('pagehide', () => {
        // eslint-disable-next-line svelte/no-dom-manipulating
        container?.append(player)
        pictureWindow.removeEventListener('keydown', handlePictureKeydown)
        pictureWindow = null
        on_close?.()
      })
    }
    catch (error) {
      alert(error)
      console.error(error)
    }
  }

  function copyStyleSheetsToPictureWindow(pictureWindow: Window) {
    [...document.styleSheets].forEach((styleSheet) => {
      try {
        const cssRules = [...styleSheet.cssRules].map(rule => rule.cssText).join('')
        const style = document.createElement('style')

        // original of `mask: var(--un-icon) no-repeat` get spread into the following and breaks un-icons;
        const maskObfuscatedString = 'mask-image: ; -webkit-mask-position-x: ; -webkit-mask-position-y: ; mask-repeat: ; mask-origin: ; mask-clip: ; mask-composite: ; mask-mode: ;'
        const iconMaskPropertyFixedCssRules = cssRules.replaceAll(maskObfuscatedString, 'mask-image: var(--un-icon); mask-repeat: no-repeat;')

        style.textContent = iconMaskPropertyFixedCssRules
        pictureWindow.document.head.appendChild(style)
      }
      catch (e) {
        const link = document.createElement('link')

        link.rel = 'stylesheet'
        link.type = styleSheet.type
        link.media = styleSheet.media as unknown as string
        link.href = styleSheet.href
        pictureWindow.document.head.appendChild(link)
      }
    })
  }

  export function resizeTo(width: number, height: number) {
    pictureWindow.resizeTo(width, height)
  }

  function handlePictureKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape')
      return pictureWindow?.close()
    if (e.altKey && e.key === 'f')
      return window.focus()
    if (e.altKey && e.key === 'r')
      return resizeTo(width, height)
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!pictureWindow)
      return
    if (e.key === 'Escape')
      return pictureWindow.close()
    if (e.altKey && e.key === 'f')
      return pictureWindow.focus()
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<slot name="controls" {pictureWindow} {openPictureWindow} {resizeTo} />

<div bind:this={container}>
  <div bind:this={player}>
    {#if pictureWindow || !openPictureWindowOnMount}
      <slot {pictureWindow} />
    {/if}
  </div>
</div>
