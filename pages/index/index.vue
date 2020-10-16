<template>
    <p>
      {{ defaultLanguage.fields.vision }}
    </p>
</template>

<script>
  export default {
    transition: "page",
    data() {
      return {
        firstLanguageSlug: "eng",
      }
    },
    computed: {
      defaultLanguage() {
        let defaultLanguage = this.$store.state.vision.filter ( v => v.fields.slug === this.firstLanguageSlug )
        return defaultLanguage[0]
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>