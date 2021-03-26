<template>
  <div class="footer dark">
    <div class="grid-container grid-container__two-col">
      <!-- Begin Mailchimp Signup Form -->

      <div id="mc_embed_signup" class="footer--right">
        <form action="https://raceandhealth.us2.list-manage.com/subscribe/post?u=aeab444f69b595499b9019150&amp;id=7f5bdb1ed8" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
          <div id="mc_embed_signup_scroll">
            <label for="mce-EMAIL">Subscribe to The Race &amp; Health Quarterly</label>
            <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
            <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
            <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_aeab444f69b595499b9019150_7f5bdb1ed8" tabindex="-1" value=""></div>
            <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="btn">
          </div>
        </form>
      </div>
      <!--End mc_embed_signup-->
    </div>
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
        <nuxt-link to="/work-with-us">Work with us</nuxt-link>
        <nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link>
        <nuxt-link to="/contact">Contact</nuxt-link>
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
  &--right {
    grid-column: -2 / span 1;
  }
}
@media (min-width: $bp-med) {
  .footer__social {
    z-index: 100;
    grid-column: 1 / span 1;
  }
  .footer__legal,
  .footer__links {
    grid-column: 2 / span 1;
    align-self: flex-end;
    right: 0;
  }
}

.footer {
  &__social,
  &__legal,
  &__links
   {
    margin-top: 3rem;
    padding-bottom: 1rem;

    a {
      display: inline-block;
      margin-right: 3em;
      color: $color-cream;
      position: relative;
      text-decoration: none;

      &:hover,
      &:focus {
        color: $color-red--darker;
        text-decoration: none;
        outline: 0;
      }
    }
  }
}
@media (max-width: $bp-med) {

  .footer__social {
    margin-top: 5rem;
    display: flex;
    justify-content: space-around;
    a {
      margin: 0;
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
    display: block;
    margin-bottom: 1rem;
    @media (min-width: $bp-med) {
        display: inline-block;
      }
    &::before,
    &:hover::before {
      content: none;
    }
  }
}

/* MailChimp Email Signup Form */
.footer {
  #mc_embed_signup {
    margin-top: 2rem;
    margin-bottom: 2rem;
    max-width: 50ch;
  }

  label {
    display: block;
  }

  input[type="email"] {
    display: block;
    background-color: $color-darkgrey;
    color: $color-cream;
    width: 67%;
    margin-top: 1rem;
    padding-left: 1rem;
    border: 2px solid $color-cream;
    border-radius: 62.5rem 0 0 62.5rem;
    border-right: 0;
    float: left;
    height: 3rem;
    font-size: 1rem;
    
    &:focus {
      outline: 0;
      border-color: $color-red;
    }
  }

  input[type="submit"] {
    background-color: $color-cream;
    color: $color-darkgrey;
    border-radius: 0 62.5rem 62.5rem 0;
    // border: 2px solid $color-cream;
    float: right;
    width: 33%;
    height: 3em;
    padding: unset;
    &:hover,
    &:focus {
      color: $color-darkgrey;
      background-color: $color-red;
    }
  }
}

#mc-embedded-subscribe {
  margin: 0;
  margin-top: 1rem;
}
</style>
