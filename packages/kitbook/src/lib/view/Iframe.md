TODO: Make large desktop views smaller to be able to more quickly digest and then expand on click to focused view.

```css
.container {
  width: 100px;
  height: 100px;
  position: relative;
}

.iframe {
  position: absolute;
  width: 200%;
  height: 200%;
  top: 0; 
  /* or top: 50% */
  left: 0;
  /* or left: 50% */
  transform: scale(0.5);
  /* transform: translate(-50% -50%) scale(0.5); */
  transform-origin: top left;
}
```

Also can look into auto iframe resizing http://davidjbradshaw.github.io/iframe-resizer/ or just a simple inspect the size of the iframe's content on window or iframe resize