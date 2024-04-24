<script lang="ts">
  import { EditorView, basicSetup } from 'codemirror'
  import { javascript } from '@codemirror/lang-javascript'
  import { onMount } from 'svelte'
  import ts, { type CompilerOptions } from 'typescript'
  import { createDefaultMapFromCDN, createSystem, createVirtualTypeScriptEnvironment } from '@typescript/vfs'
  import { autocompletion } from '@codemirror/autocomplete'
  import { keymap } from '@codemirror/view'
  import { indentWithTab } from '@codemirror/commands'
  import { vsCodeDarkPlus } from './vs-code-dark-plus-theme'
  import { createOrUpdateFile, tsSync } from './ts/sync'
  import { tsLinter } from './ts/linter'
  import type { TypeScriptConfig } from './ts/types'
  import { tsHover } from './ts/hover'
  import { tsAutocomplete } from './ts/autocomplete'

  export let on_change: (value: string) => void
  export let value: string
  export let path = 'index.ts'
  export let tsCodeForTypes = ''

  let container: HTMLDivElement
  let view: EditorView
  let valueEdited = false

  onMount(() => {
    createEditor()
    return () => view?.destroy()
  })

  async function createEditor() {
    const compilerOptions: CompilerOptions
      = {
        target: ts.ScriptTarget.ES2022,
        noImplicitAny: false,

      }
    const fsMap = await createDefaultMapFromCDN(
      compilerOptions,
      ts.version,
      true, // cache in localStorage
      ts,
    )
    const system = createSystem(fsMap)
    const env = createVirtualTypeScriptEnvironment(system, [], ts, compilerOptions)
    const config: TypeScriptConfig = { env, path }

    createOrUpdateFile({ env, path: 'types.ts' }, tsCodeForTypes) // update this file to import Svelte types

    view = new EditorView({
      parent: container,
      doc: '',
      extensions: [
        basicSetup,
        keymap.of([indentWithTab]),
        vsCodeDarkPlus,
        javascript({ typescript: true }),
        tsSync(config),
        tsLinter(config),
        autocompletion({ override: [tsAutocomplete({ env, path })] }),
        tsHover(config),
      ],
      dispatchTransactions(transactions) {
        view.update(transactions)
        const [transaction] = transactions.toReversed() // get last transaction
        if (!transaction.docChanged)
          return
        const newValue = transaction.newDoc.toString()
        if (newValue !== value)
          valueEdited = true
        if (valueEdited)
          on_change(newValue)
      },
    })
  }

  $: if (view)
    setValueReceivedFromProp(value)

  function setValueReceivedFromProp(newValue: string) {
    valueEdited = false
    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: newValue,
      },
    })
  }
</script>

<div id="codemirror" class="contents" bind:this={container}></div>

<style>
  :global(.cm-editor) {
    height: 100%;
  }

  @media only screen {
  :global(#codemirror ::-webkit-scrollbar) {
    width: .5rem;
    height: .7rem;
  }

  :global(#codemirror ::-webkit-scrollbar-track) {
    background: 0 0;
  }

  :global(#codemirror ::-webkit-scrollbar-thumb) {
    background: hsl(240, 1%, 45%);
    border-radius: 1rem;
  }

  :global(#codemirror ::-webkit-scrollbar-thumb:hover) {
    background: hsl(240, 9%, 71%);
  }
}
</style>
