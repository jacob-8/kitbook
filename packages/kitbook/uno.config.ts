import { defineConfig, presetIcons, presetUno } from 'unocss'
// import { colors } from '@unocss/preset-uno';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      prefix: 'i-',
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  // theme: {
    // colors: {
      // primary: colors.blue,
  //   }
  // }
})
