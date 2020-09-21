<template>
  <div class="footer dark">
    <div class="grid-container grid-container__two-col">
      <div class="footer__social">
        <a href="https://twitter.com/raceandhealth" title="twitter">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="https://www.instagram.com/raceandhealth/" title="instagram">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="https://www.facebook.com/raceandhealth/" title="facebook"
          ><i class="fab fa-facebook"></i
        ></a>
        <a
          href="https://www.youtube.com/channel/UC6N1Srvw19v13PN2dnMagfA"
          title="youtube"
        >
          <i class="fab fa-youtube"></i>
        </a>
      </div>
      <div class="footer__legal">
        <a href="privacy-policy.html">Privacy Policy</a>
        <a href="contact.html">Contact</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  },
}
</script>

<style lang="scss">
.footer {
  padding: 0;
  padding-bottom: 0;
  margin-top: auto;
}
@media (min-width: $bp-med) {
  .footer__social {
    z-index: 100;
    grid-column: 1 / span 1;
  }
  .footer__legal {
    grid-column: 2 / span 1;
    align-self: flex-end;
    right: 0;
  }
}

.footer__social,
.footer__legal {
  padding-bottom: 1rem;

  a {
    display: inline-block;
    margin-right: 3em;
    color: $color-cream;
    position: relative;

    text-decoration: none;

    &:hover {
      color: $color-red--darker;
      text-decoration: none;
    }
  }
}
.footer__legal {
  font-size: 0.75rem;
  color: rgba($color-cream, 0.5);

  a {
    text-decoration: none;
    font-weight: normal;
    color: inherit;
    position: relative;

    &::before,
    &:hover::before {
      content: none;
    }
  }
}
</style>
