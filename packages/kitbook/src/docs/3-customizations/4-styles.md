## Add styles that will be used for your components. 
- `<link rel="stylesheet" href="%sveltekit.assets%/tw-reset.css">`
- This could be as simple as importing a css file in your `__layout.svelte` file depending on how you do styles.
- Kitbook's components use [UnoCSS](https://github.com/unocss/unocss) but the classes have already been compiled into hashed names. You can use whatever styles framework you like.

## Add Prism styles
This is baked in, but need to make changeable to [prism](https://prismjs.com/) theme css to `app.html`. `<link href="https://unpkg.com/prismjs@1.27.0/themes/prism-tomorrow.css" rel="stylesheet" />` for example.