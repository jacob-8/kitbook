const colors = require('tailwindcss/colors');

const config = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                primary: colors.blue,
                green: colors.emerald, // can find-replace these to remove
            },
        }
    },
    plugins: [
        // require('@tailwindcss/forms'),
        // require('@tailwindcss/typography'),
        // require('tailwindcss-dir')(), //https://github.com/RonMelkhior/tailwindcss-dir
    ],
};

module.exports = config;
