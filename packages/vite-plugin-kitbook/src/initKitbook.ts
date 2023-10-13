import fs from 'node:fs'
import type { KitbookSettings } from './types'

const TYPINGS_EXT = '.d.ts'
const PAGE_MARKDOWN = '_page.svelte'
const LAYOUT_MARKDOWN = '_layout.svelte'
const VARIANTS = 'variants.js'

const green = '\x1B[32m'
const red = '\x1B[31m'
const bold = '\x1B[1m'
const reset = '\x1B[0m'

export function initKitbook({ routesDirectory, kitbookRoute }: KitbookSettings) {
  const kitbookDirectory = routesDirectory + kitbookRoute

  try {
    const kitbookDirectoryExists = fs.existsSync(kitbookDirectory)
    console.log({ kitbookDirectory, kitbookDirectoryExists })

    if (kitbookDirectoryExists) {
      const files = fs.readdirSync(kitbookDirectory)
      const hasFiles = files.length > 0
      if (hasFiles)
        return
    }

    if (!kitbookDirectoryExists)
      fs.mkdirSync(kitbookDirectory)

    const src = 'node_modules/kitbook/dist/routes'
    const destination = kitbookDirectory
    fs.cpSync(src, destination, { recursive: true, filter: excludeDocFiles })
    console.log(`${bold}${green}[Kitbook] Added Kitbook route files to ${kitbookDirectory}. You don't need to touch these.\n${reset}`)
  }
  catch (e) {
    console.error(`${bold}${red}[Kitbook] Error copying in needed routes: ${e}\n${reset}`)
  }
}

export function excludeDocFiles(src: string) {
  const partsOfFilesUsedJustForDevelopingKitbook = ['mock', TYPINGS_EXT, PAGE_MARKDOWN, LAYOUT_MARKDOWN, VARIANTS]
  const skip = partsOfFilesUsedJustForDevelopingKitbook.some(file => src.includes(file))
  return !skip
}
