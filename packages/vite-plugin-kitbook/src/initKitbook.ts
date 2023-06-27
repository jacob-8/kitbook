import fs from 'fs';
import { wrapExportedConfigWithAugmentFunction } from './augmentSvelteConfigForKitbook';
import { AUGMENT_FUNCTION_TEXT } from './constants';

export function initKitbook(isKitbookItself: boolean) {
  const green = '\x1b[32m';
  const bold = '\x1b[1m';
  const reset = '\x1b[0m';
  console.log(`${bold}${green}You can ignore any SvelteKit warning about needing to properly extend .svelte-kit-kitbook/tsconfig.json. SvelteKit doesn't know we have Kitbook as a second app.${reset}`);

  process.env.KITBOOK = 'yes';
  if (!isKitbookItself) addKitbookDirectoryIfNeeded();
  addSvelteConfigAugmentFunctionIfNeeded();
}

const TYPINGS_EXT = '.d.ts';
const PAGE_MARKDOWN = '_page.svelte'; // from _page.md
const LAYOUT_MARKDOWN = '_layout.svelte'; // from _layout.md
const VARIANTS = 'variants.js';
const PAGE_VARIANTS = '_page.variants.js'

function addKitbookDirectoryIfNeeded() {
  try {
    const KITBOOK_DIRECTORY = 'src/.kitbook';
    
    const alreadyHasKitbookDirectory = fs.existsSync(KITBOOK_DIRECTORY);
    if (!alreadyHasKitbookDirectory) {
      fs.mkdirSync(KITBOOK_DIRECTORY);
      const src = 'node_modules/kitbook/dist/.kitbook';
      const destination = KITBOOK_DIRECTORY;
      fs.cpSync(src, destination, { recursive: true, filter: (src, dest) => !src.includes(TYPINGS_EXT) });
      console.log(`[Kitbook] Added files to ${KITBOOK_DIRECTORY} which includes customization files for your Kitbook.\n`);
    }

    const src = 'node_modules/kitbook/dist/routes';
    const destination = KITBOOK_DIRECTORY + '/routes';
    fs.cpSync(src, destination, {
      recursive: true, filter: (src, dest) => {
        const partsOfFilesUsedJustForDevelopingKitbook = ['mock', TYPINGS_EXT, PAGE_MARKDOWN, LAYOUT_MARKDOWN, VARIANTS, PAGE_VARIANTS];
        const skip = partsOfFilesUsedJustForDevelopingKitbook.some(file => src.includes(file));
        return !skip;
      }
    });
  } catch (e) {
    console.error(e);
  }
}

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

