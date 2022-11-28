import { bold, cyan } from 'kleur/colors';

import { spawn } from 'child_process'; // need to learn difference between this and spawnSync

export async function startKitbookDevServer(root, options) {
  console.log(`Starting ${bold(cyan('Kitbook'))} dev server`);

  const viteDevServer = spawn('vite dev', ['--config kitbook.vite.config.js'], {
    shell: true,
    stdio: 'inherit',
    env: process.env,
  });

  console.log({ root, options })
}