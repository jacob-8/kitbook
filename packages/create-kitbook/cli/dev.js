import { spawn } from 'node:child_process' // need to learn difference between this and spawnSync
import { bold, cyan } from 'kleur/colors'

export async function startKitbookDevServer(root, options) {
  console.log(`Starting ${bold(cyan('Kitbook'))} dev server`)

  const viteDevServer = spawn('vite dev', ['--config kitbook.vite.config.js'], {
    shell: true,
    stdio: 'inherit',
    env: process.env,
  })

  console.log({ root, options })
}
