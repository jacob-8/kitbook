# Custom Styles

Kitbook is not yet themeable, but you can add global styles to the `src/routes/kitbook/+layout.svelte` by importing a css file in the `script` tag.

Kitbook itself uses [UnoCSS](https://unocss.dev) but the classes have already been compiled into hashed names using it's [svelte-scoped](https://unocss.dev/integrations/svelte-scoped) mode so they won't clash with your CSS framework. You can use whatever styles framework you like.

