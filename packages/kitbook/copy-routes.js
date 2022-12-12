// @ts-check
import fs from 'fs-extra';

(() => {
  const src = 'src/routes';
  const dest = 'package/routes';
  fs.copy(src, dest, { filter: onlyRouteFiles }, err => {
    if (err) return console.error(err)
    console.log('success!')
  });
})();

/**
 * @param {string} src 
 * @param {string} dest 
 * @returns boolean
 */
function onlyRouteFiles(src, dest) {
  const isFolder = !src.match(/[a-z]\.[a-z]/);
  const isARouteFile = src.includes('+page') || src.includes('+layout');
  const copyIt = isFolder || isARouteFile;
  if (copyIt) console.log({src, isFolder, isARouteFile})
  return copyIt;
}

// Add to package.json exports if wanting people to be able to point directly instead of copying in - doesn't work because of Vite cache
// "./routes/(main)/+layout.svelte": "./routes/(main)/+layout.svelte",
// "./routes/(main)/[...file]/+page.svelte": "./routes/(main)/[...file]/+page.svelte",
// "./routes/(main)/[...file]/+page": "./routes/(main)/[...file]/+page.js",
// "./routes/+layout": "./routes/+layout.js",
// "./routes/sandbox/[...file]/+page.svelte": "./routes/sandbox/[...file]/+page.svelte",
// "./routes/sandbox/[...file]/+page": "./routes/sandbox/[...file]/+page.js",