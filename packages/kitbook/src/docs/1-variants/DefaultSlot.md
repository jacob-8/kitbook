It would be great to support dynamic slots for variants, but it would be error-prone until Svelte officially supports that. However, we can support an optional default slot of a string (you can pass html) or a component as seen in the variants below.

Possible dynamic slot options to research further: 
- https://github.com/sveltejs/svelte/issues/2588 
- https://github.com/sveltejs/svelte/pull/4296
- Playwright does [this](https://github.com/microsoft/playwright/blob/d92fe16b76272afb19e7af5a2496f7efce45441d/packages/playwright-ct-svelte/registerSource.mjs#L82)
