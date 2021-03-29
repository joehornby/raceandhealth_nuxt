<template>
    <div class="page-content grid-container grid-container__two-col overline">
      <div class="heading heading--left relpos">
        <h1 class="headline">{{ article.fields.topic }}</h1>
        <h3>{{ article.fields.type }}</h3>
        <nuxt-link :to="`/quarterly/category/${slugify(article.fields.category)}`" 
          v-for="category in article.fields.category"
          :key="category"
          class="category">
          {{ category }}
        </nuxt-link>
        <h4>{{ article.fields.author }}</h4>
      </div>
      <div class="content--right" v-html="html(article.fields.content)">
      </div>
    </div>
</template>

<script>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"

export default {
  scrollToTop: true,
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
    },
    slugify(text) {
      return text.toString()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
          .replace(/--+/g, '-')
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content {
  margin-top: 8rem;
}
.category {
  display: inline-block;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
  &::before {
    content: '/ ';
  }
}
  h1.headline {
    font-family: 'Noto Serif JP', serif;
    font-size: 3rem;
    font-size: calc(2rem + 1vw);
    line-height: 1.2;
  }
    .content--right {
      h1, h2, h3, h4 {
        color: red;
        text-underline-position: below !important;
      }
    }
</style>