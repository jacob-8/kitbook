// @ts-check
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
});
