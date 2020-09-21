<template>
  <div>
    <header class="header">
      <a class="skip" href="#content" tabindex="0">Skip to content</a>
      <div class="header-grid">
        <div id="logo-img" class="header__logo header__logo--primary">
          <nuxt-link to="/"></nuxt-link>
        </div>

        <div class="header__menu">
          <nav id="navigation" class="header__nav-desktop">
            <navLinks />
          </nav>

          <span id="menu-label" hidden>Main menu</span>
          <button
            id="menu-toggle"
            class="header__nav-toggle"
            aria-labelledby="menu-label"
            aria-expanded="false"
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
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.skip {
  font-size: 0.75rem;
  position: absolute;
  left: 50%;
  top: 0.25rem;
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
    grid-column: 1 / span 1;
    margin-left: 0;
    display: block;
    padding: 1rem 0;

    &--primary {
      height: $header-height;
      background: url('~assets/logo/RXDH_Logo_primary_light.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-origin: content-box;

      transform-origin: bottom left;
      transition: all 200ms ease-in;

      a {
        display: block;
        height: 100%;
        width: $header-height;
      }
    }

    &--secondary {
      height: $header-height--reduced;

      background: url('~assets/logo/RXDH_Logo_alt_light.svg');
      background-size: $header-height--reduced $header-height--reduced;
      background-repeat: no-repeat;

      transform-origin: bottom left;
      transition: all 200ms ease-out;

      position: relative;

      a {
        display: block;
        height: $header-height--reduced;
        width: $header-height--reduced;
        position: absolute;
        top: 0;
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
}
</style>
