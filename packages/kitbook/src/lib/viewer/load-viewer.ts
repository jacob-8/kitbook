import type { ComponentProps } from 'svelte';
import Viewer from './Viewer.svelte';

function create_viewer_host() {
	console.log('creating viewer host')
	const id = 'kitbook-viewer-host';
	if (document.getElementById(id) != null) {
		throw new Error('kitbook-viewer-host element already exists');
	}
	const el = document.createElement('div');
	el.setAttribute('id', id);
	document.documentElement.appendChild(el);
	return el;
}

export function loadViewer(options: ComponentProps<Viewer>['options']) {
	new Viewer({ target: create_viewer_host(), props: { options } });
}