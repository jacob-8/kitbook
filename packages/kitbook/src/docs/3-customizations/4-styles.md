# Custom Styles

Kitbook is not yet themeable, but you can add global styles to the `.kitbook/WrapRootLayout.svelte` by either using `<style global>...</style>` or by importing a css file in the `script` tag.

Kitbook itself uses [UnoCSS](https://github.com/unocss/unocss) but the classes have already been compiled into hashed names so they won't clash with your CSS framework. You can use whatever styles framework you like.

