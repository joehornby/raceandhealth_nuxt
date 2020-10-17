<template>
  <div class="section light">
    <div class="page-content grid-container grid-container__multi-col">
      <div class="heading heading--left">
        <h1>{{ page.fields.title }}</h1>
        <p v-html="pageHtml"></p>
        <nuxt-link to="resources/all">List all resources</nuxt-link>
      </div>
      <div class="cards">
        <nuxt-link v-for="category in resources" :key="category.fields.slug" :to="`${page.fields.slug}/${category.fields.slug}`">
        <div class="card light">
          <h2>{{ category.fields.category }}</h2>
          <p>
            {{ category.fields.description }}
          </p>
        </div>
      </nuxt-link>
      </div>
    </div>
    <nuxt-child v-for="category in resources" :key="category.fields.slug" />
    
  </div>
</template>

<script>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"

  export default {
    data() {
      return {
        slug: "resources"
      }
    },
    computed: {
      resources() {
        return this.$store.state.resources
      },
      page() {
        let page = this.$store.state.pages.find(
          el => el.fields.slug === this.slug
        )
        return page
      },
      pageHtml() {
        let richTextHtml = documentToHtmlString(this.page.fields.content)
        return richTextHtml
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>