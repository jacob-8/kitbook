import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    {
      builder: 'mkdist',
      input: './src/virtual/toStringify',
      outDir: './src/virtual/stringified',
      format: 'esm',
      ext: 'js',
      declaration: false,
    },
  ],
  declaration: true,
  externals: [
    '@sveltejs/kit',
    'vite',
  ],
  rollup: {
    emitCJS: true,
  },
})
