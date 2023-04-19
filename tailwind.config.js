const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                robotocondensed: ['Roboto Condensed', 'sans-serif'],
                sofiacondensed: ['Sofia Sans Extra Condensed', 'sans-serif'],
                stincondensed: ['Stint Ultra Condensed', 'cursive']
            },
            colors: {
                'turquoise': {
                    // light: '',
                    DEFAULT: '#04ddb4',
                    // dark: '',
                },
                'blueNavy': {
                    DEFAULT: '#0d2758',
                    dark: '#182237'
                }
            },
        },

    },

    plugins: [require('@tailwindcss/forms')],
};
