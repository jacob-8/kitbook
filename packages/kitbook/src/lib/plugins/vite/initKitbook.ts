import fs from 'node:fs'
import { join } from 'node:path'
import type { KitbookSettings } from 'kitbook'
import { bold, green, red, reset } from './colors.js'

const LATEST_VERSION_WITH_ROUTES_UPDATE = 'kitbook@1.0.0-beta.31'
const FILE_WITH_NOTICE = '[...file]/+page.svelte'

export function initKitbook({ routesDirectory, kitbookRoute }: KitbookSettings) {
  const kitbookDirectory = routesDirectory + kitbookRoute

  try {
    const hasFileWithNotice = fs.existsSync(`${kitbookDirectory}/${FILE_WITH_NOTICE}`)

    if (hasFileWithNotice) {
      const fileWithNotice = fs.readFileSync(`${kitbookDirectory}/${FILE_WITH_NOTICE}`, 'utf-8')
      if (fileWithNotice?.includes(LATEST_VERSION_WITH_ROUTES_UPDATE))
        return
    }

    const kitbookDirectoryExists = fs.existsSync(kitbookDirectory)
    if (!kitbookDirectoryExists)
      fs.mkdirSync(kitbookDirectory)

    cleanDirectory(kitbookDirectory)

    const src = 'node_modules/kitbook/dist/routes'
    const destination = kitbookDirectory
    fs.cpSync(src, destination, { recursive: true, filter: file_needs_copied })
    console.info(`${bold}${green}[Kitbook] Added Kitbook route files to ${kitbookDirectory}. Except for the import.meta.glob imports or mockPageData in the +layout.js file, don't edit these. They will be automatically updated by Kitbook in future versions when needed.\n${reset}`)
  } catch (e) {
    console.error(`${bold}${red}[Kitbook] Error copying in needed routes: ${e}\n${reset}`)
  }
}

function cleanDirectory(directoryPath: string) {
  try {
    const files = fs.readdirSync(directoryPath)

    for (const file of files) {
      const filePath = join(directoryPath, file)
      const stats = fs.statSync(filePath)
      if (stats.isDirectory()) {
        cleanDirectory(filePath)
        fs.rmdirSync(filePath)
      } else if (stats.isFile()) {
        fs.unlinkSync(filePath)
        console.info(`[Kitbook] Updating routes: old file deleted: ${filePath}`)
      }
    }
  } catch (err) {
    console.error(`Error while cleaning directory: ${err.message}`)
  }
}

export function file_needs_copied(src: string) {
  const allowed_files_folders = [
    'routes',
    '[...file]',
    '[...file]/+page.svelte',
    '[...file]/+page.js',
    'sandbox',
    'sandbox/[...file]',
    'sandbox/[...file]/+page.js',
    'sandbox/[...file]/+page.svelte',
    'tools',
    'tools/+page.svelte',
    '+layout.js',
  ]
  const normalized_src = src.replace(/\\/g, '/')
  return allowed_files_folders.some(file => normalized_src.endsWith(file))
}
