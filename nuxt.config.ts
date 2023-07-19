// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@tailvue/nuxt",
    "nuxt-icon",
  ],
  i18n: {
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "zh",
        name: "中文",
        file: "zh.json",
      },
    ],
    lazy: true,
    langDir: "locales",
    defaultLocale: "en",
  },
});
