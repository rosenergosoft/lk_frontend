export default {
  generate: {
    dir: 'dist/' + process.env.APP_CLIENT || 'default'
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Личный кабинет',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  styleResources: {
    scss: [
      '@/theme/_mixins/*.scss',
      '@/theme/_vars/*.scss'
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/theme/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/v-mask.js',
    '~/plugins/nuxt-dadata.js',
    '~/plugins/vue-autosuggest.js',
    '~/plugins/globalMixin.js',
    '@plugins/vuetify',
    { src: '~/plugins/vue-quill-editor.js', mode: 'client' },
    { src: '~/plugins/cryptopro.js', mode: 'client' },
    { src: '~/plugins/vue-datepicker.js', mode: 'client' },
    { src: '~/plugins/v-viewer.js', mode: 'client' },
    { src: '~/plugins/v-tooltip.js', mode: 'client' },
    { src: '~/plugins/notifications-ssr', ssr: true },
    { src: '~/plugins/notifications-client', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next', // реализуем авторизацию JWT
    'cookie-universal-nuxt', // работа с печеньками
    ['@nuxtjs/moment', { locales: ['ru'], defaultLocale: 'ru' }], // работа с датой / временем
    '@nuxtjs/toast', // а это in-app пуши
    '@nuxtjs/style-resources',
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '85992516',
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  auth: {
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: process.env.LARAVEL_API_BASE_URL,
        token: {
          property: 'access_token',
          maxAge: 60 * 60 * 24
        },
        refreshToken: {
          maxAge: 20160 * 60
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: {
      ignoreOrder: false
    },
    babel: {
      compact: true
    }
  },
  router: {
    middleware: ['auth']
  },
  env: {
    LARAVEL_API_BASE_URL: process.env.LARAVEL_API_BASE_URL,
    VUE_APP_DEMO_HOST: process.env.VUE_APP_DEMO_HOST
  }
}
