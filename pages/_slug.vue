<template>
  <div>
    <h1>{{ page.fields.title }}</h1>
    <!-- <article v-html="$md.render(page.fields.content)"></article> -->
    <div class="page-content" v-html="richTextHtml"></div>
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
    computed: {
      page() {
      let page = this.$store.state.pages.filter(
        el => el.fields.slug === this.slug
      )
      return page[0]
      },
      richTextHtml() {
        let richTextHtml = documentToHtmlString(this.page.fields.content)
        return richTextHtml
      }
    },
    head() {
      return {
        title: `Race & Health | `//${this.store.state.pages.fields.title}`
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>