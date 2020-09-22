<template>
  <div>
    {{ defaultLanguage.fields.vision }}
  </div>
</template>

<script>
  export default {
    transition: "",
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