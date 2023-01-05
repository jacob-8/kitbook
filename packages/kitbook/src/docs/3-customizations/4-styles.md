# Custom Styles

Kitbook is not yet themeable, but you can add global styles for the sake of your components by adding a root `+layout.svelte` file and importing css files.

```svelte title="routes/+layout.svelte"
<script>
  import './global.css';
</script>
<slot />
```

Kitbook itself uses [UnoCSS](https://github.com/unocss/unocss) but the classes have already been compiled into hashed names so they won't clash with your CSS framework. You can use whatever styles framework you like.

