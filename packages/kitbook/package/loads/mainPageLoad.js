export const mainPageLoad = async ({ params, parent }) => {
    const { pages } = await parent();
    const page = pages['/' + params.file];
    const loadedModules = {};
    if (page) {
        if (page.loadSvx) {
            loadedModules.svx = (await page.loadSvx.loadModule())?.default;
            // loadedModules.svxRaw = await page.loadSvx.loadRaw()
        }
        if (page.loadComponent) {
            loadedModules.component = (await page.loadComponent.loadModule())?.default;
            // loadedModules.componentRaw = await page.loadComponent.loadRaw()
        }
        if (page.loadVariants) {
            loadedModules.variants = (await page.loadVariants.loadModule())?.variants;
            // loadedModules.variantsRaw = await page.loadVariants.loadRaw()
        }
        return { page, loadedModules };
    }
    const indexPage = pages['/index'];
    if (indexPage) {
        loadedModules.svx = (await indexPage.loadSvx.loadModule())?.default;
        // loadedModules.svxRaw = await indexPage.loadSvx.loadRaw()
        return { page: indexPage, loadedModules };
    }
    const readmePage = pages['/README'];
    // requires allowing Vite server to access one level up from project root (/src)
    if (readmePage) {
        try {
            loadedModules.svx = (await readmePage.loadSvx.loadModule())?.default;
            // loadedModules.svxRaw = await readmePage.loadSvx.loadRaw()
            return { page: readmePage, loadedModules };
        }
        catch (e) {
            return {
                error: `Displaying your project README.md as the Kitbook homepage will only work if you allow the Vite server to access one level up from project root (/src) by setting "server.fs.allow = ['..']" in your Vite config. See https://vitejs.dev/config/#server-fs-allow for more info. // ERROR: ${e}`
            };
        }
    }
    return { error: 'No modules found that match your glob imports. By default Kitbook will try to display your project README.md file as the home page if no src/index.md file exists.' };
};
