<template>
  <div>
    <ul>
      <li v-for="menuItem in menuItems" :key="menuItem.fields.slug"><nuxt-link :to="`/${menuItem.fields.slug}`">{{ menuItem.fields.title }}</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  },
  computed: {
    menuItems() {
      let menuItems = this.$store.state.pages.filter(i => (i.fields.order > 0))
      return menuItems
    }
  }
}
</script>

<style lang="scss" scoped></style>
