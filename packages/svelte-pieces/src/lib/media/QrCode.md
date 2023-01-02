<script lang="ts">
  import { Story } from 'kitbook';
  import QrCode from '$lib/media/QrCode.svelte';
  //https://livingdictionaries.app/akateko/entry/f8sRcwKS4nGeFjARVOW7
</script>

<!-- prettier-ignore -->
# QrCode

- Use SVG so works both server and client side
- QRCode generator from https://www.nayuki.io/page/qr-code-generator-library because it's written in Typescript and includes great comments

<Story knobs={{ value: 'kitbook.vercel.app', pixelsPerModule: 4 }} let:knobs={{ value, pixelsPerModule }}>
  <QrCode {value} {pixelsPerModule} errorCorrection="high" />
</Story>

<!-- prettier-ignore -->
## Learn More

To learn more about QR Codes have a full read through of [Nayuki's page](https://www.nayuki.io/page/qr-code-generator-library), as well as https://www.quora.com/Why-does-putting-a-logo-on-a-QR-code-not-interfere-in-the-final-result

## Other QRCode Packages of note

- https://www.npmjs.com/package/qrcode as used in https://github.com/danawoodman/qrcontact
- https://www.npmjs.com/package/qr.js
- https://github.com/davidshimjs/qrcodejs demoed in https://svelte.dev/repl/88b414327b474319893660a7f4586893?version=3.14.1

## Other Framework Implementations

These are much more complicated and allow for using canvas as well (which doesn't work for SSR of course).

- [Vue QrCode](https://github.com/scopewu/qrcode.vue/blob/main/src/index.ts)
- [React QrCode](https://github.com/zpao/qrcode.react/blob/trunk/src/index.tsx)
