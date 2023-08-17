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
    "dayjs-nuxt",
    "@element-plus/nuxt",
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
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },
});
