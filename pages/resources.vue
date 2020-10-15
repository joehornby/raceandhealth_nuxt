<template>
  <div class="section light">
    <div class="page-content grid-container grid-container__two-col">
      <div class="heading heading--left">
        <h1>{{ page.fields.title }}</h1>
      </div>
    </div>
    
    <article class="page-content grid-container grid-container__two-col" v-html="richTextHtml"></article>
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

</style>