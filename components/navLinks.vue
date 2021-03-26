<template>
  <div>
    <ul>
      <li v-for="menuItem in menuItems" :key="menuItem.fields.slug"><nuxt-link :to="`/${menuItem.fields.slug}`" @click.native="hideSidebar">{{ menuItem.fields.title }}</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  setup() {
    return {}
  },
  computed: {
    menuItems() {
      let menuItems = this.$store.state.pages.filter(i => (i.fields.order > 0))
      return menuItems
    },
    ...mapGetters({ isSidebar: "nav/getSidebarState" })
  },
  methods: {
    hideSidebar() {
      this.isSidebar ? this.toggleSidebar() : null
    },
    ...mapMutations({ toggleSidebar: "nav/toggleSidebar" })
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

  /* Full size menu */
  @media only screen and (min-width: $bp-large) {
    ul {
      padding: 0;
      list-style: none;
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin: 0;
    }

    li {
      display: inline;
      margin: 0;
    }

    a {
      color: $color-cream;
      transition: color 250ms ease-in-out;
      position: relative;
      text-decoration: none;

      &::before {
        content: '';
        height: 1px;
        position: absolute;
        width: 100%;

        background-color: rgba($color-cream,0);
        transform: scaleX(0);
        transition: all 250ms ease-in-out 0s;
        bottom:-0.3rem;
      }

      &:hover {
        color: $color-cream;
        &::before {
          background-color: rgba($color-cream,1);
          transform: scaleX(1);
          transition: all 250ms ease-in-out;
        }

      }
    }
  }
</style>
