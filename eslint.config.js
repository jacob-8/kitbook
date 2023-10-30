// @ts-check
import antfu, { typescript } from '@antfu/eslint-config'
import { svelte } from './lint/svelte.js'

export default antfu(
  {
    vue: false,
    // typescript: false,
  },
  ...typescript({
    componentExts: ['svelte', 'composition'],
    overrides: {
      //
    },
  }),
  // @ts-ignore
  svelte,
  {
    ignores: [
      'examples/**',
      '**/.svelte-kit**',
      '**/package/**',
      '**/src/routes/kitbook/**',
      '**/src/lib/routes/+layout.ts',
    ],
  },
  {
    rules: {
      'jsdoc/require-property-description': 'off',
      'jsdoc/require-returns-description': 'off',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-alert': 'off',
    },
  },
)

// '@typescript-eslint/no-var-requires': 'off',
// '@typescript-eslint/no-unused-vars': 'off',
// '@typescript-eslint/no-empty-function': 'off',
// '@typescript-eslint/no-explicit-any': 'off',
// '@typescript-eslint/explicit-module-boundary-types': 'off',
// '@typescript-eslint/ban-ts-comment': 'off',
// 'no-undef': 'off',
// 'a11y-click-events-have-key-events': 'off',
