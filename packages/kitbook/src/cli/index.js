#!/usr/bin/env node
// when developing locally run `npm link` in packages/kitbook to be able to then run these cli commands - https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e

process.env.KITBOOK = alreadySetKITBOOKprocessValueOrTrue();
function alreadySetKITBOOKprocessValueOrTrue() {
  return process.env.KITBOOK == null ? '1' : process.env.KITBOOK
}

import { buildKitbook } from './build.js';
import { startKitbookDevServer } from './dev.js';
import { previewKitbook } from './preview.js';

import { cac } from 'cac';
const cli = cac('kitbook');

cli
  .command('dev [root]', 'Run Vite dev server using an adjusted config for Kitbook')
  // .option('--base <baseUrl>', '[string] Set public base path (default: /)')
  .action((root, options) => startKitbookDevServer(root, options))

cli
  .command('build [root]', 'Build Kitbook use Vite build')
  .action((root, options) => buildKitbook(root, options))

cli
  .command('preview [root]', 'Preview Built Kitbook using Vite')
  .action((root, options) => previewKitbook(root, options))

cli.help();
cli.parse(process.argv);
