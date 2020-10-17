<template>
  <div>
    <div v-if="isSidebar" class="backdrop" @click="hideSidebar"></div>
    <transition name="slide">
      <nav
        v-if="isSidebar"
        id="nav-mobile"
        class="sidebar"
        :class="{ active: isSidebar }"
        aria-labelledby="menu-label"
      >
        <NavLinks />
      </nav>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    isSidebar() {
      return this.$store.getters['nav/toggleSidebar']
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
  .sidebar {
    display:block;
    background: $color-cream;
    color: $color-darkgrey;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14),
    0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    position: fixed;
    width: 30vw;
    min-width: 300px;
    height: 100vh;
    z-index: 999;
    top: 0;
    right: 0;
    transform: translateX(0%);
    transition: all 400ms ease-in-out;
  }

  /* Transition */
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s ease-out;
  }
  .slide-enter,
  .slide-leave-to {
    transform: translateX(100%);
    transform-origin: right;
  }

  /* Dark background */
  .backdrop {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 998;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
