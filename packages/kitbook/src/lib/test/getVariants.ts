import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import type { VariantsModule } from '../kitbook-types'

/**
 * This function must be run using a root level await call before you define your Playwright tests as if you run Playwright tests from within an async function the runner will error.
 *
 * @param options
 * @param options.projectRoot The root directory of your SvelteKit project. Defaults to `process.cwd()`.
 * @param options.srcDirectory The directory where your SvelteKit source files are located. Defaults to `src`.
 * @param options.skipFiles An array of filepaths to skip when importing variants. The filepaths should be relative to the srcDirectory and without extensions. A basic homepage would be written as `/routes/+page`, a button in your lib would be `/lib/Button`.
 */
export async function getVariants(options: {
  projectRoot?: string
  srcDirectory?: string
  skipFiles?: string[]
} = {}): Promise<[string, VariantsModule][]> {
  const {
    // eslint-disable-next-line node/prefer-global/process
    projectRoot = process.cwd(),
    srcDirectory = 'src',
    skipFiles = [],
  } = options
  const baseDirectory = join(projectRoot, srcDirectory)
  const filepaths = findFiles(baseDirectory, '.variants.ts')
  const allowedFilepaths = filterSkippedFiles(filepaths, skipFiles, srcDirectory)

  const importPromises = allowedFilepaths.map((path) => {
    const url = pathToFileURL(path).href
    return import(url).then(module => [url, module]) as Promise<[string, VariantsModule]>
  })

  if (importPromises.length === 0)
    throw new Error('No variant files found. If you are not running these tests from your SvelteKit project root then you must pass the projectRoot property to getVariants. If you are using a custom directory for your src files you must pass srcDirectory to getVariants.')

  return await Promise.all(importPromises)
}

function findFiles(directory: string, ending: string): string[] {
  const files: string[] = []

  for (const file of readdirSync(directory)) {
    const filePath = join(directory, file)
    if (statSync(filePath).isDirectory())
      files.push(...findFiles(filePath, ending))
    else if (file.endsWith(ending))
      files.push(filePath)
  }

  return files
}

function filterSkippedFiles(filepaths: string[], skipFiles: string[], srcDirectory: string) {
  return filepaths.filter((path) => {
    const shortPath = getRelativeNormalizedPath(path, srcDirectory)
      .replace('.variants.ts', '')
      .replace('_page', '+page')
      .replace('_layout', '+layout')
    return !skipFiles.includes(shortPath)
  })
}

function getRelativeNormalizedPath(path: string, srcDirectory: string): string {
  const [, relativePath] = path.split(srcDirectory)
  return relativePath
    .replace(/\\\\|\\/g, '/')
}

if (import.meta.vitest) {
  test(filterSkippedFiles, () => {
    const filepaths = [
      'C:\\dev\\kitbook\\packages\\kitbook\\src\\docs\\1-variants\\DefaultSlot.variants.ts',
      'C:\\dev\\kitbook\\packages\\kitbook\\src\\lib\\routes\\sandbox\\[...file]\\_page.variants.ts',
      'C:\\dev\\kitbook\\packages\\kitbook\\src\\lib\\components\\EditInGithub.variants.ts',
    ]
    const skipFiles = [
      '/docs/1-variants/DefaultSlot',
      '/lib/routes/sandbox/[...file]/+page',
    ]
    const srcDirectory = 'src'

    expect(filterSkippedFiles(filepaths, skipFiles, srcDirectory)).toMatchInlineSnapshot(`
      [
        "C:\\\\dev\\\\kitbook\\\\packages\\\\kitbook\\\\src\\\\lib\\\\components\\\\EditInGithub.variants.ts",
      ]
    `)
  })

  test(getRelativeNormalizedPath, () => {
    expect(getRelativeNormalizedPath('C:\\dev\\kitbook\\packages\\kitbook\\src\\docs\\1-variants\\DefaultSlot.variants.ts', 'src')).toMatchInlineSnapshot('"/docs/1-variants/DefaultSlot.variants.ts"')
  })
}
