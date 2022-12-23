# Custom Styles

## Add global styles that will be used for your components. 
- This could be as simple as importing a css file in your `__layout.svelte` file depending on how you do styles.
- Kitbook's components use [UnoCSS](https://github.com/unocss/unocss) but the classes have already been compiled into hashed names. You can use whatever styles framework you like.

## Use your own reset.css
- `<link rel="stylesheet" href="%sveltekit.assets%/tw-reset.css">`
