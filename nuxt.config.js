import generateRoutes from './plugins/generateRoutes'
require('dotenv').config()

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'HIIT Generator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://sdk.userbase.com/2/userbase.js' },
      { src: 'https://js.stripe.com/v3/' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/styles/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/sounds.js',
    '~/plugins/request.js',
    '~/plugins/markdown.js',
    '~/plugins/noSleep.client.js',
    '~/plugins/userbase.client.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    // '@nuxtjs/bulma',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },

  env: {
    DATOCMS_TOKEN: process.env.DATOCMS_TOKEN,
    DATOCMS_GRAPHQL: process.env.DATOCMS_GRAPHQL,
    USERBASE_TOKEN: process.env.USERBASE_TOKEN
  },

  router: {
    middleware: 'menu'
  },

  generate: {
    routes: generateRoutes
  },

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },

    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
