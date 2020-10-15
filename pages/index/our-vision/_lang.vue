<template>
  <div class="content--right vision">
    <p>{{ language.fields.vision }}</p>
  </div>
</template>

<script>
  export default {
    transition: "",
    computed: {
      language() {
        let language = this.$store.state.vision.find(
          el => el.fields.slug === this.$route.params.lang
        )
        return language
      }
    }
  }
</script>

<style lang="scss" scoped>
  .vision {
    min-height: 40vh;
  }
</style>