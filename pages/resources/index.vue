<template>
  <div class="section light">
    <div class="page-content grid-container grid-container__two-col">
      <div class="heading heading--full">
        <h1>{{ page.fields.title }}</h1>
      </div>
      <div class="content content--full" v-html="pageHtml"></div>
      <nuxt-link to="resources/all">View all</nuxt-link>
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