import { defineConfig } from 'windicss/helpers';
import colors from 'windicss/colors';
// import forms from 'windicss/plugin/forms';

export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
      },
    },
  },
  plugins: [
    // forms,
  ],
  extract: { // https://github.com/windicss/windicss/issues/179
    extractors: [
      {
        extractor: (content) => {
          return { classes: content.match(/(?<=class:)[!@\w-]+/g) ?? [] };
        },
        extensions: ['svelte', 'svx'],
      },
    ],
  },
});
