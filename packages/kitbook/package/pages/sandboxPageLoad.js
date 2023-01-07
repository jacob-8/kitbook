import LZString from 'lz-string';
const { decompressFromEncodedURIComponent: decode } = LZString;
export const sandboxPageLoad = async ({ params, parent, url }) => {
    const { pages } = await parent();
    const pageKey = '/' + params.file;
    const page = pages[pageKey];
    const loadedModules = {};
    const storyId = url.searchParams.get('storyId');
    const variantIdx = url.searchParams.get('variantIdx');
    if (storyId) {
        loadedModules.svx = (await page.loadSvx.loadModule()).default;
    }
    else {
        loadedModules.component = (await page.loadComponent.loadModule()).default;
    }
    let variant;
    if (variantIdx) {
        variant = (await page.loadVariants.loadModule()).variants[variantIdx] || {};
    }
    const editedProps = JSON.parse(decode(url.searchParams.get('props')) || null);
    return { page, pageKey, loadedModules, storyId, variant, variantIdx, editedProps };
};
