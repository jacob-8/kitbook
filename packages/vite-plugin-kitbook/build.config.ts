import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  declaration: true,
  externals: [
    '@sveltejs/kit',
    'vite',
  ],
  rollup: {
    emitCJS: true,
  },
  replace: {
    'import.meta.vitest': 'undefined',
  },
})
