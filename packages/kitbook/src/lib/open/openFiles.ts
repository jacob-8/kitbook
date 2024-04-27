import { getFilenameAndExtension } from './get-filename-and-extension'
import { serializeIntersection } from './serialize'

export function openComponent(filepath: string, viteBase: string) {
  const file_loc = `${filepath}:1:1`
  fetch(`${viteBase}/__open-in-editor?file=${encodeURIComponent(file_loc)}`)
}

export function openVariants(filepath: string, componentDetail?: SvelteComponentDetail) {
  if (!import.meta.hot)
    return alert('Dev server must be running with HMR enabled to use this feature.')

  if (!componentDetail?.options)
    return sendOpenVariantsRequest(filepath, {})

  const { props } = componentDetail.options
  const state = componentDetail.component.$capture_state()
  const serializedState = serializeIntersection(props, state)
  sendOpenVariantsRequest(filepath, serializedState)
}

export function sendOpenVariantsRequest(filepath: string, serializedState: Record<string, any>) {
  if (!import.meta.hot)
    return alert('Dev server must be running with HMR enabled to use this feature.')

  import.meta.hot.send('kitbook:to-server:open-variants', { filepath, props: serializedState || {} })
}

export function openMarkdown(filepath: string) {
  const markdownTemplate = 'You can write some documentation for your component here using markdown.'
  ensureFileExists(filepath, markdownTemplate)
}

export function openComposition({ filepath, compositionName }: { filepath: string; compositionName?: string }) {
  const { filepathWithoutExtension, filenameWithoutExtensions, extension } = getFilenameAndExtension(filepath)

  const svelteCompositionTemplate = `<script context="module" lang="ts">
  import { defineComposition } from 'kitbook'
  
  export const config = defineComposition({
    // viewports: [{ height: 200 }],
  })
</script>

<script lang="ts">
  import ${filenameWithoutExtensions} from './${filenameWithoutExtensions}.svelte'
  // props will be added here automatically and also editable in the future, for the moment you need to add them and pass to your component.
</script>

<${filenameWithoutExtensions}>
  <!-- add slot code here if needed -->
</${filenameWithoutExtensions}>
`

  const markdownCompositionTemplate = `<script context="module" lang="ts">
  import { defineComposition } from 'kitbook'
  
  export const config = defineComposition({
    // viewports: [{ height: 200 }],
  })
</script>

<script lang="ts">

</script>

Place your Svelte composition here.
`

  const compositionExtension = (compositionName && compositionName !== 'default') ? `${compositionName}.composition` : 'composition'
  const template = extension === 'md' ? markdownCompositionTemplate : svelteCompositionTemplate
  ensureFileExists(`${filepathWithoutExtension}.${compositionExtension}`, template)
}

function ensureFileExists(filepath: string, template: string) {
  // TODO: could jump to GitHub instead of error if no dev server - use githubURL + filepath
  if (!import.meta.hot)
    return alert('Dev server must be running with HMR enabled to use this feature.')

  const pageProofPath = filepath
    .replace('+page', '_page')
    .replace('+layout', '_layout')

  import.meta.hot.send('kitbook:to-server:ensure-file-exists', { filepath: pageProofPath, template })
}

export function createNewPage(filepath: string) {
  const template = `<script lang="ts">
  export let data
</script>

Hi {data.name}`
  import.meta.hot.send('kitbook:to-server:ensure-file-exists', { filepath, template })

  const pageTemplate = `export const load = (() => {
  return { name: 'Bill' }
})`
  import.meta.hot.send('kitbook:to-server:ensure-file-exists', { filepath: filepath.replace('+page.svelte', '+page.ts'), template: pageTemplate })

  import.meta.hot.send('kitbook:to-server:open-variants', { filepath, props: { data: { name: 'John' } } })
}

export function createNewServerEndpoint(filepath: string) {
  const template = `import type { RequestHandler } from './$types'
import { error, json } from '@sveltejs/kit'
import { ResponseCodes } from '$lib/response-codes'

// export const config: Config = { maxDuration: 300 }

// TODO: rename Operation to the name of this endpoint, i.e. SendEmailRequestBody
export interface OperationRequestBody {
  foo: string
}
export interface OperationResponseBody {
  baz: string
}

export const POST: RequestHandler = async ({ locals: { getSession }, request }) => {
  const { data: session_data, error: _error } = await getSession()
  if (_error || !session_data?.user)
    error(ResponseCodes.UNAUTHORIZED, { message: _error.message || 'Unauthorized' })

  const { foo } = await request.json() as OperationRequestBody
  if (!foo) error(ResponseCodes.BAD_REQUEST, 'No foo property found in request body')

  try {
    return json({baz: foo.replace('a', 'b')} satisfies OperationResponseBody)
  } catch (err) {
    console.error(err.message)
    error(ResponseCodes.INTERNAL_SERVER_ERROR, err.message)
  }
}
`
  import.meta.hot.send('kitbook:to-server:ensure-file-exists', { filepath, template })
  const testTemplate = `import { POST, type OperationRequestBody, type OperationResponseBody } from './+server'
import { request } from '$lib/mocks/sveltekit-endpoint-helper'
import { ResponseCodes } from '$lib/response-codes'
import { authenticatedLocal } from '$lib/mocks/locals'

// vi.mock('$app/environment', () => {
//   return {
//     dev: true,
//   }
// })

describe(POST, () => {
  test('throws error if no foo', async () => {
    await expect(() => request(POST, { locals: authenticatedLocal, body: {} })).rejects.toThrowErrorMatchingInlineSnapshot(\`
      HttpError {
        "body": {
          "message": "No foo property found in request body",
        },
        "status": 400,
      }
    \`)
  })

  test('replaces a with b', async () => {
    const body: OperationRequestBody = {
      foo: 'Hi a!',
    }
    const response = await request(POST, { locals: authenticatedLocal, body })
    expect(response.status).toBe(ResponseCodes.OK)
    const { baz } = await response.json() as OperationResponseBody
    expect(baz).toBe('Hi b!')
  })
})
`
  import.meta.hot.send('kitbook:to-server:ensure-file-exists', { filepath: filepath.replace('+server.ts', '_server.test.ts'), template: testTemplate })
}

export function createNewComponent(filepath: string) {
  const template = `<script lang="ts">
  export let name = 'Bill'
</script>

Hi {name}`
  import.meta.hot.send('kitbook:to-server:ensure-file-exists', { filepath, template })
  import.meta.hot.send('kitbook:to-server:open-variants', { filepath, props: { name: 'John' } })
}

if (import.meta.hot) {
  import.meta.hot.on('kitbook:to-client:open-file', ({ filepath, viteBase }) => {
    const file_loc = `${filepath}:1:1`
    fetch(`${viteBase}/__open-in-editor?file=${encodeURIComponent(file_loc)}`)
  })
}
