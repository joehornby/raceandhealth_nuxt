<template>
  <div>
    <ul>
      <li v-for="menuItem in menuItems" :key="menuItem.fields.slug"><nuxt-link :to="`/${menuItem.fields.slug}`" @click.native="hideSidebar">{{ menuItem.fields.title }}</nuxt-link></li>
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
  },
  methods: {
    hideSidebar() {
      this.$store.dispatch('nav/toggleSidebar')
    }
  }
}
</script>

<style lang="scss" scoped>
  ul {
    margin: 3rem 0;
    padding: 0;
    list-style: none;
  }

  li {
    margin-bottom: 3rem;
    margin-left: 3rem;
  }
  a {
    color: $color-darkgrey;
    text-decoration: none;
    font-size: 1rem;

    &:hover {
      color: $color-red;
    }
  }
</style>
