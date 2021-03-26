<template>
  <div class="grid-container cols--3 masonry">
    <div class="topic cards">
      <nuxt-link v-for="topic in articles" :key="topic.fields.slug" :to="`/quarterly/${topic.fields.date}/${topic.fields.slug}`">
      <div class="card light">
        <p class="category" v-for="category in topic.fields.category">{{ category }}</p>
        <img v-if="topic.fields.image" :src="topic.fields.image.fields.file.url">
        <h2>{{ topic.fields.topic }}</h2>
        <p>{{ topic.fields.excerpt }}</p>
      </div>
    </nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    props:['categories'],
    computed: {
      category() {
        return this.categories.find( el => el.slug === this.$route.params.category ).label
      },
      articles() {
        return this.$store.state.quarterly.filter( el => el.fields.category == this.category )
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>