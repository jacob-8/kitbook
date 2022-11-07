// **/*.{md,svx} = Kitbook Story Files
// **/*.svelte = All Svelte components, used to automatically create a default Story for each component w/ variants automatically being populated by colocated Foo.variants.ts files // pages (**/+*.svelte) will only be displayed if mock data is colocated in a page.variants.ts file
// **/*.variants.ts contains component props for displaying variants

export async function layoutLoad() {
	const modules = import.meta.glob(['/src/**/*.{md,svx,svelte,variants.ts}',]);
	const modulesRaw = import.meta.glob(['/src/**/*.{md,svx,svelte,variants.ts}'], { as: 'raw' });

	return {
		modules,
		modulesRaw,
	};
}
