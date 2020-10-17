<template>
  <div class="section light">
    <div class="page-content grid-container grid-container__two-col overline">
      <div class="heading heading--left   ">
        <a :id="category.fields.slug" class="anchor"></a>
        <h2>{{ category.fields.category }}</h2>
        <nuxt-link to="/resources">&larr; Back to resources hub</nuxt-link>
      </div>
      <div class="content--right" v-html="html(category.fields.resources)">
      </div>
    </div>
  </div>
</template>

<script>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"

export default {
  computed: {
    category() {
      let category = this.$store.state.resources.find(
        el => el.fields.slug === this.$route.params.category
      )
      return category
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