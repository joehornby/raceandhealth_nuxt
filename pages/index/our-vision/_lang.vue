<template>
  <div class="content--right vision">
    <p>{{ language.fields.vision }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        prevHeight: 0
      }
    },
    transition: {
      name: "lang",
      mode: "out-in",
      beforeLeave(el) {
        this.prevHeight = getComputedStyle(el).height;
      },
      enter(el){
        const { height } = getComputedStyle(el);

        el.style.height = this.prevHeight;

        setTimeout(() => {
          el.style.height = height;
        });
      },
      afterEnter(el){
        el.style.height = 'auto';
      }
    },
    computed: {
      language() {
        let language = this.$store.state.vision.find(
          el => el.fields.slug === this.$route.params.lang
        )
        return language
      }
    },
  }
</script>

<style lang="scss" scoped>
  .vision {
    margin-bottom: 2rem;
  }
  /* Transitions */
  .lang-enter-active,
  .lang-leave-active {
    transition-duration: 0.3s;
    transition-property: height, opacity, transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
    overflow: hidden;
  }
  .lang-enter,
  .lang-leave-active {
    opacity: 0;
    transform: translate(2em, 0);
  }
</style>