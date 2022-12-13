import fs from 'fs';

export function initKitbook() {
  process.env.KITBOOK = '1';
  ensureKitbookRoutesExist();
  addSvelteConfigAugmentFunctionIfNeeded();
}

function ensureKitbookRoutesExist() {
  const kitbookRoutesPath = 'src/kitbook';
  if (!fs.existsSync(kitbookRoutesPath)) {
    try {
      fs.mkdirSync(kitbookRoutesPath);
      const src = 'node_modules/kitbook/routes';
      const destination = kitbookRoutesPath;
      fs.cpSync(src, destination, { recursive: true });
      console.log(`Copied Kitbook routes directory to ${kitbookRoutesPath} to setup your Kitbook. The Kitbook plugin will automatically update to your Svelte config file to use this as the routes directory when running vite in "kitbook" mode.\n`);
    } catch (e) {
      console.error(e);
    }
  }
}

const AUGMENT_FUNCTION_TEXT = `import { augmentSvelteConfigForKitbook } from 'kitbook/plugins/vite-plugin-svelte-kitbook'; 
export default augmentSvelteConfigForKitbook(config);`;

function addSvelteConfigAugmentFunctionIfNeeded() {
  let svelteConfigPath: string;

  const possibleExtensions = ['js', 'mjs', 'cjs', 'ts', 'mts', 'cts'];
  for (const extension of possibleExtensions) {
    const pathToCheck = `svelte.config.${extension}`;
    if (fs.existsSync(pathToCheck))
      svelteConfigPath = pathToCheck;
  }

  if (svelteConfigPath) {
    const svelteConfigText = fs.readFileSync(svelteConfigPath, 'utf8');
    const isAugmented = svelteConfigText.includes('augmentSvelteConfigForKitbook');
    if (!isAugmented) {
      fs.writeFileSync(svelteConfigPath, wrapExportedConfigWithAugmentFunction(svelteConfigText));
    }
  } else {
    console.log(`No svelte.config.{js|ts|mts|mjs|cts|cjs} file found. Make sure you have added the following to it to enable Kitbook: ${AUGMENT_FUNCTION_TEXT} \n`);
  }
}

function wrapExportedConfigWithAugmentFunction(svelteConfigText: string): string {
  console.log('Augmenting your svelte.config.js file for Kitbook use. This `augmentSvelteConfigForKitbook` function will add MDSvex support and server routes from the `src/kitbook` folder when running vite in "kitbook" mode.\n');
  return svelteConfigText.replace('export default config', AUGMENT_FUNCTION_TEXT);
}

if (import.meta.vitest) {
  test('wrapExportedConfigWithAugmentFunction', () => {
    expect(wrapExportedConfigWithAugmentFunction(`import {foo} from 'somewhere';\n\nconst config = {}\n\nexport default config`)).toMatchInlineSnapshot(`
      "import {foo} from 'somewhere';

      const config = {}

      import { augmentSvelteConfigForKitbook } from 'kitbook/plugins/vite-plugin-svelte-kitbook'; 
      export default augmentSvelteConfigForKitbook(config);"
    `);
  });
}
