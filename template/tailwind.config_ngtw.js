/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    	"./projects/**/*.{html,ts}"
    ],
    theme: {
    	extend: {},
    },
    plugins: [],
    safelist: [{
        pattern: /text-./
    }, {
        pattern: /bg-./
    }, {
        pattern: /w-./
    }, {
        pattern: /h-./
    }, {
        pattern: /border-./
    }]
}