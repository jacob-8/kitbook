# Set Kitbook Index

By default Kitbook will display your project's README.md file as it's home/index page if you don't have a `src/docs/index.{md|svx}` file already. However to allow serving files from one level up to the project root you must add the following to your Vite config:<br />

```js
const config = {
  ...
  server: {
    fs: {
      allow: ['..']
    }
  },
};
```