import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import type { VariantsModule } from '../kitbook-types'

export async function getVariants(options: {
  projectRoot?: string
  srcDirectory?: string
} = {}): Promise<[string, VariantsModule][]> {
  const {
    // eslint-disable-next-line node/prefer-global/process
    projectRoot = process.cwd(),
    srcDirectory = 'src',
  } = options
  const baseDirectory = join(projectRoot, srcDirectory)
  const filepaths = findFiles(baseDirectory, '.variants.ts')
  const importPromises = filepaths.map((path) => {
    return import(path).then(module => [path, module]) as Promise<[string, VariantsModule]>
  })

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
