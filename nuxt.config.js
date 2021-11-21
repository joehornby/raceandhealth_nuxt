import dotenv from "dotenv";
dotenv.config();

const contentful = require("contentful");
const client = contentful.createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN
});

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "static",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  loading: { color: "#232424" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    "~/plugins/contentful", 
    "~/plugins/pages", 
    "~/plugins/vision", 
    "~/plugins/resources", 
    "~/plugins/events",
    "~/plugins/quarterly"
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/netlify-files',
  ],
  netlifyFiles: {
    netlifyToml: {
      redirects: [
        {
          from: 'https://raceandhealth.netlify.app',
          to: 'https://raceandhealth.org',
          force: true,
          status: 301
        },
        {
          from: 'https://raceandhealth.netlify.app/*',
          to: 'https://raceandhealth.org/:splat',
          force: true,
          status: 301
        }
      ]
    }
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    "@nuxtjs/markdownit",
    "nuxt-mq"
  ],
  styleResources: {
    scss: ["@/assets/scss/abstracts/_variables.scss"]
  },
  markdownit: {
    injected: true
  },
  'mq': {
    defaultBreakpoint: 'sm',
    breakpoints: {
      sm: 450,
      md: 1250,
      lg: Infinity,
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, ctx) {
      config.node = {
        fs: "empty"
      };
    }
  },
  generate: {
    fallback: true
  },
  env: {
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_HOME_PAGE_ID: process.env.CTF_HOME_PAGE_ID,
    CTF_RESOURCES_TYPE_ID: process.env.CTF_RESOURCES_TYPE_ID,
    CTF_EVENTS_TYPE_ID: process.env.CTF_EVENTS_TYPE_ID,
    CTF_QUARTERLY_TYPE_ID: process.env.CTF_QUARTERLY_TYPE_ID,
    CTF_PAGE_TYPE_ID: process.env.CTF_PAGE_TYPE_ID,
    CTF_OURVISION_TYPE_ID: process.env.CTF_OURVISION_TYPE_ID
  }
};
