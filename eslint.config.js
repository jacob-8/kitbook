// To run automatically on commit, add `simple-git-hooks` and `lint-staged` then run `npx simple-git-hooks` once. After that all commits will be linted.

// @ts-check
import { antfu } from '@antfu/eslint-config'
import jsEslintPlugin from '@eslint/js'
import tsEslintPlugin from '@typescript-eslint/eslint-plugin'
import svelteStylistic from 'eslint-plugin-svelte-stylistic'

// https://github.com/antfu/eslint-config
// Inspect: npx @eslint/config-inspector
export default antfu(
  {
    ignores: [
      '**/.svelte-kit**',
      '**/package/**',
      '.eslintcache',
    ],
    stylistic: {
      overrides: {
        'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      },
    },
    svelte: true,
  },
  {
    rules: {
      'jsdoc/require-property-description': 'off',
      'jsdoc/require-returns-description': 'off',
    },
  },
  {
    name: 'jacob/svelte/stylistic',
    files: ['**/*.svelte', '**/*.composition'],
    plugins: {
      'svelte-stylistic': svelteStylistic,
    },
    rules: {
      'svelte-stylistic/brackets-same-line': 'error',
      'svelte-stylistic/consistent-attribute-lines': 'error',
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      'test/consistent-test-it': ['error', { fn: 'test', withinDescribe: 'test' }],
      'test/no-commented-out-tests': 'error',
      'test/no-disabled-tests': 'error',
      'test/consistent-test-filename': 'error',
      'test/expect-expect': 'error',
      'test/no-alias-methods': 'error',
      'test/no-conditional-expect': 'error',
      'test/no-conditional-in-test': 'error',
      'test/no-conditional-tests': 'error',
      'test/no-duplicate-hooks': 'error',
      'test/no-focused-tests': 'error',
      'test/no-standalone-expect': 'error',
      'test/no-test-return-statement': 'error',
      'test/prefer-comparison-matcher': 'error',
      'test/prefer-hooks-on-top': 'error',
      'test/prefer-spy-on': 'error',
      'test/prefer-to-be-falsy': 'error',
      'test/prefer-to-be-truthy': 'error',
      'test/prefer-to-contain': 'error',
      'test/prefer-to-have-length': 'error',
      'test/valid-describe-callback': 'error',
      'test/valid-expect': 'error',
    },
  },
  {
    name: 'jacob/settings',
    files: ['.vscode/*.json'],
    rules: {
      'jsonc/comma-dangle': ['error', 'always-multiline'],
    },
  },
).overrides({
  'antfu/typescript/rules': {
    files: ['**/*.svelte', '**/*.composition'],
    rules: {
      // Need to check if duplicates in these
      ...jsEslintPlugin.configs.recommended.rules,
      // ...tsEslintPlugin.configs.recommended.rules, // cause the rest to break
      ...tsEslintPlugin.configs.stylistic.rules,

      'prefer-destructuring': 'error',
      'no-constant-binary-expression': 'error',
      'ts/default-param-last': 'error',
      'require-await': 'error',
      'prefer-object-spread': 'error',
      'no-useless-concat': 'error',
      'no-else-return': 'error',
      'no-console': ['error', { allow: ['warn', 'error', 'info', 'time', 'timeEnd'] }],
      'require-atomic-updates': 'error',
      'style/quotes': ['error', 'single', {
        allowTemplateLiterals: true,
        avoidEscape: true,
      }],
      'ts/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        // vars: 'all', // is this helpful?
        varsIgnorePattern: '^\\$\\$Props$',
      }],

      'ts/no-explicit-any': 'warn',
      'prefer-named-capture-group': 'warn',
      'eqeqeq': 'warn',

      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-alert': 'off',
      'ts/ban-ts-comment': 'off',
      'ts/sort-type-constituents': 'off', // prefer logical rather than alphabetical sorting
      'curly': 'off',
      'antfu/if-newline': 'off',
      'node/prefer-global/process': 'off',
    },
  },
  'antfu/svelte/rules': {
    files: ['**/*.composition'],
    rules: {
      'svelte/valid-compile': ['error', { ignoreWarnings: true }], // throws error on a11y issues
      'svelte/no-dom-manipulating': 'error',
      'svelte/no-store-async': 'error', // causes issues with auto-unsubscribing features
      'svelte/require-store-reactive-access': 'error',
      'svelte/require-event-dispatcher-types': 'error',
      'svelte/button-has-type': 'error',
      'svelte/no-extra-reactive-curlies': 'error',
      'svelte/mustache-spacing': 'error',
      'svelte/html-closing-bracket-spacing': 'error',
      'svelte/no-reactive-reassign': ['warn', { props: false }],

      'svelte/html-quotes': 'off', // should it enforce double quotes?
      'svelte/no-at-html-tags': 'off',
      'no-unused-expressions': 'off',
      'no-inner-declarations': 'off',
      'style/space-infix-ops': 'off',
      'no-undef-init': 'off',
      'no-self-assign': 'off',
    },
  },
})
