import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  // clean: true,
  declaration: true,
  // externals: [
  //   'unified',
  // ],
  rollup: {
    emitCJS: true,
  },
})
