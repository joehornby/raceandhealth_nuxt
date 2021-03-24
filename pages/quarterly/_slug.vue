<template>
  <div class="section light">
    <div class="page-content grid-container grid-container__two-col overline">
      <div class="heading heading--left">
        <h1 class="headline">{{ article.fields.topic }}</h1>
        <h3>{{ article.fields.type }}</h3>
        <nuxt-link to="/quarterly">&larr; Race &amp; Health Quarterly directory</nuxt-link>
      </div>
      <div class="content--right" v-html="html(article.fields.content)">
      </div>
    </div>
  </div>
</template>

<script>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"

export default {
  data() {
    return {
      slug: this.$route.params.slug
    }
  },
  head() {
    return {
      title: `Race & Health | Quarterly | ${this.article.fields.topic}`
    }
  },
  computed: {
    article() {
      let article = this.$store.state.quarterly.find(
        el => el.fields.slug === this.$route.params.slug
      )
      return article
    }
  },
  methods: {
    html(doc) {
      return documentToHtmlString(doc)
    }
  }
}
</script>

<style lang="scss" scoped>
  h1.headline {
    font-family: 'Noto Serif JP', serif;
    font-size: 4rem;
    line-height: 1.2;
  }
    .content--right {
      h1, h2, h3, h4 {
        color: red;
        text-underline-position: below !important;
      }
    }
</style>