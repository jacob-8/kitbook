# Add Vitest

Here's how we added Vitest to Kitbook written here for maintenance reference.

- `pnpm -F kitbook add -D vitest`
- turn on `globals` option and [In-source testing](https://vitest.dev/guide/features.html#in-source-testing) by creating a `vitest.config.ts` file:

```ts twoslash title="vitest.config.ts"
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    includeSource: ['src/**/*.ts'],
  },
});
```

- Acquaint Typescript:

```json title="tsconfig.json" {3-4}
"compilerOptions": {
  "types": [
    "vitest/globals",
    "vitest/importMeta"
  ]
}
```

- Add an inline test
```ts
if (import.meta.vitest) {
  test('capitalize turns bar into Bar', () => {
    expect(capitalize('bar')).toMatchInlineSnapshot(`"Bar"`);
  })
}
```

- For a REPL like experience turn on VSCode autosave and run Vitest in update mode with the `-u` flag to have the inline snapshot update as you type.