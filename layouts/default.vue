<template>
  <div class="body">
    <Header />
    <Sidebar />
    <Nuxt id="content" />
    <div class="graphics">
      <div class="circle-large circle-large--accent"></div>
    </div>
    <Footer />
  </div>
</template>
<script>
export default {
  head: {
    script: [
      {
        src: 'https://kit.fontawesome.com/46fe3ff0d6.js',
        crossorigin: 'anonymous',
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
@media only screen and (min-width:$bp-med) {
  .graphics {
    position: fixed;
    top: 0; left: 0; right: 0;
    min-height: 100%;
    pointer-events: none;
    overflow:hidden;
    z-index: 0;
    .circle-large {
      position: absolute;
      border-radius: 50%;
      width: 110vw;
      height: 110vw;
      bottom: -65vw;
      left:-85vw;

      &--accent {
        background-color: $color-red;
      }
      &--light {
        background-color: $color-cream;
      }
      &--dark {
        background-color: $color-darkgrey;
      }
    }
    .circle-small {
      position: absolute;
      border-radius: 50%;
      width: 40vw;
      height: 40vw;
      bottom: -20vw;
      left: 70vw;
        &--accent {
          background-color: $color-red;
        }
      }
    }
}
</style>
