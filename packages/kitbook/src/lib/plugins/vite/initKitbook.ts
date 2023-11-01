import fs from 'node:fs'
import { join } from 'node:path'
import type { KitbookSettings } from 'kitbook'
import { bold, green, red, reset } from './colors.js'

const TYPINGS_EXT = '.d.ts'
const PAGE_MARKDOWN = '_page.md'
const LAYOUT_MARKDOWN = '_layout.md'
const VARIANTS = 'variants.js'

const LATEST_VERSION_WITH_ROUTES_UPDATE = 'kitbook@1.0.0-beta.6'
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
    fs.cpSync(src, destination, { recursive: true, filter: excludeDocFiles })
    console.info(`${bold}${green}[Kitbook] Added Kitbook route files to ${kitbookDirectory}. Except for the import.meta.glob imports in the +layout.js file, don't edit these. They will be automatically updated by Kitbook in future versions when needed.\n${reset}`)
  }
  catch (e) {
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
      }
      else if (stats.isFile()) {
        fs.unlinkSync(filePath)
        console.info(`[Kitbook] Updating routes: old file deleted: ${filePath}`)
      }
    }
  }
  catch (err) {
    console.error(`Error while cleaning directory: ${err.message}`)
  }
}

export function excludeDocFiles(src: string) {
  const partsOfFilesUsedJustForDevelopingKitbook = ['mock', TYPINGS_EXT, PAGE_MARKDOWN, LAYOUT_MARKDOWN, VARIANTS]
  const skip = partsOfFilesUsedJustForDevelopingKitbook.some(file => src.includes(file))
  return !skip
}
