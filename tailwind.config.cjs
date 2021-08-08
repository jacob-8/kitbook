const colors = require('tailwindcss/colors');

const config = {
    mode: 'jit',
    purge: [
        "./src/**/*.{html,svelte,ts}",
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.blue,
                orange: colors.orange,
            },
        }
    },
    // Needed?
    variants: {
        extend: {
            transformOrigin: ['direction'],
            inset: ['direction'],
            padding: ['direction'],
            margin: ['direction'],
            borderRadius: ['direction'],
            translate: ['direction'],
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('tailwindcss-dir')(), //https://github.com/RonMelkhior/tailwindcss-dir
    ],
};

module.exports = config;
