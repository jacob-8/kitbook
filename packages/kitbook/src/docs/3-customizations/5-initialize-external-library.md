# Initialize external library

If you need to init a library, `i18n` for example, before your components can be displayed, you can do such by passing an `initFunction` in Kitbook's root `+layout.js` file. For example:

```ts title="src/kibook/+layout.ts" {2, 5-10}
import { layoutLoad } from 'kitbook';
export const load = layoutLoad({ initFunction })

import { init, getLocaleFromNavigator } from 'svelte-i18n';
async function initFunction(): Promise<void> {
  await init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
  });
}
```