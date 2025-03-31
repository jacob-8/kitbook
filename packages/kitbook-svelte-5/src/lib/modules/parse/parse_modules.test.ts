import { parse_modules } from './parse_modules.js'
import { components_raw_eager, compositions_raw, markdown_raw, stories_raw } from './test_modules.js'

test(parse_modules, () => {
  expect(parse_modules({ components_raw_eager, stories_raw, compositions_raw, markdown_raw, settings: { routes_directory: 'src/lib/routes', alias: { kitbook: 'src/lib' } } })).toMatchFileSnapshot('./parse_modules.snap')
})
