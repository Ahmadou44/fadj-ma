/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                medical: {
                    50: '#f0fdf4',
                    500: '#22c55e',
                    600: '#16a34a',
                },
            }
        },
    },
    plugins: [],
}
