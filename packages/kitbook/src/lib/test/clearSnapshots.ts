import { join } from 'node:path'
import { existsSync, rmSync } from 'node:fs'

export function clearSnapshots(options: {
  projectRoot?: string
  snapshotsDirectory?: string
} = {}): void {
  const {
    projectRoot = process.cwd(),
    snapshotsDirectory = 'e2e/snapshots',
  } = options
  const baseDirectory = join(projectRoot, snapshotsDirectory)
  try {
    if (existsSync(baseDirectory))
      rmSync(baseDirectory, { recursive: true })
  }
  catch (err) {
    console.error(err)
  }
}
