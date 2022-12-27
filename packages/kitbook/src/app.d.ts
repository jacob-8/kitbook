// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

declare const __KitbookRoutes__: string

declare namespace svelteHTML {
	// https://github.com/sveltejs/language-tools >> docs/preprocessors/typescript.md
	interface HTMLAttributes<T> {
		'on:movementx'?: (event: { detail: number }) => any;
		'on:movementy'?: (event: { detail: number }) => any;
	}
}