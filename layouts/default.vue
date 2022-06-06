<template>
  <div class="body">
    <HeaderTwoLogo v-if="isHome" />
    <Header v-else />
    <Sidebar />
    <Nuxt id="content" />
    <Graphics />
    <Footer />
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      windowWidth: null
    }
  },
  computed: {
    isHome() {
      return this.$route.path == "/"
    },
    ...mapGetters({ 
      isSidebar: "nav/getSidebarState"
      })
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
    },
    ...mapMutations({ 
      toggleSidebar: "nav/toggleSidebar"
    })
  },
  watch: {
    $route() {
      if (process.client && this.isSidebar && this.windowWidth < 720) {
        this.toggleSidebar()
      }
    },
    windowWidth() {
      if (this.isSidebar && this.windowWidth > 1024) {
        this.toggleSidebar()
      }
    }
  },
  mounted() {
    this.$nextTick( () => {
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  head: {
    script: [
      {
        src: 'https://kit.fontawesome.com/46fe3ff0d6.js',
        crossorigin: 'anonymous',
      },
      {
        src: 'https://static.getclicky.com/101368121.js',
        body: true,
      },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png?v=Gvbol0XPdL',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png?v=Gvbol0XPdL',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png?v=Gvbol0XPdL',
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest?v=Gvbol0XPdL',
      },
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg?v=Gvbol0XPdL',
        color: '#f26b5b',
      },
      {
        rel: 'shortcut icon',
        href: '/favicon.ico?v=Gvbol0XPdL',
      },
    ],
    meta: [
      {
        name: 'title',
        content: 'Race & Health  |  Equitable health for all',
      },
      {
        name: 'description',
        content:
          'Discrimination is a fundamental and powerful determinant of health. Race & Health is a collective of academics, artists, activists, policy makers, grassroots organisations and individuals. We are creating a catalyst to achieve equitable health for all.',
      },
      {
        name: 'author',
        content: 'Race and Health',
      },
      {
        name: 'keywords',
        content:
          'racism, discrimination, xenophobia, health, race and health, race & health, lancet',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'Race & Health',
      },
      {
        name: 'application-name',
        content: 'Race & Health',
      },
      {
        name: 'msapplication-TileColor',
        content: '#f26b5b',
      },
      {
        name: 'msapplication-TileImage',
        content: '/mstile-144x144.png?v=Gvbol0XPdL',
      },
      {
        name: 'theme-color',
        content: '#f26b5b',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:site',
        content: '@raceandhealth',
      },
      {
        property: 'og:url',
        content: 'https://raceandhealth.org',
      },
      {
        property: 'og:title',
        content: 'Race & Health',
      },
      {
        property: 'og:description',
        content:
          'Discrimination is a fundamental and powerful determinant of health. Race & Health are creating a catalyst to achieve equitable health for all.',
      },
      {
        property: 'og:image',
        content: 'https://raceandhealth.org/img/RXDH_TwitterCard.png',
      },
    ],
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
html {
  height: 100%;
}
.body {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 0;
  padding: 0;
  min-height: 100%;
  height: auto;
}
</style>
