<template>
  <div class="section light">
    <div class="grid-container grid-container__two-col overline">
      <div class="heading heading--left">
        <h1>{{ page.fields.title }}</h1>
        <a v-if="page.fields.ctaUrl" :href="page.fields.ctaUrl">
        <button class="btn btn-primary icon-arrow-right">
          {{ page.fields.cta }}
        </button>
      </a>
      <nuxt-link v-if="page.fields.ctaRoute" :to="page.fields.ctaRoute">
        <button class="btn btn-primary icon-arrow-right">
          {{ page.fields.cta }}
        </button>
      </nuxt-link>
    </div>
    
  </div>
</template>

<script>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"

  export default {
    data() {
      return {
        slug: this.$route.params.slug
      }
    },
    head() {
      return {
        title: `Race & Health | ${this.page.fields.title}`
      }
    },
    computed: {
      
      page() {
        let page = this.$store.state.pages.find(
          el => el.fields.slug === this.slug
        )
        return page
      },
      richTextHtml() {
        let richTextHtml = documentToHtmlString(this.page.fields.content)
        return richTextHtml
      },
    }
  }
</script>

<style lang="scss" scoped>
  .page-content {
    & h2 {
      grid-column: 1 / span 1;
      padding-right: 1rem;
    }
    p, h3 {
      grid-column: 2 / span 1;
    }
  } 
</style>