import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  declaration: true,
  externals: [
    'unified',
  ],
  rollup: {
    emitCJS: true,
  },
})
