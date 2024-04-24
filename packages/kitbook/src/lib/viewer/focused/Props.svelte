<script lang="ts">
  import { onMount } from 'svelte'
  import { difference, intersection, removeQuotesFromSerializedFunctions, serializeByTurningFunctionsIntoLogs } from '../../open/serialize'
  import CodeMirror from './editor/CodeMirror.svelte'

  export let selectedComponent: ComponentWithChildren
  export let resizeTo: (width: number, height: number) => void

  $: currentPropsState = (() => {
    if (!selectedComponent)
      return null
    const { props } = selectedComponent.componentDetail.options
    const state = selectedComponent.componentDetail.component.$capture_state()
    const stateThatIsProps = intersection(props, state)
    const serializedStateWithLogs = serializeByTurningFunctionsIntoLogs(stateThatIsProps)
    return removeQuotesFromSerializedFunctions(JSON.stringify(serializedStateWithLogs, null, 2))
  })()

  // function setState(key: string, value: any) {
  //   const state = selectedComponent.componentDetail.component.$capture_state()
  //   console.log({ state })
  //   selectedComponent.componentDetail.component.$set({ [key]: value })
  // }

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
      const updatedProps = eval(`(${jsString})`)
      const { props } = selectedComponent.componentDetail.options
      const state = selectedComponent.componentDetail.component.$capture_state()
      const currentProps = intersection(props, state)
      const changedProps = difference(currentProps, updatedProps)
      // console.log({ jsString, updatedProps, props, state, currentProps, changedProps })
      selectedComponent.componentDetail.component.$set(changedProps)
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
  value={PropsObjectPrefix + currentPropsState}
  tsCodeForTypes="{`/** Kitbook TODO: parse component types and enforce here. Currently any key is allowed. */
type Props = {
  [key: string]: any
}`},"
  on_change={handle_change} />
