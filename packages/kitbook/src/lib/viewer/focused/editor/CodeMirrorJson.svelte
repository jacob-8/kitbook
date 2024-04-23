<script lang="ts">
  import { EditorView, basicSetup } from 'codemirror'
  // import { json } from '@codemirror/lang-json' // file kept for historical reasons but will probably not use. This package is not installed. If wanting to use, get the highlighter, parser, and css code from https://codesandbox.io/p/sandbox/codemirror-6-demo-forked-w1dehh
  import { onMount } from 'svelte'
  import { vsCodeDarkPlus } from './vs-code-dark-plus-theme'

  export let on_change: (value: string) => void
  export let value: string

  let container: HTMLDivElement
  let view: EditorView
  let valueEdited = false

  onMount(() => {
    createEditor()
    return () => view?.destroy()
  })

  function createEditor() {
    view = new EditorView({
      doc: '',
      extensions: [
        basicSetup,
        // json(),
        vsCodeDarkPlus,
      ],
      parent: container,
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
