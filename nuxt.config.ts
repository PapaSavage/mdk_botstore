// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
    devtools: { enabled: false },
    modules: ["@nuxt/ui", "@nuxtjs/google-fonts", "@pinia/nuxt", "nuxt-vuefire"],
    plugins: ["~/plugins/axios.js"],
    css: ["animate.css", "~/assets/css/tailwind.css", "~/assets/css/style.css"],
    colorMode: {
        preference: "light",
    },
    googleFonts: {
        families: {
            Roboto: true,
            'Josefin+Sans': true,
            Lato: [100, 300],
            Raleway: {
                wght: [100, 400],
                ital: [100]
            },
            Inter: '200..700',
            'Crimson Pro': {
                wght: '200..900',
                ital: '200..700',
            },
            "Golos Text": true,
        }
    },
    vuefire: {
        auth: { enabled: true, sessionCookie: true },
        config: { 
            apiKey: "AIzaSyAb-bQl49JoOqLVBFupnN1VDijWtuRKBiM",
            authDomain: "mdk-site-df4de.firebaseapp.com",
            projectId: "mdk-site-df4de",
            storageBucket: "mdk-site-df4de.appspot.com",
            messagingSenderId: "355269898707",
            appId: "1:355269898707:web:f0803d1381a7b58417ff26",
        },
    },
});