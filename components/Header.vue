<template>
    <header class="header">
      <a class="skip" href="#content" tabindex="0">Skip to content</a>
      <div class="header-grid">
        <div id="logo-img" class="header__logo header__logo--shrink">
          <nuxt-link tab-index="-1" to="/">
            <img :src="require(`~/assets/logo/${logo}`)" alt="Racism, Discrimination, Xenophobia and Health Logo">
          </nuxt-link>
        </div>

        <div class="header__menu">
          <nav id="navigation" class="header__nav-desktop">
            <NavLinks />
          </nav>

          <span id="menu-label" hidden>Main menu</span>
          <button
            id="menu-toggle"
            class="header__nav-toggle"
            aria-labelledby="menu-label"
            :aria-expanded="isSidebar"
            @click="toggleSidebar"
          >
            <span></span>
          </button>
          <input
            id="nav-checkbox"
            class="header__nav-checkbox"
            type="checkbox"
          />
        </div>
      </div>
    </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      scrollPosition: null,
      logo: "RXDH_Logo_alt_light.svg"
    }
  },
  computed: {
    ...mapGetters({ isSidebar: "nav/getSidebarState" })
  },
  methods: {
    ...mapMutations({ toggleSidebar: "nav/toggleSidebar" })
  }
}
</script>

<style lang="scss">
.skip {
  font-size: 0.75rem;
  position: absolute;
  left: 50%;
  top: 0.25rem;
  color: $color-cream;
  &:not(:focus):not(:active) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
}
.header {
  width: 100%;
  position: fixed;
  top: 0;
  color: $color-cream;
  background-color: $color-darkgrey;

  box-sizing: border-box;
  z-index: 30;

  &__logo {
    height: auto;
    grid-column: 1 / span 1;
    margin-left: 0;
    display: block;
    padding: 1rem 0;
    a {
      display: block;
      height: 100%;
      width: $header-height;
      transition: height 200ms ease-out;
    }
    
    &--shrink {
      position: relative;

      a {
        display: block;
        height: $header-height--reduced;
        width: $header-height--reduced;
        position: absolute;
        top: 0;
        transition: height 200ms ease-out;
      }
    }
  }
}

/* Large screens */
@media only screen and (min-width: $bp-large) {
  .header__menu {
    grid-column: 2 / span 1;
    display: block;
    margin: auto 0;
  }
  .header__nav-desktop {
    color: $color-cream;
    display: block;
    z-index: 999;
    transition: transform 400ms ease-in-out;
    width: 100%;
  }
}
</style>
