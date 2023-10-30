import * as core from '@actions/core'
import { makeComment } from './makeComment'

export async function run(): Promise<void> {
  try {
    const uploadResults: string = core.getInput('upload-results')
    const prNumber: string = core.getInput('pr')
    const bucketName: string = core.getInput('bucket-name')
    const projectName: string = core.getInput('project-name')
    core.debug(`uploadResults: ${uploadResults}`)
    core.debug(`prNumber: ${prNumber}`)
    core.debug(`bucketName: ${bucketName}`)
    core.debug(`projectName: ${projectName}`)

    const comment = makeComment({
      uploadResults,
      prNumber,
      bucketName,
      projectName,
    })

    core.setOutput('comment', comment)
  }
  catch (error) {
    if (error instanceof Error)
      core.setFailed(error.message)
  }
}
