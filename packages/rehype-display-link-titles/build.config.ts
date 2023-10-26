import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  // clean: true,
  declaration: true,
  externals: [
    'unified',
    'hast',
  ],
  rollup: {
    emitCJS: true,
  },
})
