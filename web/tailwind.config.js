/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                medical: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    500: '#22c55e',
                    600: '#16a34a',
                    900: '#14532d',
                    primary: '#0ea5e9',
                    secondary: '#06b6d4',
                    accent: '#10b981',
                }
            }
        },
    },
    plugins: [],
}
