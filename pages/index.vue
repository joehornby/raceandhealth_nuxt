<template>
  <div class="container">
    <h2>Index</h2>
    <h3 v-for="page in pages" :key="page.fields.slug">{{ page.fields.title }}</h3>
  </div>
</template>

<script>
// import { createClient } from '~/plugins/contentful.js'
// const client = createClient()

export default {
  computed: {
    pages() {
      return this.$store.state.pages
    }
  }
}
</script>

<style></style>
