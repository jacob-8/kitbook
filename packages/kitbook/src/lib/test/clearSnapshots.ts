import { join } from 'node:path'
import { rmSync } from 'node:fs'

export function clearSnapshots(options: {
  projectRoot?: string
  snapshotsDirectory?: string
} = {}): void {
  const {
    // eslint-disable-next-line node/prefer-global/process
    projectRoot = process.cwd(),
    snapshotsDirectory = 'e2e/snapshots',
  } = options
  const baseDirectory = join(projectRoot, snapshotsDirectory)
  try {
    rmSync(baseDirectory, { recursive: true })
  }
  catch (err) {
    console.error(err)
  }
}
