export async function layoutLoad() {
	const svxModules = import.meta.glob('/src/**/*.{md,svx}');
	const svxModulesRaw = import.meta.glob('/src/**/*.{md,svx}', { as: 'raw' });

	const componentModules = import.meta.glob(['/src/**/*.svelte', '!/**/*+**.svelte']);
	const componentModulesRaw = import.meta.glob(['/src/**/*.svelte', '!/**/*+**.svelte'], { as: 'raw' });

	return {
		modules: { svxModules, svxModulesRaw, componentModules, componentModulesRaw }
	};
}
