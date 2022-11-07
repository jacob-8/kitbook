export async function pageLoad({ params, parent }) {
	const data = await parent();
    console.log({ params })
    if (params.file) {
        // use params to find right file
        const component = await data?.modules['/src/docs/index.md']() as any
        const raw = await data?.modulesRaw['/src/docs/index.md']()
        return { component: component?.default, raw };
    }

    if (data?.modules['/src/docs/index.md']) {
        const component = await data.modules['/src/docs/index.md']() as any
        const raw = await data?.modulesRaw['/src/docs/index.md']()
        return { component: component.default, raw };
    }

    // possible if you allow Vite server to access one level up
    const component = await data?.modules['/README.md']() as any
    const raw = await data?.modulesRaw['/README.md']()

    return { component: component?.default, raw };
}
