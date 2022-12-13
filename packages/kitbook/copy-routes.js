// @ts-check
import fs from 'fs';

function copyRoutes() {
  try {
    const src = 'src/routes';
    const destination = 'package/routes';
    fs.cpSync(src, destination, { filter: onlyRouteFiles, recursive: true });
    console.log('success!')
  } catch (e) {
    console.error(e);
  }
};
copyRoutes();

/**
 * @param {string} src 
 * @param {string} dest 
 * @returns boolean
 */
function onlyRouteFiles(src, dest) {
  const isFolder = !src.match(/[a-z]\.[a-z]/);
  const isARouteFile = src.includes('+page') || src.includes('+layout');
  const copyIt = isFolder || isARouteFile;
  return copyIt;
}

// Add to package.json exports if wanting users to be able to point directly to node_modules/kitbook/routes instead of copying in. This doesn't presently work w/o turning off cache in browser devtools because of how Vite caches files in node_modules.
// "./routes/(main)/+layout.svelte": "./routes/(main)/+layout.svelte",
// "./routes/(main)/[...file]/+page.svelte": "./routes/(main)/[...file]/+page.svelte",
// "./routes/(main)/[...file]/+page": "./routes/(main)/[...file]/+page.js",
// "./routes/+layout": "./routes/+layout.js",
// "./routes/sandbox/[...file]/+page.svelte": "./routes/sandbox/[...file]/+page.svelte",
// "./routes/sandbox/[...file]/+page": "./routes/sandbox/[...file]/+page.js",