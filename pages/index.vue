<template>
  <div class="section section--homepage section--full dark">
    <a id="vision" class="anchor"></a>
    <div class="grid-container grid-container__two-col overline">
      <div class="heading heading--left">
        <h1>{{ pageTitle }}</h1>
        <p class="lang__title">
          Select Language  <a href="#after-lang" class="skip skip--lang">Skip Languages</a>
        </p>
        <div class="lang__menu">
          <nuxt-link 
            v-for="lang in visionStatements" 
            :key="lang.fields.slug" 
            :class="`lang ${lang.fields.slug}`" 
            :to="`/our-vision/${lang.fields.slug}`">
              {{ lang.fields.language }}
          </nuxt-link>
          <span id="after-lang" class="small-print">
            If something doesn't look right, please <nuxt-link to="/contact">let us know</nuxt-link>.
          </span>
        </div>
      </div>
      <div class="content--right vision">
        <nuxt-child :key="$route.params.lang" />
      </div>
      
      <div class="content--right" v-html="homePageHtml"></div>
      <div class="content--right fle">
        <a v-if="homepage.fields.ctaUrl" :href="page.fields.ctaUrl" tabindex="-1">
          <button class="btn btn-primary icon-arrow-right">
            {{ homepage.fields.cta }}
          </button>
        </a>
        <nuxt-link v-if="homepage.fields.ctaRoute" :to="homepage.fields.ctaRoute" tabindex="-1">
          <button class="btn btn-primary icon-arrow-right">
            {{ homepage.fields.cta }}
          </button>
        </nuxt-link>
          <a href="https://aoc.ucl.ac.uk/alumni/public-gbp-single?id=068a76fa-dd00-4ba5-8acb-3ce4b79cd224" target="_blank" tabindex="-1">
              <button class="btn btn-secondary">Donate to our cause</button>
          </a>
      </div>
    </div>
  </div>
</template>

<script>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"

export default {
  transition: "home",
  head() {
    return {
      title: `Race & Health | ${this.homepage.fields.title}`
    }
  },
  data() {
    return {
      homePageSlug: "home",
      pageTitle: "Our Vision"
    }
  },
  computed: {
    homepage() {
    let page = this.$store.state.pages.find(
      el => el.fields.slug === this.homePageSlug
    )
    return page
    },
    visionStatements() {
      return this.$store.state.vision
    },
    homePageHtml() {
      let richTextHtml = documentToHtmlString(this.homepage.fields.content)
      return richTextHtml
    },
  }
}
</script>

<style lang="scss" scoped>
  span.small-print {
    display: block;
    margin-top: 2em;;
  }
  .skip--lang {
    position: relative;
    left: unset;
    top: unset;
  }
  button {
    min-width: 50%;

  }
</style>
