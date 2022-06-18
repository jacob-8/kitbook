# Add Vitest

**Here's how we added Vitest to Kitbook. This is only for maintenance reference, but you can also implement in your repo if desired.**

- `pnpm --filter=kitbook add -D vitest`
- turn on `globals` option and [In-source testing](https://vitest.dev/guide/features.html#in-source-testing) by creating a `vitest.config.ts` file:
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    includeSource: ['src/**/*.ts'],
  },
});
```
- strip out in-source tests on build by adding `define: { 'import.meta.vitest': false, }` to `config.kit.vite` in `svelte.config.js`.

- Acquaint Typescript:
```json
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
  test('foo(bar) returns...', () => {
    expect(foo(bar)).toMatchInlineSnapshot();
  })
}
```

- Turn on VSCode autosave and run Vitest in update mode with the `-u` flag to have the inline snapshot update as you type.