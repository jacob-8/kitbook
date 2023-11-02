import * as core from '@actions/core'
import { makeComment } from './makeComment'

export async function run(): Promise<void> {
  try {
    const uploadResults: string = core.getInput('upload-results')
    const prNumber: string = core.getInput('pr')
    const bucketName: string = core.getInput('bucket')
    const projectName: string = core.getInput('project')
    const deploymentUrl: string = core.getInput('deployment-url')
    const kitbookRoute: string = core.getInput('kitbook-route')
    core.debug(`uploadResults: ${uploadResults}`)
    core.debug(`prNumber: ${prNumber}`)
    core.debug(`bucketName: ${bucketName}`)
    core.debug(`projectName: ${projectName}`)
    core.debug(`deploymentUrl: ${deploymentUrl}`)
    core.debug(`kitbookRoute: ${kitbookRoute}`)

    const comment = makeComment({
      uploadResults,
      prNumber,
      bucketName,
      projectName,
      deploymentUrl,
      kitbookRoute,
    })

    core.setOutput('comment', comment)
  }
  catch (error) {
    if (error instanceof Error)
      core.setFailed(error.message)
  }
}
