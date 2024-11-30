// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  i18n: {
    vueI18n: './i18n.config.ts', // if you are using custom path, default
  },
  css: ['~/assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
  },

  // For some reason, this is needed to avoid tailwindcss error
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

  runtimeConfig: {
    public: {
      grecaptcha: {
        siteKey: process.env.RECAPTCHA_SITEKEY,
      },
    },
  },

  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
});
