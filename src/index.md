<script>
  import { View } from 'svench'
</script>

<svench:options title="Getting started" tree />

# Svelte-Pieces Svench Workbench

_A workbench for Svelte components, in the form of a companion web app, to experiment, develop, and document components and Views quickly._

## What is Svench?

Svench lets you write docs like this page (powered by [mdsvex](https://mdsvex.com/)) and, also, work with your components in views like this one _(click the title to "enter the view")_:

<View
  name="example of a view"
  knobs={{ padding: '-100-100;1', center: true }}
  let:knobs={{ padding, center }}
  let:action
>
  <div style="padding: {padding}px; text-align: {center ? 'center' : 'inherit'};">
    <p>Padding: <code>{padding}</code>
    <br>
    <em>(enter the view and use knobs to change)</em>
    </p>
    <br>
    <p>
      <button style="border: 1px solid black" on:click={action('click')}>Click me to see event in Actions panel</button>
    </p>
  </div>
</View>

Go to http://svench-docs.vercel.app/ to read more extensive docs or look through examples at https://github.com/rixo/svench/tree/main/examples.


## Get Started

Add a `.svench` file to develop and document a copmonent:

`src/Hello.svench`

```svelte
<script>
  import { View } from 'svench'
</script>

<View name="hello">
  <h1>World!</h1>
</View>
```

Or some Markdown (mdsvex):

`src/Hello.md`

```markdown
# Docs

Most often easier to write as you go, when everything is _fresh_ in your head!
```
