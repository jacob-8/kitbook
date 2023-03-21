import fs from 'fs';
import { wrapExportedConfigWithAugmentFunction } from './augmentSvelteConfigForKitbook';
import { AUGMENT_FUNCTION_TEXT } from './constants';

export function initKitbook() {
  process.env.KITBOOK = 'yes';
  addKitbookDirectoryIfNeeded();
  addSvelteConfigAugmentFunctionIfNeeded();
}

function addKitbookDirectoryIfNeeded() {
  const KITBOOK_DIRECTORY = 'src/.kitbook';
  if (!fs.existsSync(KITBOOK_DIRECTORY)) {
    try {
      fs.mkdirSync(KITBOOK_DIRECTORY);
      const src = 'node_modules/kitbook/dist/.kitbook';
      const destination = KITBOOK_DIRECTORY;
      fs.cpSync(src, destination, { recursive: true, filter: (src, dest) => !src.includes('.d.ts') });
      console.log(`Added Kitbook files to ${KITBOOK_DIRECTORY} which includes customization files for your Kitbook.\n`);
    } catch (e) {
      console.error(e);
    }
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

