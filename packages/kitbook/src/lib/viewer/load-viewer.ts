import type { ComponentProps } from 'svelte'
import Viewer from './Viewer.svelte'

export function loadViewer(settings: ComponentProps<Viewer>['settings']) {
  if (inIframe())
    return

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

function inIframe() {
  try {
    return window.self !== window.top
  }
  catch (e) {
    return true
  }
}
