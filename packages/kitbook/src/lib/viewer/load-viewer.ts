import type { KitbookSettings } from 'kitbook'

export async function loadViewer(settings: KitbookSettings) {
  if (await inKitbookIframe(settings._languageInsertedKitbookRoute))
    return

  const Viewer = (await import('./Viewer.svelte')).default
  // eslint-disable-next-line no-new
  new Viewer({ target: create_viewer_host(), props: { settings } })
}

function create_viewer_host() {
  console.info('creating kitbook-viewer-host')
  const id = 'kitbook-viewer-host'
  if (document.getElementById(id) != null)
    throw new Error('kitbook-viewer-host element already exists')

  const el = document.createElement('div')
  el.setAttribute('id', id)
  document.documentElement.appendChild(el)
  return el
}

async function inKitbookIframe(kitbook_route: string) {
  try {
    const isIframe = window.self !== window.top
    if (isIframe) {
      await new Promise(resolve => setTimeout(resolve, 2000)) // wait for titles to be set as sometimes the Sandbox title is not set yet.
      if (window.self.document.title === 'Kitbook Sandbox')
        return true
    }
  } catch (e) {
    return true
  }
}
