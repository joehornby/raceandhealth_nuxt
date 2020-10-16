<template>
  <div class="section light">
    <div v-for="category in resources" :key="category.fields.slug" class="page-content grid-container grid-container__two-col">
      <div class="heading heading--left   ">
        <a :id="category.fields.slug" class="anchor"></a>
        <h2>{{ category.fields.category }}</h2>
      </div>
      <div class="content--right" v-html="html(category.fields.resources)">
      </div>
    </div>
    
  </div>
</template>

<script>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"

  export default {
    data() {
      return {
        slug: "all"
      }
    },
    computed: {
      resources() {
        return this.$store.state.resources
      }
    },
    methods: {
      html(doc) {
        return documentToHtmlString(doc)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>