// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  i18n: {
    vueI18n: './i18n.config.ts', // if you are using custom path, default
  },
  css: ['~/assets/scss/main.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],

  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },

  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in', // default
    },
    layoutTransition: {
      name: 'fade',
      mode: 'out-in', // default
    },
  },
});
