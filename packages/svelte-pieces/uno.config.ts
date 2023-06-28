import { defineConfig, presetIcons, presetUno } from 'unocss'
// TODO: add primary: colors.blue,

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
})
