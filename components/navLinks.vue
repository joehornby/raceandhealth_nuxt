<template>
  <div>
    <ul>
      <li v-for="page in pages" :key="page.fields.slug"><nuxt-link :to="`/${page.fields.slug}`">{{ page.fields.title }}</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  },
  computed: {
    pages() {
      return this.$store.state.pages
    }
  }
}
</script>

<style lang="scss" scoped></style>
