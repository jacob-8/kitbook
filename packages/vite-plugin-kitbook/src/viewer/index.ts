import { ViewerOptions, DEFAULT_VIEWER_OPTIONS } from './options';
import type { Plugin } from 'vite';

const LOAD_VIEWER_ID = 'virtual:kitbook-load-viewer.js';
const RESOLVED_LOAD_VIEWER_ID = '\0' + LOAD_VIEWER_ID;

export function kitbookViewer(userChosenOptions: ViewerOptions): Plugin {

	let viewerOptions: ViewerOptions = {
		...DEFAULT_VIEWER_OPTIONS,
		...userChosenOptions || {},
	};

	return {
		name: 'vite-plugin-kitbook-viewer',
		apply: 'serve',
		enforce: 'pre',

		configResolved(config) {
			viewerOptions.__internal = {
				base: config.base?.replace(/\/$/, '') || ''
			};
		},

		async resolveId(id) {
			if (id === LOAD_VIEWER_ID) {
				return RESOLVED_LOAD_VIEWER_ID
			}
		},

		async load(id) {
			if (id === RESOLVED_LOAD_VIEWER_ID) {
				return `import { loadViewer } from 'kitbook/viewer/load-viewer';loadViewer(${JSON.stringify(viewerOptions)})`
			}
		},

		transform(code, id) {
			if (id.includes('vite/dist/client/client.mjs')) {
				return { code: `${code}\nimport('${LOAD_VIEWER_ID}')` };
			}
		}
	};
}
