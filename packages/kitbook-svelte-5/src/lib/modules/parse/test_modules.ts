export const components_raw_eager = {
  '/src/lib/components/ErrorBoundary.svelte': 'hi',
  '/src/lib/components/FlakyComponent.svelte': 'flake',
  '/src/lib/routes/[...file]/Helper.svelte': 'should not be route',
  '/src/lib/routes/[...file]/+page.svelte': `<script lang="ts">
  import type { PageData } from './$types.js'

  const { data }: { data: PageData } = $props()
</script>

Routes with all their imports<br />

<pre>{JSON.stringify(data, null, 2)}</pre>

<!-- {#await data.parsed_modules['/src/lib/components/FlakyComponent.svelte'].component.load_component() then Component}
  <Component />
{/await} -->`,
  '/src/lib/routes/sandbox/[...file]/+page.svelte': '<script>\r\n  import ErrorBoundary from \'kitbook/components/ErrorBoundary.svelte\'\r\n  import Foo from \'./Foo.svelte\'\r\n</script>\r\n\r\nI\'m the iframe sandbox.\r\n\r\n<ErrorBoundary>\r\n  {#await import(\'$lib/components/FlakyComponent.svelte\') then { default: FlakyComponent }}\r\n    <FlakyComponent />\r\n  {/await}\r\n</ErrorBoundary>\r\n',
  '/src/lib/routes/sandbox/[...file]/Foo.svelte': 'I am relatively imported.',
}

export const markdown_raw = {
  '/README.md': () => Promise.resolve('# Readme'),
  '/src/index.md': () => Promise.resolve('# Readme'),
  '/src/docs/0-why-kitbook.md': () => Promise.resolve('# Why'),
  '/src/docs/1-get-started.md': () => Promise.resolve(''),
  '/src/docs/1a-you-can-use-letters-to-adjust-ordering.md': () => Promise.resolve(''),
  '/src/docs/my-notes/0-unocss.md': () => Promise.resolve(''),
  '/src/docs/my-notes/1-deploy-to-vercel.md': () => Promise.resolve(''),

  // markdown for components above
  '/src/lib/components/ErrorBoundary.md': () => Promise.resolve(''),
  '/src/lib/routes/[...file]/_page.md': () => Promise.resolve(''),
}

export const compositions_raw = {
  '/src/lib/components/ErrorBoundary.composition': () => Promise.resolve(null), // typical
  '/src/lib/routes/[...file]/_page.composition': () => Promise.resolve(null), // ensures that _ is converted to plus and matches up to page
  '/src/lib/routes/[...file]/_page.another.composition': () => Promise.resolve(null), // named composition
  '/src/lib/a/F.composition': () => Promise.resolve(null), // compositions by themselves will be included, ready to be referenced by docs modules
}

export const stories_raw = {
  '/src/lib/components/ErrorBoundary.stories.ts': () => Promise.resolve(null), // typical
  '/src/lib/routes/[...file]/_page.stories.ts': () => Promise.resolve(null), // ensures that _ is converted to plus and matches up to page
  '/src/lib/ignored_because_no_matching_component.stories.ts': () => Promise.resolve(null), // ignored
}
