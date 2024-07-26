export function insert_child_component({ child_name, parent_code }: { child_name: string, parent_code: string }) {
  const script_tag = /<script[^>]*>/
  const child_import = `import ${child_name} from './${child_name}.svelte'`

  if (script_tag.test(parent_code)) {
    const parent_code_with_child_import = parent_code.replace(script_tag, `$&\n  ${child_import}`)

    return `${parent_code_with_child_import}\n<${child_name} />`
  }

  return `<script>
  ${child_import}
</script>
${parent_code}
<${child_name} />
`
}

if (import.meta.vitest) {
  describe(insert_child_component, () => {
    test('works with lang="ts"', () => {
      const parent_code = `<script lang="ts">
  export let data
</script>
<div>Prior content</div>
`

      expect(insert_child_component({ parent_code, child_name: 'Child' })).toMatchInlineSnapshot(`
        "<script lang="ts">
          import Child from './Child.svelte'
          export let data
        </script>
        <div>Prior content</div>

        <Child />"
      `)
    })

    test('vanilla script', () => {
      const parent_code = `<script>
</script>
<div>Prior content</div>
`

      expect(insert_child_component({ parent_code, child_name: 'Child' })).toMatchInlineSnapshot(`
        "<script>
          import Child from './Child.svelte'
        </script>
        <div>Prior content</div>

        <Child />"
      `)
    })

    test('no script', () => {
      const parent_code = `<div>Prior content</div>`

      expect(insert_child_component({ parent_code, child_name: 'Child' })).toMatchInlineSnapshot(`
        "<script>
          import Child from './Child.svelte'
        </script>
        <div>Prior content</div>
        <Child />
        "
      `)
    })
  })
}
