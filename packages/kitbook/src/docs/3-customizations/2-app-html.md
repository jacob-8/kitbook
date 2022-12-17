# Customizing app.html

Kitbook's `augmentSvelteConfigForKitbook` by default points
- Ensure you have a styles reset loaded in your `app.html` file above `%sveltekit.head%`. Tailwind and many other CSS frameworks include this. If you don't have one yet, you can copy the `kitbook/styles/tw-reset.css` file into your static directory and link to it in your `app.html`, for example: `<link rel="stylesheet" href="%sveltekit.assets%/tw-reset.css">`