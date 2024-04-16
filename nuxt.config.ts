// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
    devtools: { enabled: false },
    modules: ["@nuxt/ui"],
    plugins: ["~/plugins/axios.js"],
    css: ["animate.css", "~/assets/css/tailwind.css", "~/assets/css/style.css"],
    colorMode: {
        preference: "light",
    },
});
