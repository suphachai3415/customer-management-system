import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "Noto Sans Thai", "sans-serif"], // ✅ แก้ตรงนี้
                heading: ["Poppins", "Prompt", "sans-serif"], // ✅ ใช้ได้กับ heading
            },
        },
    },

    plugins: [forms],
};
