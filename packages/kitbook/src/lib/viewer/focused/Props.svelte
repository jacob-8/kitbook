<script lang="ts">
  import { onMount } from 'svelte'
  import { difference, removeQuotesFromSerializedFunctions, serializeByTurningFunctionsIntoLogs } from '../../open/serialize'
  import CodeMirror from './editor/CodeMirror.svelte'
  import type { ToolsChangeState } from '$lib/server-events'

  export let state: Record<string, any>
  export let changeState: (data: ToolsChangeState) => void
  export let filename: string

  // export let resizeTo: (width: number, height: number) => void

  $: serializedState = (() => {
    const serializedStateWithLogs = serializeByTurningFunctionsIntoLogs(state)
    return removeQuotesFromSerializedFunctions(JSON.stringify(serializedStateWithLogs, null, 2))
  })()

  const PropsObjectPrefix = 'const props: Props = '

  let propPrefixWarned = false
  function handle_change(value: string) {
    if (!value.includes(PropsObjectPrefix)) {
      if (!propPrefixWarned) {
        alert(`changes will have no effect if you remove the initial "${PropsObjectPrefix}".`)
        propPrefixWarned = true
      }
      return
    }

    try {
      // TODO: remember my own console.log changes and don't update on that
      const jsString = value.replace(PropsObjectPrefix, '')
      // eslint-disable-next-line no-eval
      const updatedState = eval(`(${jsString})`)
      const changedProps = difference(state, updatedState)
      changeState({
        filename,
        state: changedProps,
      })
    }
    catch (error) {
      console.error('Invalid JSON')
    }
  }

  onMount(() => {
    resizeTo(600, 400)
  })
</script>

<CodeMirror
  value={PropsObjectPrefix + serializedState}
  tsCodeForTypes="{`/** Kitbook TODO: parse component types and enforce here. Currently any key is allowed. */
type Props = {
  [key: string]: any
}`},"
  on_change={handle_change} />
