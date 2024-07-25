import type { GroupedPageMap, MarkdownModule, VariantsModule } from 'kitbook'
import type { SvelteComponent } from 'svelte'

const markdownModuleImport = (() => {}) as () => Promise<MarkdownModule>
const componentModuleImport = null as () => Promise<{ default: typeof SvelteComponent }>
const variantModuleImport = null as () => Promise<VariantsModule>
const stringImport = (() => {}) as () => Promise<string>

export const pages: GroupedPageMap = {
  '/README': {
    extensions: [
      'md',
    ],
    loadMarkdown: {
      loadModule: markdownModuleImport,
      loadRaw: stringImport,
    },
    name: 'README',
    path: '/README.md',
    url: '/README',
  },
  '/docs/0-why-kitbook': {
    extensions: [
      'md',
    ],
    loadMarkdown: {
      loadModule: markdownModuleImport,
      loadRaw: stringImport,
    },
    name: 'why kitbook',
    path: '/src/docs/0-why-kitbook.md',
    url: '/docs/0-why-kitbook',
  },
  '/docs/1-get-started': {
    extensions: [
      'md',
    ],
    loadMarkdown: {
      loadModule: markdownModuleImport,
      loadRaw: stringImport,
    },
    name: 'get started',
    path: '/src/docs/1-get-started.md',
    url: '/docs/1-get-started',
  },
  '/docs/1a-you-can-use-letters-to-adjust-ordering': {
    extensions: [
      'md',
    ],
    loadMarkdown: {
      loadModule: markdownModuleImport,
      loadRaw: stringImport,
    },
    name: 'you can use letters to adjust ordering',
    path: '/src/docs/1a-you-can-use-letters-to-adjust-ordering.md',
    url: '/docs/1a-you-can-use-letters-to-adjust-ordering',
  },
  '/docs/my-notes/0-unocss': {
    extensions: [
      'md',
    ],
    loadMarkdown: {
      loadModule: markdownModuleImport,
      loadRaw: stringImport,
    },
    name: 'unocss',
    path: '/src/docs/my-notes/0-unocss.md',
    url: '/docs/my-notes/0-unocss',
  },
  '/docs/my-notes/1-deploy-to-vercel': {
    extensions: [
      'md',
    ],
    loadMarkdown: {
      loadModule: markdownModuleImport,
      loadRaw: stringImport,
    },
    name: 'deploy to vercel',
    path: '/src/docs/my-notes/1-deploy-to-vercel.md',
    url: '/docs/my-notes/1-deploy-to-vercel',
  },
  '/index': {
    extensions: [
      'md',
    ],
    loadMarkdown: {
      loadModule: markdownModuleImport,
      loadRaw: stringImport,
    },
    name: 'index',
    path: '/src/index.md',
    url: '/index',
  },
  '/lib/A': {
    extensions: [
      'svelte',
    ],
    loadComponent: {
      loadModule: componentModuleImport,
      loadRaw: stringImport,
    },
    name: 'A',
    path: '/src/lib/A.svelte',
    url: '/lib/A',
  },
  '/lib/B': {
    extensions: [
      'svelte',
      'md',
    ],
    loadComponent: {
      loadModule: componentModuleImport,
      loadRaw: stringImport,
    },
    loadMarkdown: {
      loadModule: markdownModuleImport,
      loadRaw: stringImport,
    },
    name: 'B',
    path: '/src/lib/B.svelte',
    url: '/lib/B',
  },
  '/lib/E': {
    extensions: [
      'md',
    ],
    loadMarkdown: {
      loadModule: markdownModuleImport,
      loadRaw: stringImport,
    },
    name: 'E',
    path: '/src/lib/E.md',
    url: '/lib/E',
  },
  '/lib/a/C': {
    extensions: [
      'svelte',
      'variants.ts',
    ],
    loadComponent: {
      loadModule: componentModuleImport,
      loadRaw: stringImport,
    },
    loadVariants: {
      loadModule: variantModuleImport,
      loadRaw: stringImport,
    },
    name: 'C',
    path: '/src/lib/a/C.svelte',
    url: '/lib/a/C',
  },
  '/lib/a/D': {
    extensions: [
      'svelte',
      'md',
      'variants.ts',
      'composition',
      'first.composition',
      'second.composition',
    ],
    loadComponent: {
      loadModule: componentModuleImport,
      loadRaw: stringImport,
    },
    loadCompositions: {
      default: {
        loadModule: componentModuleImport,
        loadRaw: stringImport,
      },
      first: {
        loadModule: componentModuleImport,
        loadRaw: stringImport,
      },
      second: {
        loadModule: componentModuleImport,
        loadRaw: stringImport,
      },
    },
    loadMarkdown: {
      loadModule: markdownModuleImport,
      loadRaw: stringImport,
    },
    loadVariants: {
      loadModule: variantModuleImport,
      loadRaw: stringImport,
    },
    name: 'D',
    path: '/src/lib/a/D.svelte',
    url: '/lib/a/D',
  },
  '/lib/a/F': {
    extensions: [
      'composition',
    ],
    loadCompositions: {
      default: {
        loadModule: componentModuleImport,
        loadRaw: stringImport,
      },
    },
    name: 'F',
    path: '/src/lib/a/F.composition',
    url: '/lib/a/F',
  },
  '/routes/+layout': {
    extensions: [
      'svelte',
    ],
    loadComponent: {
      loadModule: componentModuleImport,
      loadRaw: stringImport,
    },
    name: '+layout',
    path: '/src/routes/+layout.svelte',
    url: '/routes/+layout',
  },
  '/routes/+page': {
    extensions: [
      'svelte',
    ],
    loadComponent: {
      loadModule: componentModuleImport,
      loadRaw: stringImport,
    },
    name: '+page',
    path: '/src/routes/+page.svelte',
    url: '/routes/+page',
  },
  '/routes/a/+layout': {
    extensions: [
      'svelte',
      'md',
    ],
    loadComponent: {
      loadModule: componentModuleImport,
      loadRaw: stringImport,
    },
    loadMarkdown: {
      loadModule: markdownModuleImport,
      loadRaw: stringImport,
    },
    name: '+layout',
    path: '/src/routes/a/+layout.svelte',
    url: '/routes/a/+layout',
  },
  '/routes/a/+page': {
    extensions: [
      'svelte',
      'md',
    ],
    loadComponent: {
      loadModule: componentModuleImport,
      loadRaw: stringImport,
    },
    loadMarkdown: {
      loadModule: markdownModuleImport,
      loadRaw: stringImport,
    },
    name: '+page',
    path: '/src/routes/a/+page.svelte',
    url: '/routes/a/+page',
  },
  '/routes/b/+layout': {
    extensions: [
      'svelte',
      'variants.ts',
    ],
    loadComponent: {
      loadModule: componentModuleImport,
      loadRaw: stringImport,
    },
    loadVariants: {
      loadModule: variantModuleImport,
      loadRaw: stringImport,
    },
    name: '+layout',
    path: '/src/routes/b/+layout.svelte',
    url: '/routes/b/+layout',
  },
  '/routes/b/+page': {
    extensions: [
      'svelte',
      'variants.ts',
    ],
    loadComponent: {
      loadModule: componentModuleImport,
      loadRaw: stringImport,
    },
    loadVariants: {
      loadModule: variantModuleImport,
      loadRaw: stringImport,
    },
    name: '+page',
    path: '/src/routes/b/+page.svelte',
    url: '/routes/b/+page',
  },
  '/routes/c/+layout': {
    extensions: [
      'svelte',
      'md',
      'variants.ts',
    ],
    loadComponent: {
      loadModule: componentModuleImport,
      loadRaw: stringImport,
    },
    loadMarkdown: {
      loadModule: markdownModuleImport,
      loadRaw: stringImport,
    },
    loadVariants: {
      loadModule: variantModuleImport,
      loadRaw: stringImport,
    },
    name: '+layout',
    path: '/src/routes/c/+layout.svelte',
    url: '/routes/c/+layout',
  },
  '/routes/c/+page': {
    extensions: [
      'svelte',
      'md',
      'variants.ts',
    ],
    loadComponent: {
      loadModule: componentModuleImport,
      loadRaw: stringImport,
    },
    loadMarkdown: {
      loadModule: markdownModuleImport,
      loadRaw: stringImport,
    },
    loadVariants: {
      loadModule: variantModuleImport,
      loadRaw: stringImport,
    },
    name: '+page',
    path: '/src/routes/c/+page.svelte',
    url: '/routes/c/+page',
  },
}
